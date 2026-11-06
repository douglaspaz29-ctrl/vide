/**
 * =====================================================================
 * CHROMA GRID VANILLA (ReactBits Spec Adapted for VIDE)
 * Mouse Spotlight Reveal // Dynamic Accent Colors // Grayscale Transition
 * =====================================================================
 */

(function () {
    function inicializarChromaGrid() {
        const cards = document.querySelectorAll('.chroma-card');
        if (!cards.length) return;

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--chroma-x', `${x}px`);
                card.style.setProperty('--chroma-y', `${y}px`);
            });

            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--chroma-x', `-999px`);
                card.style.setProperty('--chroma-y', `-999px`);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarChromaGrid);
    } else {
        inicializarChromaGrid();
    }

    window.inicializarChromaGrid = inicializarChromaGrid;
})();
