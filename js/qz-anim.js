/* Explainer animations: scale each fixed-size scene to its container,
   play only while it is on screen, and wire up the pause buttons. */
(function () {
    'use strict';

    function fit(box) {
        var w = +box.getAttribute('data-w'), h = +box.getAttribute('data-h');
        var stage = box.querySelector('.qa-stage');
        if (!stage || !w || !h || !box.offsetWidth) return;
        var s = Math.min(box.offsetWidth / w, +box.getAttribute('data-max') || 1);
        stage.style.transform = 'scale(' + s + ')';
        box.style.height = Math.round(h * s) + 'px';
        box.style.maxWidth = Math.round(w * (+box.getAttribute('data-max') || 1)) + 'px';
    }
    function fitAll() { document.querySelectorAll('.qa-fit').forEach(fit); }

    function init() {
        fitAll();
        window.addEventListener('resize', fitAll);
        if (window.ResizeObserver) {
            var ro = new ResizeObserver(function (entries) { entries.forEach(function (e) { fit(e.target); }); });
            document.querySelectorAll('.qa-fit').forEach(function (b) { ro.observe(b); });
        }

        var scenes = document.querySelectorAll('.qa-scene');
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (e) { e.target.classList.toggle('is-live', e.isIntersecting); });
            }, {threshold: 0.25});
            scenes.forEach(function (s) { io.observe(s); });
        } else {
            scenes.forEach(function (s) { s.classList.add('is-live'); });
        }

        var nl = (document.documentElement.lang || '').toLowerCase().indexOf('nl') === 0;
        var label = {pause: nl ? 'Animatie pauzeren' : 'Pause animation', play: nl ? 'Animatie afspelen' : 'Play animation'};
        document.querySelectorAll('.qa-pause').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var scene = btn.closest('.qa-scene');
                var paused = scene.classList.toggle('is-paused');
                btn.setAttribute('aria-pressed', String(paused));
                btn.setAttribute('aria-label', paused ? label.play : label.pause);
            });
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
