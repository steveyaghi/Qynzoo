// ===================================
// Language: EN / NL
// ===================================
// Loaded synchronously in the <head> of every page that has a translation.
// The other language's URL comes from the page's own
// <link rel="alternate" hreflang="..."> tag, so there is no path mapping here.
//
// - A visitor who picked a language (via the EN | NL switch) always gets it.
// - Otherwise a browser whose top language is Dutch is sent to the Dutch page
//   once; everyone else stays where they landed. Search engine crawlers do not
//   carry a Dutch preference, so they index both versions via hreflang.
(function () {
    var lang = (document.documentElement.lang || 'en').slice(0, 2).toLowerCase();
    var other = lang === 'nl' ? 'en' : 'nl';
    var link = document.querySelector('link[rel="alternate"][hreflang="' + other + '"]');
    if (!link) return;

    // hreflang URLs are absolute (https://qynzoo.com/...); keep the current
    // origin so this also works on localhost and preview hosts.
    var altPath = new URL(link.href).pathname;
    window.qzAltHref = altPath;

    window.qzSetLang = function (l) {
        try { localStorage.setItem('qz-lang', l); } catch (e) { /* storage blocked */ }
    };

    var pref = null;
    try { pref = localStorage.getItem('qz-lang'); } catch (e) { /* storage blocked */ }
    if (!pref) {
        var first = (navigator.languages && navigator.languages[0]) || navigator.language || '';
        if (/^nl\b/i.test(first)) pref = 'nl';
    }
    if (pref && pref !== lang) {
        location.replace(altPath + location.hash);
    }
})();
