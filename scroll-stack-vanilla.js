/**
 * =====================================================================
 * VIDE — REACT BITS SCROLL STACK VANILLA RUNTIME
 * Componente: ScrollStack & ScrollStackItem (React Bits)
 * Mecânica: Efeito de baralho com cartões empilháveis em scroll contínuo,
 * escala progressiva (itemScale), compensação de profundidade (itemStackDistance)
 * e sombreamento cinemático.
 * =====================================================================
 */

(function (window, document) {
    'use strict';

    class ScrollStackVanilla {
        constructor(wrapper, options = {}) {
            if (!wrapper) return;
            this.wrapper = wrapper;
            this.options = Object.assign({
                items: [],
                itemDistance: 100,
                itemScale: 0.035,        // Escala de redução por card empilhado
                itemStackDistance: 18,    // Distância vertical entre cards no topo da pilha
                stackTop: 36,            // Posição sticky em pixels do topo
                baseScale: 0.88,
                blurAmount: 0
            }, options);

            this.items = this.options.items || [];
            if (this.items.length === 0) return;

            this.cards = [];
            this.buildDOM();
            this.attachEvents();
            this.updateStack();
        }

        buildDOM() {
            // Se o DOM já possui a estrutura renderizada no HTML (SSR / Static HTML)
            const existingScroller = this.wrapper.querySelector('.scroll-stack-container');
            const existingCards = this.wrapper.querySelectorAll('.scroll-stack-card');

            if (existingScroller && existingCards.length > 0) {
                this.scroller = existingScroller;
                this.inner = this.wrapper.querySelector('.scroll-stack-inner') || this.scroller;
                this.cards = Array.from(existingCards);
                this.counterEl = this.wrapper.querySelector('#scroll-stack-counter');

                this.cards.forEach((card, idx) => {
                    const stickyOffset = this.options.stackTop + (idx * this.options.itemStackDistance);
                    card.style.top = `${stickyOffset}px`;
                    card.style.zIndex = (idx + 1).toString();
                });
                return;
            }

            this.wrapper.innerHTML = '';

            // Container com barra de rolagem estilizada
            this.scroller = document.createElement('div');
            this.scroller.className = 'scroll-stack-container';

            // Barra superior informativa
            const hint = document.createElement('div');
            hint.className = 'scroll-stack-hint';
            hint.innerHTML = `
                <span><i class="fas fa-layer-group"></i> FLUXO DE EXECUÇÃO EM GRAFO DAG // <span class="destaque-hint">7 AGENTES HOMOLOGADOS</span></span>
                <span id="scroll-stack-counter" style="color: var(--cyan-core); font-weight: 700;">01 / 07</span>
            `;
            this.scroller.appendChild(hint);

            // Container interno que define a altura de rolagem
            this.inner = document.createElement('div');
            this.inner.className = 'scroll-stack-inner';
            this.scroller.appendChild(this.inner);

            this.cards = [];

            // Construir cada ScrollStackItem
            this.items.forEach((item, idx) => {
                const card = document.createElement('div');
                card.className = `scroll-stack-card ${item.destaque ? 'destaque-coordenador' : ''}`;
                card.dataset.index = idx;

                // Definir offset sticky para cada card
                const stickyOffset = this.options.stackTop + (idx * this.options.itemStackDistance);
                card.style.top = `${stickyOffset}px`;
                card.style.zIndex = (idx + 1).toString();

                const chipClass = item.destaque ? 'stack-card-chip chip-gold' : 'stack-card-chip';
                const iconClass = item.destaque ? 'stack-card-icon-circle icon-gold' : 'stack-card-icon-circle';
                const pillIcon = item.destaque ? 'fas fa-crown' : 'fas fa-check-circle';

                card.innerHTML = `
                    <div class="stack-card-topo">
                        <span class="${chipClass}">
                            <i class="${item.icon}"></i> ${item.tag}
                        </span>
                        <div class="${iconClass}">
                            <i class="${item.icon}"></i>
                        </div>
                    </div>
                    <div class="stack-card-corpo">
                        <h3 class="stack-card-titulo">${item.title}</h3>
                        <div class="stack-card-subtitulo">${item.subtitle}</div>
                        <p class="stack-card-desc">${item.desc}</p>
                    </div>
                    <div class="stack-card-rodape">
                        <div class="stack-entregavel-pill">
                            <i class="${pillIcon}" style="${item.destaque ? 'color: #FFD700;' : ''}"></i>
                            <span>${item.entregavel}</span>
                        </div>
                        <div class="stack-card-status">
                            <span class="stack-status-dot" style="${item.destaque ? 'background: #FFD700; box-shadow: 0 0 8px #FFD700;' : ''}"></span>
                            <span>SISTEMA HOMOLOGADO</span>
                        </div>
                    </div>
                `;

                this.inner.appendChild(card);
                this.cards.push(card);
            });

            this.wrapper.appendChild(this.scroller);
            this.counterEl = hint.querySelector('#scroll-stack-counter');
        }

        attachEvents() {
            this.onScroll = this.updateStack.bind(this);
            this.scroller.addEventListener('scroll', this.onScroll, { passive: true });
        }

        updateStack() {
            const scrollTop = this.scroller.scrollTop;
            const containerHeight = this.scroller.clientHeight;
            const count = this.cards.length;

            let currentActiveIndex = 0;

            for (let i = 0; i < count; i++) {
                const card = this.cards[i];
                // Posição do card relativa ao container
                const cardTop = card.offsetTop - scrollTop;
                const stickyPoint = this.options.stackTop + (i * this.options.itemStackDistance);

                // Verificar se o card já ancorou no topo (empilhou)
                const isStacked = cardTop <= stickyPoint + 2;

                if (isStacked) {
                    currentActiveIndex = i;

                    // Quantos cards estão acima/à frente deste
                    // Efeito de encolhimento e sombreamento progressivo (React Bits itemScale)
                    const cardsAbove = (count - 1) - i;
                    // Escala sutil para criar profundidade de deck
                    // O card atual da frente fica 1.0, os anteriores diminuem
                }
            }

            // Aplicar escala e iluminação baseada na distância relativa
            for (let i = 0; i < count; i++) {
                const card = this.cards[i];
                const cardTop = card.offsetTop - scrollTop;
                const stickyPoint = this.options.stackTop + (i * this.options.itemStackDistance);

                if (cardTop <= stickyPoint + 1) {
                    // Card está ancorado no topo
                    // Quão mais fundo ele está em relação ao topo ativo atual
                    const depthFromActive = Math.max(0, currentActiveIndex - i);
                    const scale = 1 - (depthFromActive * this.options.itemScale);
                    const brightness = 1 - (depthFromActive * 0.08);

                    card.style.transform = `scale(${Math.max(0.85, scale)})`;
                    card.style.filter = `brightness(${Math.max(0.5, brightness)})`;
                    card.style.opacity = Math.max(0.4, 1 - depthFromActive * 0.12).toString();
                } else {
                    // Card ainda está subindo no fluxo normal
                    card.style.transform = 'scale(1)';
                    card.style.filter = 'brightness(1)';
                    card.style.opacity = '1';
                }
            }

            // Atualizar contador de agente ativo
            if (this.counterEl) {
                const num = (currentActiveIndex + 1).toString().padStart(2, '0');
                const total = count.toString().padStart(2, '0');
                this.counterEl.textContent = `${num} / ${total}`;
            }
        }

        destroy() {
            if (this.scroller && this.onScroll) {
                this.scroller.removeEventListener('scroll', this.onScroll);
            }
        }
    }

    // Expor globalmente para inicialização no app institucional
    window.criarScrollStack = function (wrapperId, options) {
        const wrapper = typeof wrapperId === 'string' ? document.getElementById(wrapperId) : wrapperId;
        if (!wrapper) return null;
        return new ScrollStackVanilla(wrapper, options);
    };

})(window, document);
