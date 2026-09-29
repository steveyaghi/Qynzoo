/* Offline cache for the Qynzoo demos. Bump CACHE when a demo file changes. */
var CACHE = 'qz-demo-4.3.1';
var FILES = [
    './',
    'index.html',
    'afspraak.html',
    'reservering.html',
    'whatsapp.html',
    'manifest.webmanifest',
    '../css/qz-demo.css',
    '../js/demo.js',
    '../fonts/inter-latin-var.woff2',
    '../fonts/jetbrains-mono-latin-var.woff2',
    '../logos/Qynzoo_solo_logo.svg'
];

self.addEventListener('install', function (e) {
    e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
    e.waitUntil(caches.keys().then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k.indexOf('qz-demo-') === 0 && k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); }));
});

// Network first (so updates show up), cache as fallback when offline.
self.addEventListener('fetch', function (e) {
    var req = e.request;
    var url = new URL(req.url);
    if (req.method !== 'GET' || url.origin !== self.location.origin) return;
    // One cache entry per file: ?type=...&naam=... links share it.
    var key = url.origin + url.pathname;
    e.respondWith(
        fetch(req).then(function (res) {
            if (res && res.ok) {
                var copy = res.clone();
                caches.open(CACHE).then(function (c) { c.put(key, copy); });
            }
            return res;
        }).catch(function () {
            return caches.match(req, {ignoreSearch: true});
        })
    );
});
