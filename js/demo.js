/* Qynzoo sales demos (/demo/). Plain JS, no network calls.
   Every page is a shell (<body data-page="...">); this file renders it.
   To add a business type, add a block to BR and its key to KEYS. */
(function () {
    'use strict';

    // ---------- Business types ----------
    // closed: day of the week the shop is closed (0 = Sunday).
    // rec: the demo that fits best (shown as "Past bij ..." on the overview).
    var BR = {
        kapper: {
            label: 'Kapper', rec: 'afspraak', closed: 0, topic: 0,
            svc: [{n: 'Knippen', s: '30 min'}, {n: 'Baard trimmen', s: '20 min'}, {n: 'Kleuren', s: '90 min'}],
            msg: 'Ik wil graag knippen en mijn baard laten trimmen. Kan dat op zaterdag?'
        },
        tandarts: {
            label: 'Tandarts', rec: 'afspraak', closed: 0, topic: 2,
            svc: [{n: 'Controle', s: '15 min'}, {n: 'Gebitsreiniging', s: '30 min'}, {n: 'Spoedafspraak', s: '20 min'}],
            msg: 'Ik heb sinds gisteren last van een kies. Kan ik deze week nog langskomen?'
        },
        fysio: {
            label: 'Fysio', rec: 'afspraak', closed: 0, topic: 0,
            svc: [{n: 'Intake', s: '45 min'}, {n: 'Behandeling', s: '30 min'}, {n: 'Sportmassage', s: '45 min'}],
            msg: 'Ik heb last van mijn knie na het hardlopen. Heb ik een verwijzing nodig?'
        },
        fiets: {
            label: 'Fietsenmaker', rec: 'whatsapp', closed: 0, topic: 1,
            svc: [{n: 'Kleine beurt', s: '45 min'}, {n: 'Grote beurt', s: '2 uur'}, {n: 'Bandenwissel', s: '30 min'}, {n: 'Offerte', s: '15 min'}],
            msg: 'Mijn fiets kraakt bij het schakelen. Kan hij deze week een grote beurt krijgen?'
        },
        bloemist: {
            label: 'Bloemist', rec: 'whatsapp', closed: 0, topic: 1,
            svc: [{n: 'Boeket op bestelling', s: 'Afhalen, 10 min'}, {n: 'Bruiloft', s: 'Gesprek, 45 min'}, {n: 'Abonnement', s: 'Kennismaking, 15 min'}],
            msg: 'We trouwen in juni en zoeken bloemen voor ongeveer 80 gasten.'
        },
        restaurant: {
            label: 'Restaurant', rec: 'reservering', closed: 1, topic: 2, evening: true,
            svc: [{n: '2 personen', s: 'Tafel, 2 uur'}, {n: '4 personen', s: 'Tafel, 2 uur'}, {n: 'Groepen', s: 'Vanaf 7 personen'}],
            msg: "We willen met 12 collega's komen eten, volgende week vrijdag."
        }
    };
    var KEYS = ['kapper', 'tandarts', 'fysio', 'fiets', 'bloemist', 'restaurant'];

    var DOW = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'];
    var DOW_LONG = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];
    var MON = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
    var MON_LONG = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
    var DAYSLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '16:00'];
    var EVESLOTS = ['12:00', '12:30', '13:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];
    var PARTY = ['1', '2', '3', '4', '5', '6', '7+'];

    // ---------- Icons ----------
    function svg(size, body, sw) {
        return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (sw || 2) +
            '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + body + '</svg>';
    }
    var I = {
        back: svg(20, '<path d="M15 18l-6-6 6-6"/>'),
        arrow: svg(22, '<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>', 2.4),
        alert: svg(18, '<circle cx="12" cy="12" r="10"/><path d="M12 8v5"/><path d="M12 16.5v.01"/>'),
        alertBig: svg(22, '<circle cx="12" cy="12" r="10"/><path d="M12 7.5v5.5"/><path d="M12 16.5v.01"/>'),
        cal: svg(26, '<rect x="3" y="4.5" width="18" height="16.5" rx="2.5"/><path d="M3 9.5h18"/><path d="M8 2.5v4"/><path d="M16 2.5v4"/><path d="M9 15l2 2 4-4"/>'),
        calSm: svg(22, '<rect x="3" y="4.5" width="18" height="16.5" rx="2.5"/><path d="M3 9.5h18"/><path d="M8 2.5v4"/><path d="M16 2.5v4"/>'),
        calX: svg(32, '<rect x="3" y="4.5" width="18" height="16.5" rx="2.5"/><path d="M3 9.5h18"/><path d="M8 2.5v4"/><path d="M16 2.5v4"/><path d="M9.5 13.5l5 5"/><path d="M14.5 13.5l-5 5"/>'),
        people: svg(26, '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5"/><path d="M16 4.8a3.5 3.5 0 0 1 0 6.4"/><path d="M18 14.8c1.8.8 3 2.6 3.5 5.2"/>'),
        chat: svg(26, '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v9a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 14.5z"/><path d="M8.5 8.5h7"/><path d="M8.5 12h4.5"/>'),
        clock: svg(24, '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
        clockSm: svg(18, '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>', 2.2),
        clock20: svg(20, '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
        check: svg(18, '<path d="M5 12.5l4.5 4.5L19 7.5"/>', 2.6),
        checkCircle: svg(20, '<circle cx="12" cy="12" r="10"/><path d="M7.5 12.5l3 3 6-6"/>', 2.2),
        lock: svg(18, '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),
        bell: svg(20, '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>')
    };

    // ---------- Helpers ----------
    function esc(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
            return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c];
        });
    }
    function cap(t) { return t ? t.charAt(0).toUpperCase() + t.slice(1) : t; }
    function telOk(v) {
        var d = (v || '').replace(/\D/g, '');
        return /^06\d{8}$/.test(d) || /^316\d{8}$/.test(d) || /^00316\d{8}$/.test(d);
    }
    function errLine(id, msg) {
        return msg ? '<div class="qd-err" id="' + id + '">' + I.alert + '<span>' + esc(msg) + '</span></div>' : '';
    }

    // Only the business name and type are kept, on this device, so they
    // carry over between the demo pages. Nothing is sent anywhere.
    var store = {
        get: function () { try { return JSON.parse(localStorage.getItem('qzDemo') || '{}') || {}; } catch (e) { return {}; } },
        set: function (o) { try { localStorage.setItem('qzDemo', JSON.stringify(o)); } catch (e) { /* private mode */ } }
    };

    var params;
    try { params = new URLSearchParams(location.search); } catch (e) { params = {get: function () { return null; }, has: function () { return false; }}; }
    var saved = store.get();
    var S = {
        branche: BR[params.get('type')] ? params.get('type') : (BR[saved.branche] ? saved.branche : 'kapper'),
        bedrijf: params.has('naam') ? String(params.get('naam') || '').slice(0, 80) : String(saved.bedrijf || '')
    };
    function persist() { store.set({branche: S.branche, bedrijf: S.bedrijf}); }
    persist();

    function br() { return BR[S.branche]; }
    function biz() { return S.bedrijf.trim() || 'Jouw zaak'; }
    function query() {
        var n = S.bedrijf.trim();
        return '?type=' + encodeURIComponent(S.branche) + (n ? '&naam=' + encodeURIComponent(n) : '');
    }

    // The next 7 days, starting tomorrow.
    function week() {
        var out = [], base = new Date();
        base.setHours(12, 0, 0, 0);
        for (var i = 1; i <= 7; i++) {
            var d = new Date(base);
            d.setDate(base.getDate() + i);
            var p = new Date(d);
            p.setDate(d.getDate() - 1);
            out.push({
                dow: d.getDay(), d: DOW[d.getDay()], n: d.getDate(), m: MON[d.getMonth()],
                long: DOW_LONG[d.getDay()] + ' ' + d.getDate() + ' ' + MON_LONG[d.getMonth()],
                short: DOW[d.getDay()] + ' ' + d.getDate() + ' ' + MON[d.getMonth()],
                prev: i === 1 ? 'vandaag' : DOW[p.getDay()] + ' ' + p.getDate() + ' ' + MON[p.getMonth()],
                seed: Math.floor(d.getTime() / 864e5)
            });
        }
        return out;
    }
    var DAYS = week();

    // ---------- Flow state ----------
    var PAGE = document.body.getAttribute('data-page') || 'hub';
    var FIRST = {afspraak: 'af1', reservering: 'res1', whatsapp: 'wa1'};
    var F;
    var timers = [];
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }
    function resetFlow() {
        clearTimers();
        F = {screen: FIRST[PAGE] || 'hub', svc: -1, day: -1, slot: '', party: -1, topic: -1,
            naam: '', tel: '', opm: '', bericht: '', err: {}, topErr: '', reveal: 3};
    }
    resetFlow();

    var STEPS = {
        af1: [1, 3, 'Waarvoor kom je?'], af2: [2, 3, 'Kies een dag en tijd'], af3: [3, 3, 'Je gegevens'],
        res1: [1, 2, 'Wanneer en met hoeveel?'], res2: [2, 2, 'Je gegevens'],
        wa1: [1, 1, 'Wat kunnen we voor je doen?']
    };
    var NEXT = {af1: 'Verder', af2: 'Verder', af3: 'Afspraak bevestigen', res1: 'Verder', res2: 'Reservering bevestigen', wa1: 'Verstuur via WhatsApp'};
    var BACK = {af2: 'af1', af3: 'af2', res2: 'res1'};
    var SUF = {afspraak: 'staat je afspraak vast', reservering: 'staat je reservering vast', whatsapp: 'kun je het versturen'};

    function slotsFor(dayIdx) {
        var d = DAYS[dayIdx];
        if (!d || d.dow === br().closed) return [];
        var base = br().evening ? EVESLOTS : DAYSLOTS;
        return base.map(function (t, i) { return {t: t, taken: ((d.seed * 5 + i) % 4) === 1}; });
    }
    function partyLabel() {
        var v = F.party >= 0 ? PARTY[F.party] : '';
        if (!v) return '';
        return v === '7+' ? 'Groep van 7 of meer' : v + (v === '1' ? ' persoon' : ' personen');
    }
    function names() {
        var parts = F.naam.trim().split(/\s+/);
        var first = parts[0] || 'Sanne';
        var short = parts.length > 1 ? first + ' ' + parts[parts.length - 1].charAt(0).toUpperCase() + '.' : first;
        return {first: first, short: short};
    }

    // ---------- Views ----------
    function header() {
        var hub = PAGE === 'hub';
        var left = hub
            ? '<a class="qd-word" href="./' + esc(query()) + '">Qynzoo</a>'
            : '<button type="button" class="qd-back" data-act="back" data-fid="back">' + I.back + '<span>' + (BACK[F.screen] ? 'Terug' : 'Overzicht') + '</span></button>';
        var mid = hub ? '' : '<div class="qd-where"><b>' + esc(biz()) + '</b> · ' + esc(br().label) + '</div>';
        return '<header class="qd-bar"><div class="qd-bar-in">' + left + mid +
            '<span class="qd-badge"><span class="qd-badge-long">Voorbeeld, niet live</span><span class="qd-badge-short">Voorbeeld</span></span>' +
            '</div></header>';
    }

    function viewHub() {
        var b = br();
        var tooLong = S.bedrijf.length > 40;
        var types = KEYS.map(function (k) {
            return '<button type="button" class="qd-choice" data-act="type" data-v="' + k + '" data-fid="type-' + k + '" aria-pressed="' + (k === S.branche) + '">' + esc(BR[k].label) + '</button>';
        }).join('');
        function card(key, file, title, text, icon, tone) {
            var rec = b.rec === key;
            return '<a class="qd-card' + (rec ? ' is-rec' : '') + '" href="' + file + esc(query()) + '" data-card="' + file + '">' +
                '<span class="qd-card-top"><span class="qd-card-icon qd-tone-' + tone + '">' + icon + '</span>' +
                (rec ? '<span class="qd-pill">Past bij ' + esc(b.label.toLowerCase()) + '</span>' : '') + '</span>' +
                '<span class="qd-card-title">' + title + '</span>' +
                '<span class="qd-card-text">' + text + '</span>' +
                '<span class="qd-card-go">Probeer het' + I.arrow + '</span></a>';
        }
        return '<div class="qd-hub">' +
            '<div class="qd-intro"><p class="qd-kicker">Voorbeelden voor jouw zaak</p>' +
            '<h1 class="qd-h1">Zo werkt het voor <span class="qd-teal" id="qd-bizname">' + esc(biz()) + '</span></h1>' +
            '<p class="qd-lead">Probeer het zelf, zoals je klant het straks ziet. Daarna zie je wat er achter de schermen vanzelf gebeurt.</p></div>' +
            '<div class="qd-controls">' +
            '<div class="qd-field qd-field-biz"><label class="qd-label" for="qd-biz">Bedrijfsnaam</label>' +
            '<input class="qd-input" id="qd-biz" data-field="bedrijf" type="text" autocomplete="organization" maxlength="80" value="' + esc(S.bedrijf) + '" placeholder="Bijvoorbeeld Salon Noor" aria-invalid="' + tooLong + '" aria-describedby="qd-biz-hint">' +
            '<div id="qd-biz-hint" aria-live="polite">' + bizHint(tooLong) + '</div></div>' +
            '<div class="qd-field qd-field-type" role="group" aria-labelledby="qd-type-l"><div class="qd-label" id="qd-type-l">Soort zaak</div><div class="qd-types">' + types + '</div></div>' +
            '</div>' +
            '<div class="qd-cards">' +
            card('afspraak', 'afspraak.html', 'Afspraak maken', 'Je klant kiest zelf wat, welke dag en hoe laat. De afspraak staat meteen in jouw agenda.', I.cal, 'teal') +
            card('reservering', 'reservering.html', 'Reserveren', 'Aantal personen, dag en tijd in een paar tikken. Met ruimte voor een opmerking.', I.people, 'gold') +
            card('whatsapp', 'whatsapp.html', 'Aanvraag via WhatsApp', 'Een vraag of offerte-aanvraag komt netjes als bericht bij jou binnen, met alles erbij.', I.chat, 'coral') +
            '</div>' +
            '<div class="qd-foot"><span>Verzonnen gegevens. Er wordt niets verstuurd; alleen de bedrijfsnaam blijft op dit apparaat bewaard.</span><a href="../">qynzoo.com</a></div>' +
            '</div>';
    }
    function bizHint(tooLong) {
        return tooLong
            ? '<div class="qd-err">' + I.alert + '<span>Maximaal 40 tekens. Kort de naam in.</span></div>'
            : '<div class="qd-hint">Zie je meteen terug in alle voorbeelden.</div>';
    }

    function field(id, key, label, type, extra) {
        var e = F.err[key];
        var mono = type === 'tel' ? ' is-mono' : '';
        return '<div class="qd-field"><label class="qd-label" for="' + id + '">' + label + '</label>' +
            '<input class="qd-input' + mono + '" id="' + id + '" data-field="' + key + '" type="' + type + '" ' + extra + ' value="' + esc(F[key]) + '" aria-invalid="' + !!e + '"' +
            (e ? ' aria-describedby="' + id + '-err"' : '') + '>' + errLine(id + '-err', e) + '</div>';
    }

    function viewFlow() {
        var st = STEPS[F.screen];
        var isWa = PAGE === 'whatsapp';
        var segs = '';
        if (!isWa) {
            segs = '<span class="qd-segs" aria-hidden="true">';
            for (var i = 1; i <= st[1]; i++) segs += '<span class="qd-seg' + (i <= st[0] ? ' is-on' : '') + '"></span>';
            segs += '</span>';
        }
        var head = '<div class="qd-stephead"><div class="qd-steps"><span class="qd-kicker">' +
            (isWa ? 'Aanvraag via WhatsApp' : 'Stap ' + st[0] + ' van ' + st[1]) + '</span>' + segs + '</div>' +
            '<h2 class="qd-h2" id="qd-title" tabindex="-1">' + st[2] + '</h2>' +
            (F.topErr ? '<div class="qd-alert" role="alert" id="qd-alert">' + I.alertBig + '<span>' + esc(F.topErr) + '</span></div>' : '') +
            '</div>';

        var body = '';
        var s = F.screen;
        if (s === 'af1') body = bodyService();
        if (s === 'res1') body = bodyParty();
        if (s === 'af2' || s === 'res1') body += bodyWhen();
        if (s === 'wa1') body = bodyRequest();
        if (s === 'af3' || s === 'res2' || s === 'wa1') body += bodyDetails();

        var side = isWa ? sidePreview() : sideSummary();
        return '<div class="qd-flow"><div class="qd-col">' + head + body +
            '<div class="qd-actions"><button type="button" class="qd-btn" data-act="next" data-fid="next">' + NEXT[s] + I.arrow + '</button></div>' +
            '</div><aside class="qd-side" aria-label="' + (isWa ? 'Voorbeeld van je bericht' : 'Samenvatting') + '">' + side + '</aside></div>';
    }

    function bodyService() {
        var b = br();
        var items = b.svc.map(function (v, i) {
            return '<button type="button" class="qd-svc-btn" role="radio" aria-checked="' + (i === F.svc) + '" data-act="svc" data-v="' + i + '" data-fid="svc-' + i + '">' +
                '<span class="qd-radio"></span><span class="qd-svc-txt"><span class="qd-svc-name">' + esc(v.n) + '</span><span class="qd-svc-sub">' + esc(v.s) + '</span></span></button>';
        }).join('');
        return '<div class="qd-group"><div class="qd-svc' + (b.svc.length === 4 ? ' is-4' : '') + '" role="radiogroup" aria-labelledby="qd-title">' + items + '</div>' +
            errLine('qd-svc-err', F.err.svc) + '</div>';
    }

    function bodyParty() {
        var items = PARTY.map(function (v, i) {
            var aria = v === '7+' ? '7 of meer personen' : v + (v === '1' ? ' persoon' : ' personen');
            return '<button type="button" class="qd-choice is-lg" role="radio" aria-checked="' + (i === F.party) + '" aria-label="' + aria + '" data-act="party" data-v="' + i + '" data-fid="party-' + i + '">' + v + '</button>';
        }).join('');
        return '<div class="qd-group"><div class="qd-label" id="qd-party-l">Aantal personen</div>' +
            '<div class="qd-party" role="radiogroup" aria-labelledby="qd-party-l">' + items + '</div>' + errLine('qd-party-err', F.err.party) + '</div>';
    }

    function bodyWhen() {
        var b = br();
        var days = DAYS.map(function (d, i) {
            var closed = d.dow === b.closed;
            return '<button type="button" class="qd-day' + (closed ? ' is-closed' : '') + '" role="radio" aria-checked="' + (i === F.day) + '" aria-label="' + d.long + (closed ? ', gesloten' : '') + '" data-act="day" data-v="' + i + '" data-fid="day-' + i + '">' +
                '<span class="qd-day-d">' + d.d + '</span><span class="qd-day-n">' + d.n + '</span><span class="qd-day-m">' + (closed ? 'dicht' : d.m) + '</span></button>';
        }).join('');
        var html = '<div class="qd-group"><div class="qd-label" id="qd-day-l">Dag</div><div class="qd-week" role="radiogroup" aria-labelledby="qd-day-l">' + days + '</div></div>';

        if (F.day < 0) {
            html += '<div class="qd-empty">' + I.clock + '<span>Kies eerst een dag. Dan zie je hier de vrije tijden.</span></div>';
        } else if (DAYS[F.day].dow === b.closed) {
            html += '<div class="qd-closed" role="status">' + I.calX + '<strong>Op ' + DOW_LONG[DAYS[F.day].dow] + ' is ' + esc(biz()) + ' dicht.</strong><span>Kies een andere dag hierboven.</span></div>';
        } else {
            var slots = slotsFor(F.day).map(function (x) {
                return '<button type="button" class="qd-slot" role="radio" aria-checked="' + (x.t === F.slot) + '" aria-label="' + x.t + (x.taken ? ', vol' : '') + '"' + (x.taken ? ' disabled' : '') +
                    ' data-act="slot" data-v="' + x.t + '" data-fid="slot-' + x.t + '">' + x.t + '</button>';
            }).join('');
            html += '<div class="qd-group"><div class="qd-group-head"><span class="qd-label" id="qd-slot-l">Tijd op ' + DAYS[F.day].short + '</span><span>Doorgestreept is vol</span></div>' +
                '<div class="qd-slots" role="radiogroup" aria-labelledby="qd-slot-l">' + slots + '</div></div>';
        }
        return html + errLine('qd-slot-err', F.err.slot);
    }

    function bodyRequest() {
        var b = br();
        var items = b.svc.map(function (v, i) {
            return '<button type="button" class="qd-choice is-sans" role="radio" aria-checked="' + (i === F.topic) + '" data-act="topic" data-v="' + i + '" data-fid="topic-' + i + '">' + esc(v.n) + '</button>';
        }).join('');
        var e = F.err.bericht;
        return '<div class="qd-group"><div class="qd-label" id="qd-topic-l">Waar gaat het over?</div>' +
            '<div class="qd-topics' + (b.svc.length === 4 ? ' is-4' : '') + '" role="radiogroup" aria-labelledby="qd-topic-l">' + items + '</div>' + errLine('qd-topic-err', F.err.topic) + '</div>' +
            '<div class="qd-field"><label class="qd-label" for="qd-msg">Wat heb je nodig?</label>' +
            '<textarea class="qd-input" id="qd-msg" data-field="bericht" rows="3" maxlength="500" placeholder="' + esc('Bijvoorbeeld: ' + b.msg) + '" aria-invalid="' + !!e + '"' + (e ? ' aria-describedby="qd-msg-err"' : '') + '>' + esc(F.bericht) + '</textarea>' +
            errLine('qd-msg-err', e) + '</div>';
    }

    function bodyDetails() {
        var html = '';
        if (F.screen !== 'wa1') {
            var what = PAGE === 'reservering' ? partyLabel() : (F.svc >= 0 ? br().svc[F.svc].n : '');
            var when = F.day >= 0 ? DAYS[F.day].short + ' om ' + F.slot : '';
            html += '<div class="qd-phone-sum">' + I.calSm + '<span><b>' + esc(what) + '</b><span> · ' + esc(when) + '</span></span></div>';
        }
        html += '<div class="qd-fields">' +
            field('qd-naam', 'naam', 'Naam', 'text', 'autocomplete="name" maxlength="60" placeholder="Voor- en achternaam"') +
            field('qd-tel', 'tel', 'Mobiel nummer', 'tel', 'inputmode="tel" autocomplete="tel" maxlength="20" placeholder="06 12345678"') +
            '</div>';
        if (F.screen === 'res2') {
            html += '<div class="qd-field"><label class="qd-label" for="qd-opm">Opmerking <small>(mag leeg blijven)</small></label>' +
                '<textarea class="qd-input is-short" id="qd-opm" data-field="opm" rows="2" maxlength="200" placeholder="' +
                (br().evening ? 'Bijvoorbeeld een kinderstoel of een allergie' : 'Iets wat we moeten weten?') + '">' + esc(F.opm) + '</textarea></div>';
        }
        html += '<p class="qd-note">' + I.lock + '<span>Je nummer gebruiken we alleen voor de bevestiging en de herinnering.</span></p>';
        return html;
    }

    function sideSummary() {
        var rows = PAGE === 'reservering'
            ? [['Personen', partyLabel()], ['Dag', F.day >= 0 ? cap(DAYS[F.day].long) : ''], ['Tijd', F.slot]]
            : [['Waarvoor', F.svc >= 0 ? br().svc[F.svc].n : ''], ['Dag', F.day >= 0 ? cap(DAYS[F.day].long) : ''], ['Tijd', F.slot]];
        return '<p class="qd-kicker">' + (PAGE === 'reservering' ? 'Jouw reservering' : 'Jouw afspraak') + '</p>' +
            '<div class="qd-side-biz">' + esc(biz()) + '</div>' +
            '<dl class="qd-sum">' + rows.map(function (r) {
                return '<div><dt>' + r[0] + '</dt><dd' + (r[1] ? '' : ' class="is-empty"') + '>' + esc(r[1] || 'Nog niet gekozen') + '</dd></div>';
            }).join('') + '</dl>' +
            '<div class="qd-side-note">' + I.bell + '<span>Na het bevestigen komt er een WhatsApp-bericht en een dag van tevoren een herinnering.</span></div>';
    }

    function sidePreview() {
        return '<p class="qd-kicker">Zo komt het binnen</p>' +
            '<div class="qd-who"><span class="qd-avatar">' + esc(biz().charAt(0).toUpperCase()) + '</span><span><b>' + esc(biz()) + '</b><small>via WhatsApp</small></span></div>' +
            '<div class="qd-preview" id="qd-preview">' + previewInner() + '</div>';
    }
    function previewInner() {
        var topic = F.topic >= 0 ? br().svc[F.topic].n : '';
        var msg = F.bericht.trim();
        if (!topic && !msg) return '<p class="qd-preview-empty">Je bericht verschijnt hier zodra je iets kiest of typt.</p>';
        var from = F.naam.trim() ? F.naam.trim() + (F.tel.trim() ? ', ' + F.tel.trim() : '') : '';
        return '<div class="qd-bubble is-out is-lg">' + esc((topic ? topic + '\n' : '') + F.bericht) + '</div>' +
            (from ? '<div class="qd-preview-from">' + esc(from) + '</div>' : '');
    }

    function viewLoading() {
        var t = {afspraak: ['Afspraak vastleggen', 'We zetten de afspraak in de agenda en sturen de bevestiging.'],
            reservering: ['Reservering vastleggen', 'We zetten de reservering in je lijst en sturen de bevestiging.'],
            whatsapp: ['Bericht versturen', 'We sturen je aanvraag naar ' + biz() + '.']}[PAGE];
        return '<div class="qd-loading" role="status" aria-live="polite"><span class="qd-spin"></span>' +
            '<h2 class="qd-h2" id="qd-title" tabindex="-1">' + esc(t[0]) + '</h2><p>' + esc(t[1]) + '</p></div>';
    }

    function viewMoment() {
        var b = br(), n = b.svc.length, nm = names(), rv = F.reveal;
        var isWa = PAGE === 'whatsapp', isRes = PAGE === 'reservering';
        var day = DAYS[F.day >= 0 ? F.day : 1];
        var slot = F.slot;
        var svcName = F.svc >= 0 ? b.svc[F.svc].n : b.svc[0].n;
        var topic = F.topic >= 0 ? b.svc[F.topic].n : b.svc[0].n;
        var pl = partyLabel() || '2 personen';

        var title, text, inMsg, ghost = '';
        if (isWa) {
            title = 'Aanvraag is binnen';
            text = 'De aanvraag staat in je lijst en ' + nm.first + ' weet dat hij binnen is.';
            inMsg = 'Dank je, ' + nm.first + '. We hebben je vraag over ' + topic.toLowerCase() + ' ontvangen en sturen je zo snel mogelijk een voorstel.';
        } else if (isRes) {
            title = 'Reservering staat vast';
            text = nm.first + ' krijgt een bevestiging, de tafel staat in je lijst en de herinnering is al gepland.';
            inMsg = 'Hoi ' + nm.first + ', je reservering bij ' + biz() + ' staat vast.\n' + pl + ', ' + day.long + ' om ' + slot + '.' + (F.opm.trim() ? '\nOpmerking: ' + F.opm.trim() : '') + '\nTot dan!';
            ghost = 'Herinnering: morgen om ' + slot + ' staat je tafel klaar bij ' + biz() + '.';
        } else {
            title = 'Afspraak staat vast';
            text = nm.first + ' krijgt een bevestiging, de afspraak staat in je agenda en de herinnering is al gepland.';
            inMsg = 'Hoi ' + nm.first + ', je afspraak bij ' + biz() + ' staat vast.\n' + svcName + ', ' + day.long + ' om ' + slot + '.\nKun je toch niet? Stuur VERZET.';
            ghost = 'Herinnering: morgen om ' + slot + ' zien we je bij ' + biz() + '.';
        }

        // Phone
        var chat = '<span class="qd-chat-date">Vandaag</span>';
        if (isWa) chat += '<div class="qd-bubble is-out">' + esc(topic + '\n' + F.bericht.trim()) + '<time>10:01</time></div>';
        if (rv < 1) chat += '<div class="qd-typing" role="img" aria-label="' + esc(biz()) + ' is aan het typen"><i></i><i></i><i></i></div>';
        else {
            chat += '<div class="qd-bubble is-in qd-up">' + esc(inMsg) + '<time>10:02</time></div>';
            if (ghost) chat += '<div class="qd-bubble is-ghost qd-up"><span class="qd-plan">Gepland · ' + esc(day.prev + ', ' + slot) + '</span>' + esc(ghost) + '</div>';
        }
        var phone = '<div class="qd-phone"><div class="qd-phone-screen">' +
            '<div class="qd-chat-head"><span class="qd-avatar">' + esc(biz().charAt(0).toUpperCase()) + '</span><span><b>' + esc(biz()) + '</b><small>Zakelijk account</small></span></div>' +
            '<div class="qd-chat">' + chat + '</div><div class="qd-chat-input"><span>Bericht</span></div></div></div>';

        // Agenda or inbox
        var rows;
        if (isWa) {
            rows = [{t: '09:12', who: 'Joost P.', what: b.svc[0].n, status: 'Beantwoord'}, {t: 'gisteren', who: 'Emma S.', what: b.svc[1 % n].n, status: 'Voorstel verstuurd'}];
            if (rv >= 2) rows.unshift({t: 'nu', who: nm.short, what: topic, isNew: true});
        } else {
            if (b.evening) {
                rows = [{t: '18:00', who: 'Fam. de Jong', what: isRes ? '2 personen' : b.svc[0].n}, {t: '19:30', who: 'Mo A.', what: isRes ? '6 personen' : b.svc[2 % n].n}, {t: '20:30', who: 'Lisa V.', what: isRes ? '2 personen' : b.svc[0].n}];
            } else {
                rows = [{t: '09:00', who: 'Fatima B.', what: isRes ? '2 personen' : b.svc[1 % n].n}, {t: '11:30', who: 'Daan K.', what: isRes ? '1 persoon' : b.svc[0].n}, {t: '14:00', who: 'Yara M.', what: isRes ? '3 personen' : b.svc[2 % n].n}];
            }
            if (rv >= 2) rows.push({t: slot, who: nm.short, what: isRes ? pl : svcName, isNew: true});
            rows.sort(function (a, c) { return a.t < c.t ? -1 : a.t > c.t ? 1 : 0; });
        }
        var list = rows.map(function (r) {
            return '<div class="qd-row' + (r.isNew ? ' is-new' : '') + '"><span class="qd-row-t' + (isWa ? ' is-wide' : '') + '">' + esc(r.t) + '</span>' +
                '<span class="qd-row-who"><b>' + esc(r.who) + '</b><span>' + esc(r.what) + '</span></span>' +
                (r.isNew ? '<span class="qd-new">Nieuw</span>' : (r.status ? '<span class="qd-row-status">' + esc(r.status) + '</span>' : '')) + '</div>';
        }).join('');
        if (rv < 2) list += '<div class="qd-row is-wait"><span class="qd-spin is-sm"></span><span>' + (isWa ? 'Aanvraag komt binnen' : 'Wordt in je agenda gezet') + '</span></div>';
        var agLabel = isWa ? 'Jouw aanvragen' : 'Jouw agenda';

        // Timeline
        var steps = isWa ? [
            ['Bevestiging', nm.first + ' krijgt direct bericht dat de aanvraag binnen is.'],
            ['Herinnering na 24 uur', 'Nog niet gereageerd? Dan krijg jij morgen een seintje.'],
            ['Vraag om review', 'Na de klus vragen we ' + nm.first + ' om een review.']
        ] : [
            ['Bevestiging', 'Direct naar ' + nm.first + ' via WhatsApp.'],
            ['Herinnering 24 uur van tevoren', cap(day.prev) + ' om ' + slot + '.'],
            ['Vraag om review', 'Na ' + (isRes ? 'het bezoek' : 'de afspraak') + ' vragen we ' + nm.first + ' om een review.']
        ];
        var tl = steps.map(function (x, i) {
            var done = i === 0 && rv >= 1, busy = i === 0 && !done;
            return '<li class="' + (done ? 'is-done' : busy ? 'is-busy' : '') + '"><span class="qd-tl-rail"><span class="qd-tl-node">' + (done ? I.check : I.clockSm) + '</span>' +
                (i < 2 ? '<span class="qd-tl-line"></span>' : '') + '</span>' +
                '<span class="qd-tl-body"><span class="qd-tl-title"><b>' + esc(x[0]) + '</b><span class="qd-state">' + (done ? 'Verstuurd' : busy ? 'Bezig' : 'Gepland') + '</span></span><span>' + esc(x[1]) + '</span></span></li>';
        }).join('');

        return '<div class="qd-moment">' +
            '<div class="qd-moment-head" role="status" aria-live="polite"><p class="qd-kicker">' + I.checkCircle + '<span>Dit gebeurt er vanzelf</span></p>' +
            '<h1 class="qd-h1" id="qd-title" tabindex="-1">' + title + '</h1><p class="qd-lead">' + esc(text) + '</p></div>' +
            '<div class="qd-moment-grid">' +
            '<section class="qd-mcol is-phone" aria-label="Telefoon van je klant"><div class="qd-label">01 · Je klant</div>' + phone + '</section>' +
            '<section class="qd-mcol" aria-label="' + agLabel + '"><div class="qd-label">02 · ' + agLabel + '</div><div class="qd-panel">' +
            '<div class="qd-panel-head"><b>' + (isWa ? 'Aanvragen' : 'Agenda ' + esc(day.short)) + '</b><span>' + esc(biz()) + '</span></div>' + list + '</div></section>' +
            '<section class="qd-mcol is-tl" aria-label="Wat er vanzelf gebeurt"><div class="qd-label">03 · Wat er vanzelf gebeurt</div><div class="qd-panel">' +
            '<ol class="qd-tl">' + tl + '</ol><div class="qd-tl-foot">' + I.clock20 + '<span>Jij hoeft hier niets voor te doen.</span></div></div></section>' +
            '</div>' +
            '<div class="qd-actions"><button type="button" class="qd-btn-2" data-act="again" data-fid="again">Nog een keer</button>' +
            '<a class="qd-btn" href="./' + esc(query()) + '">Terug naar overzicht</a></div>' +
            '</div>';
    }

    // ---------- Render ----------
    var app = document.getElementById('app');

    function render(opts) {
        opts = opts || {};
        var active = document.activeElement;
        var fid = active && app.contains(active) ? active.getAttribute('data-fid') : null;

        var main;
        if (PAGE === 'hub') main = viewHub();
        else if (F.screen === 'loading') main = viewLoading();
        else if (F.screen === 'moment') main = viewMoment();
        else main = viewFlow();
        app.innerHTML = header() + '<main class="qd-main" id="qd-main">' + main + '</main>';
        var chat = app.querySelector('.qd-chat');
        if (chat) chat.scrollTop = chat.scrollHeight;

        if (opts.newScreen) {
            window.scrollTo(0, 0);
            var t = document.getElementById('qd-title');
            if (t) t.focus({preventScroll: true});
        } else if (opts.focus) {
            var f = document.getElementById(opts.focus);
            if (f) f.focus();
        } else if (fid) {
            var el = app.querySelector('[data-fid="' + fid + '"]');
            if (el && !el.disabled) el.focus({preventScroll: true});
        }
    }

    function go(screen) {
        F.screen = screen;
        F.err = {};
        F.topErr = '';
        render({newScreen: true});
    }

    function submit() {
        clearTimers();
        F.err = {};
        F.topErr = '';
        F.reveal = 0;
        F.screen = 'loading';
        render({newScreen: true});
        timers = [
            setTimeout(function () { F.screen = 'moment'; render({newScreen: true}); }, 1400),
            setTimeout(function () { F.reveal = 1; render(); }, 2000),
            setTimeout(function () { F.reveal = 2; render(); }, 2700),
            setTimeout(function () { F.reveal = 3; render(); }, 3400)
        ];
    }

    function fail(e, withTop) {
        F.err = e;
        var keys = Object.keys(e);
        F.topErr = withTop ? 'Nog ' + keys.length + ' ' + (keys.length === 1 ? 'ding' : 'dingen') + ' aanpassen, dan ' + SUF[PAGE] + '.' : '';
        var first = {svc: 'svc-0', party: 'party-0', slot: null, topic: 'topic-0', bericht: 'qd-msg', naam: 'qd-naam', tel: 'qd-tel'}[keys[0]];
        render();
        if (F.topErr) {
            var fieldId = {bericht: 'qd-msg', naam: 'qd-naam', tel: 'qd-tel'}[keys.filter(function (k) { return k === 'bericht' || k === 'naam' || k === 'tel'; })[0]];
            var el = fieldId ? document.getElementById(fieldId) : document.getElementById('qd-alert');
            if (el) el.focus();
        } else if (first) {
            var c = app.querySelector('[data-fid="' + first + '"]');
            if (c) c.focus();
        }
    }

    function next() {
        var e = {};
        var s = F.screen;
        if (s === 'af1') {
            if (F.svc < 0) return fail({svc: 'Kies eerst waarvoor je komt.'});
            return go('af2');
        }
        if (s === 'af2') {
            if (F.day < 0 || !F.slot) return fail({slot: F.day < 0 ? 'Kies eerst een dag.' : 'Kies een tijd.'});
            return go('af3');
        }
        if (s === 'res1') {
            if (F.party < 0) e.party = 'Kies met hoeveel personen je komt.';
            if (F.day < 0) e.slot = 'Kies een dag en een tijd.';
            else if (!F.slot) e.slot = 'Kies een tijd.';
            if (Object.keys(e).length) return fail(e);
            return go('res2');
        }
        if (s === 'wa1') {
            if (F.topic < 0) e.topic = 'Kies waar je vraag over gaat.';
            if (F.bericht.trim().length < 5) e.bericht = 'Schrijf kort wat je nodig hebt.';
        }
        var nm = F.naam.trim();
        if (!nm) e.naam = 'Vul je naam in.';
        else if (nm.length < 2) e.naam = 'Vul je hele naam in.';
        if (!F.tel.trim()) e.tel = 'Vul je mobiele nummer in, dan sturen we de bevestiging.';
        else if (!telOk(F.tel)) e.tel = 'Dit nummer klopt niet. Gebruik 10 cijfers, bijvoorbeeld 06 12345678.';
        if (Object.keys(e).length) return fail(e, true);
        submit();
    }

    function clearErr(key) {
        if (!F.err[key]) return;
        delete F.err[key];
        if (!Object.keys(F.err).length) F.topErr = '';
    }

    // ---------- Events ----------
    app.addEventListener('click', function (ev) {
        var t = ev.target.closest('[data-act]');
        if (!t || t.disabled) return;
        var act = t.getAttribute('data-act');
        var v = t.getAttribute('data-v');
        switch (act) {
            case 'type':
                S.branche = v;
                persist();
                render();
                break;
            case 'back':
                if (BACK[F.screen]) go(BACK[F.screen]);
                else { clearTimers(); location.href = './' + query(); }
                break;
            case 'next': next(); break;
            case 'again': resetFlow(); render({newScreen: true}); break;
            case 'svc': F.svc = +v; clearErr('svc'); render(); break;
            case 'party': F.party = +v; clearErr('party'); render(); break;
            case 'day': F.day = +v; F.slot = ''; render(); break;
            case 'slot': F.slot = v; clearErr('slot'); render(); break;
            case 'topic': F.topic = +v; clearErr('topic'); render(); break;
        }
    });

    // Typing never re-renders the page (that would drop focus); it updates
    // only the parts that depend on the field.
    app.addEventListener('input', function (ev) {
        var t = ev.target;
        var key = t.getAttribute('data-field');
        if (!key) return;
        if (key === 'bedrijf') {
            S.bedrijf = t.value.slice(0, 80);
            persist();
            var tooLong = S.bedrijf.length > 40;
            document.getElementById('qd-bizname').textContent = biz();
            t.setAttribute('aria-invalid', String(tooLong));
            document.getElementById('qd-biz-hint').innerHTML = bizHint(tooLong);
            app.querySelectorAll('[data-card]').forEach(function (a) { a.setAttribute('href', a.getAttribute('data-card') + query()); });
            app.querySelector('.qd-word').setAttribute('href', './' + query());
            return;
        }
        F[key] = t.value;
        if (F.err[key]) {
            clearErr(key);
            t.setAttribute('aria-invalid', 'false');
            t.removeAttribute('aria-describedby');
            var line = t.parentNode.querySelector('.qd-err');
            if (line) line.remove();
            if (!F.topErr) { var al = document.getElementById('qd-alert'); if (al) al.remove(); }
        }
        if (PAGE === 'whatsapp') {
            var p = document.getElementById('qd-preview');
            if (p) p.innerHTML = previewInner();
        }
    });

    render();

    // Offline support: cache the demo so it also opens without internet
    // (for example on the iPad in a shop with bad Wi-Fi).
    if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('sw.js').catch(function () { /* demo still works online */ });
        });
    }
})();
