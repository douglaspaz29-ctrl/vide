/**
 * =====================================================================
 * GOOEY NAV VANILLA ENGINE (ReactBits Spec Adapted for VIDE)
 * Organic Indicator Movement // Zero Pill Shape // Mobile Safe
 * =====================================================================
 */

(function () {
    function inicializarGooeyNav() {
        const tracks = document.querySelectorAll('.gooey-nav-track, #nav-track');
        if (!tracks.length) return;

        tracks.forEach(track => {
            const indicator = track.querySelector('.gooey-indicator, #nav-pill, .morphic-nav-pill');
            const links = track.querySelectorAll('a');
            if (!indicator || !links.length) return;

            function moveTo(target) {
                const trackRect = track.getBoundingClientRect();
                const targetRect = target.getBoundingClientRect();
                const x = targetRect.left - trackRect.left;
                const width = targetRect.width;

                indicator.style.transform = `translateX(${x}px)`;
                indicator.style.width = `${width}px`;
                indicator.style.opacity = '1';
            }

            // Set initial position to active or first link
            const active = track.querySelector('.is-active') || links[0];
            if (active) moveTo(active);

            links.forEach(link => {
                link.addEventListener('mouseenter', () => moveTo(link));
                link.addEventListener('click', () => {
                    links.forEach(l => l.classList.remove('is-active'));
                    link.classList.add('is-active');
                    moveTo(link);
                });
            });

            track.addEventListener('mouseleave', () => {
                const currentActive = track.querySelector('.is-active') || links[0];
                if (currentActive) moveTo(currentActive);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarGooeyNav);
    } else {
        inicializarGooeyNav();
    }

    window.inicializarGooeyNav = inicializarGooeyNav;
})();
