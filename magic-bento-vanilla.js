/**
 * =====================================================================
 * MAGIC BENTO VANILLA ENGINE (ReactBits Spec Adapted for VIDE Dashboard)
 * Spotlight Tracking // Border Glow // Click Effect // Particle Count
 * =====================================================================
 */

(function () {
    function inicializarMagicBento() {
        const cards = document.querySelectorAll('.magic-bento-card, [data-magic-bento]');
        if (!cards.length) return;

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });

            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--mouse-x', `-999px`);
                card.style.setProperty('--mouse-y', `-999px`);
            });

            card.addEventListener('click', () => {
                card.classList.remove('click-burst-active');
                void card.offsetWidth; // Force reflow
                card.classList.add('click-burst-active');
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarMagicBento);
    } else {
        inicializarMagicBento();
    }

    window.inicializarMagicBento = inicializarMagicBento;
})();
