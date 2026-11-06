/**
 * =====================================================================
 * VIDE — REACT BITS SCROLL EXPAND VANILLA RUNTIME
 * Componente: ScrollExpand (React Bits)
 * Mecânica: Quadro de mídia com cantos arredondados que expande suavemente
 * para full-bleed à medida que o usuário rola a página (useWindowScroll).
 * =====================================================================
 */

(function (window, document) {
    'use strict';

    class ScrollExpandVanilla {
        constructor(wrapperOrId, options = {}) {
            this.wrapper = typeof wrapperOrId === 'string' ? document.getElementById(wrapperOrId) : wrapperOrId;
            if (!this.wrapper) return;

            this.options = Object.assign({
                src: 'assets/img/diagnostico_hero.svg',
                alt: 'Diagnóstico Operacional VIDE',
                title: 'Diagnóstico Operacional',
                scrollHint: 'Role para expandir o diagnóstico',
                useWindowScroll: true,
                mediaZoom: 1.25,
                startWidth: 78,      // %
                startRadius: 24,     // px
                endRadius: 16,       // px
                scrollDistance: 1.2,
                holdDistance: 0.35,
                smoothing: 0.1,
                overlayScrim: 0.55,
                enabled: true
            }, options);

            this.targetProgress = 0;
            this.currentProgress = 0;
            this.rafId = null;

            this.buildDOM();
            this.attachEvents();
            this.update(true);
        }

        buildDOM() {
            // Verificar se o HTML já contém elementos pré-renderizados
            const existingFrame = this.wrapper.querySelector('.scroll-expand-frame');
            if (existingFrame) {
                this.frame = existingFrame;
                this.media = this.wrapper.querySelector('.scroll-expand-media');
                this.scrim = this.wrapper.querySelector('.scroll-expand-scrim');
                this.content = this.wrapper.querySelector('.scroll-expand-content');
                this.hint = this.wrapper.querySelector('.scroll-expand-hint');
                return;
            }

            this.wrapper.classList.add('scroll-expand-container');

            // Frame expansível
            this.frame = document.createElement('div');
            this.frame.className = 'scroll-expand-frame';
            this.frame.style.width = `${this.options.startWidth}%`;
            this.frame.style.height = `${this.options.startHeight}%`;
            this.frame.style.borderRadius = `${this.options.startRadius}px`;

            // Mídia (imagem / SVG de luxo)
            this.media = document.createElement('img');
            this.media.className = 'scroll-expand-media';
            this.media.src = this.options.src;
            this.media.alt = this.options.alt;
            this.media.loading = 'lazy';
            this.frame.appendChild(this.media);

            // Scrim escuro
            this.scrim = document.createElement('div');
            this.scrim.className = 'scroll-expand-scrim';
            this.scrim.style.opacity = this.options.overlayScrim.toString();
            this.frame.appendChild(this.scrim);

            // Conteúdo textual
            this.content = document.createElement('div');
            this.content.className = 'scroll-expand-content';
            this.content.innerHTML = `
                <h2>Onde as Operações Tradicionais Perdem Faturamento</h2>
                <p>O ecossistema que une presença digital de autoridade, atendimento em menos de 1 segundo no WhatsApp e auditoria de conversas em tempo real.</p>
            `;
            this.frame.appendChild(this.content);

            // Dica de rolagem
            if (this.options.scrollHint) {
                this.hint = document.createElement('div');
                this.hint.className = 'scroll-expand-hint';
                this.hint.innerHTML = `<i class="fas fa-arrows-up-down"></i> <span>${this.options.scrollHint}</span>`;
                this.frame.appendChild(this.hint);
            }

            this.wrapper.appendChild(this.frame);
        }

        attachEvents() {
            this.onScroll = () => {
                if (!this.options.enabled) return;
                this.calculateProgress();
            };

            window.addEventListener('scroll', this.onScroll, { passive: true });
            window.addEventListener('resize', this.onScroll, { passive: true });
        }

        calculateProgress() {
            const rect = this.wrapper.getBoundingClientRect();
            const winHeight = window.innerHeight || document.documentElement.clientHeight;

            // Início do trigger: quando o topo do wrapper atinge 80% da tela
            // Fim do trigger: após rolar scrollDistance * winHeight
            const triggerStart = winHeight * 0.85;
            const triggerDistance = winHeight * this.options.scrollDistance;

            const scrolledInto = triggerStart - rect.top;
            let rawProgress = scrolledInto / triggerDistance;
            rawProgress = Math.max(0, Math.min(1, rawProgress));

            // Aplicação de holdDistance (tempo que o card permanece travado/aberto)
            const expandRatio = 1.0 / (1.0 + this.options.holdDistance);
            const normalizedProgress = Math.min(1.0, rawProgress / expandRatio);

            this.targetProgress = normalizedProgress;

            if (!this.rafId) {
                this.rafId = requestAnimationFrame(this.render.bind(this));
            }
        }

        render() {
            // LERP smoothing
            const diff = this.targetProgress - this.currentProgress;
            this.currentProgress += diff * this.options.smoothing;

            this.applyStyles(this.currentProgress);

            if (Math.abs(diff) > 0.001) {
                this.rafId = requestAnimationFrame(this.render.bind(this));
            } else {
                this.currentProgress = this.targetProgress;
                this.applyStyles(this.currentProgress);
                this.rafId = null;
            }
        }

        applyStyles(p) {
            if (!this.frame) return;

            // Interpolação de Largura (startWidth% -> 100%)
            const w = this.options.startWidth + (100 - this.options.startWidth) * p;
            this.frame.style.width = `${w.toFixed(2)}%`;

            // Interpolação de Raio de Borda (startRadius -> endRadius)
            const r = this.options.startRadius - (this.options.startRadius - this.options.endRadius) * p;
            this.frame.style.borderRadius = `${r.toFixed(1)}px`;

            // Zoom da mídia (1.0 -> mediaZoom)
            if (this.media) {
                const zoom = 1.0 + (this.options.mediaZoom - 1.0) * p;
                this.media.style.transform = `scale(${zoom.toFixed(3)})`;
            }

            // Scrim
            if (this.scrim) {
                const scrimVal = Math.min(0.75, this.options.overlayScrim + (0.15 * p));
                this.scrim.style.opacity = scrimVal.toFixed(2);
            }

            // Hint fade-out quando expandido
            if (this.hint) {
                this.hint.style.opacity = Math.max(0, 1 - p * 2.2).toFixed(2);
            }
        }

        update(immediate = false) {
            this.calculateProgress();
            if (immediate) {
                this.currentProgress = this.targetProgress;
                this.applyStyles(this.currentProgress);
            }
        }
    }

    window.criarScrollExpand = function (wrapperOrId, options) {
        return new ScrollExpandVanilla(wrapperOrId, options);
    };

})(window, document);
