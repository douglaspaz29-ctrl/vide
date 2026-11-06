/**
 * =====================================================================
 * VIDE — REACT BITS CIRCULAR CAROUSEL 3D RUNTIME
 * Componente: CircularCarousel (React Bits)
 * Presets: cylinder, tilt=-5, curve=1, perspective=2500, autoplay="drift",
 * speed=14, momentum=0.6, snap, pauseOnHover, focusOnClick, draggable,
 * depthFade=0.55, innerShade=0.6, fadeColor="#106f80", cornerRadius=12
 * =====================================================================
 */

(function (window, document) {
    'use strict';

    class CircularCarouselVanilla {
        constructor(container, options = {}) {
            if (!container) return;
            this.container = container;
            this.options = Object.assign({
                items: [],
                preset: 'cylinder',
                intro: 'rise',
                cardWidth: 292,
                aspectRatio: 1,
                speed: 14,             // graus por segundo
                captions: true,
                gap: 25,
                tilt: -5,
                curve: 1,
                perspective: 2500,
                autoplay: 'drift',
                interval: 3,
                direction: 'left',
                momentum: 0.6,
                snap: true,
                pauseOnHover: true,
                focusOnClick: true,
                draggable: true,
                parallax: 0.3,
                stretch: 0.5,
                fadeColor: '#106f80',
                depthFade: 0.55,
                innerShade: 0.6,
                cornerRadius: 12
            }, options);

            this.items = this.options.items || [];
            this.itemCount = this.items.length;
            if (this.itemCount === 0) return;

            this.cardHeight = Math.round(this.options.cardWidth / this.options.aspectRatio);
            this.angleStep = 360 / this.itemCount;
            this.currentAngle = 0;
            this.targetAngle = 0;
            this.velocity = 0;
            this.isDragging = false;
            this.isHovered = false;
            this.isAnimating = false;
            this.startX = 0;
            this.lastX = 0;
            this.lastTime = 0;
            this.lastDeltaX = 0;
            this.rafId = null;
            this.cardElements = [];
            this.shadeElements = [];
            this.activeCardIndex = 0;

            this.calculateRadius();
            this.buildDOM();
            this.attachEvents();
            this.startLoop();
        }

        calculateRadius() {
            // Geometria de cilindro exata com chord width = cardWidth + gap
            const chord = this.options.cardWidth + this.options.gap;
            const halfAngleRad = (Math.PI / this.itemCount);
            // Raio do cilindro em pixels
            this.radius = Math.round((chord / 2) / Math.sin(halfAngleRad));
            // Limite de segurança de proporção de tela
            if (this.radius < 320) this.radius = 360;
        }

        buildDOM() {
            this.container.classList.add('circular-carousel-wrapper');
            if (this.options.intro === 'rise') {
                this.container.classList.add('intro-rise');
            }
            this.container.style.perspective = `${this.options.perspective}px`;
            this.container.innerHTML = '';

            // Palco 3D
            this.stage = document.createElement('div');
            this.stage.className = 'circular-carousel-stage';
            this.stage.style.transform = `rotateX(${this.options.tilt}deg)`;
            this.container.appendChild(this.stage);

            this.cardElements = [];
            this.shadeElements = [];

            // Construir cada card em 3D
            this.items.forEach((item, idx) => {
                const card = document.createElement('div');
                card.className = 'circular-carousel-card';
                card.style.width = `${this.options.cardWidth}px`;
                card.style.height = `${this.cardHeight}px`;
                card.style.borderRadius = `${this.options.cornerRadius}px`;
                card.dataset.index = idx;

                // Inner content
                const inner = document.createElement('div');
                inner.className = 'circular-card-inner';

                const chipClass = item.destaque ? 'circular-card-chip destaque-gold' : 'circular-card-chip';
                const chipTag = item.tag || `AGENTE 0${idx + 1}`;
                const iconName = item.icon || 'fas fa-microchip';
                const pillIcon = item.destaque ? 'fas fa-crown' : 'fas fa-check-circle';

                inner.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="${chipClass}">
                            <i class="${iconName}"></i> ${chipTag}
                        </span>
                    </div>
                    <div class="circular-card-center">
                        <div class="circular-card-icon-wrap" style="${item.destaque ? 'border-color: rgba(255, 215, 0, 0.4); color: #FFD700; background: rgba(255, 215, 0, 0.08);' : ''}">
                            <i class="${iconName}"></i>
                        </div>
                        <h4 class="circular-card-title">${item.title}</h4>
                        <div class="circular-card-subtitle">${item.subtitle || ''}</div>
                        <p class="circular-card-desc">${item.desc || ''}</p>
                    </div>
                    <div class="circular-card-pill">
                        <i class="${pillIcon}" style="${item.destaque ? 'color: #FFD700;' : ''}"></i>
                        <span>${item.entregavel || 'Entregável Homologado'}</span>
                    </div>
                `;

                // Shade overlay para depthFade e atmospheric fadeColor
                const shade = document.createElement('div');
                shade.className = 'circular-card-shade';
                shade.style.backgroundColor = this.options.fadeColor;
                shade.style.opacity = '0';

                card.appendChild(shade);
                card.appendChild(inner);

                this.stage.appendChild(card);
                this.cardElements.push(card);
                this.shadeElements.push(shade);
            });

            // Barra de Legenda / Caption inferior (quando captions = true)
            if (this.options.captions) {
                this.captionBar = document.createElement('div');
                this.captionBar.className = 'circular-caption-bar';
                this.captionBar.innerHTML = `
                    <span class="circular-caption-bullet"></span>
                    <span class="circular-caption-text">AGENTE ATIVO: ${this.items[0].title} // ${this.items[0].subtitle}</span>
                `;
                this.container.appendChild(this.captionBar);
            }

            // Indicadores de navegação por dots
            this.dotsNav = document.createElement('div');
            this.dotsNav.className = 'circular-nav-dots';
            this.items.forEach((_, dIdx) => {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = `circular-dot-btn ${dIdx === 0 ? 'active' : ''}`;
                dot.setAttribute('aria-label', `Ir para Agente ${dIdx + 1}`);
                dot.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.focusCard(dIdx);
                });
                this.dotsNav.appendChild(dot);
            });
            this.container.appendChild(this.dotsNav);
        }

        attachEvents() {
            // Drag / Touch events
            if (this.options.draggable) {
                this.container.addEventListener('pointerdown', this.onPointerDown.bind(this));
                window.addEventListener('pointermove', this.onPointerMove.bind(this));
                window.addEventListener('pointerup', this.onPointerUp.bind(this));
                window.addEventListener('pointercancel', this.onPointerUp.bind(this));
            }

            // Hover pause
            if (this.options.pauseOnHover) {
                this.container.addEventListener('pointerenter', () => { this.isHovered = true; });
                this.container.addEventListener('pointerleave', () => { this.isHovered = false; });
            }

            // Click on card to focus
            if (this.options.focusOnClick) {
                this.cardElements.forEach((card, idx) => {
                    card.addEventListener('click', (e) => {
                        // Não dispara foco se for ao final de um drag com arrasto significativo
                        if (Math.abs(this.lastDeltaX) > 6) return;
                        this.focusCard(idx);
                    });
                });
            }

            // Resize
            window.addEventListener('resize', () => {
                this.calculateRadius();
                this.updateCards(0);
            }, { passive: true });
        }

        onPointerDown(e) {
            this.isDragging = true;
            this.container.classList.add('is-dragging');
            this.startX = e.clientX;
            this.lastX = e.clientX;
            this.lastTime = performance.now();
            this.lastDeltaX = 0;
            this.velocity = 0;
        }

        onPointerMove(e) {
            if (!this.isDragging) return;
            const currentX = e.clientX;
            const deltaX = currentX - this.lastX;
            const now = performance.now();
            const dt = Math.max(1, now - this.lastTime);

            this.lastDeltaX += deltaX;
            this.lastX = currentX;
            this.lastTime = now;

            // Sensibilidade de rotação angular por pixel
            const sensitivity = 0.28;
            this.currentAngle += deltaX * sensitivity;
            this.velocity = (deltaX / dt) * 16 * sensitivity;
        }

        onPointerUp() {
            if (!this.isDragging) return;
            this.isDragging = false;
            this.container.classList.remove('is-dragging');

            if (this.options.snap && Math.abs(this.velocity) < 2) {
                this.snapToClosest();
            }
        }

        snapToClosest() {
            // Achar o card mais próximo do ângulo 0 (frente)
            // Ângulo de foco para o card i: -i * angleStep
            const normalized = -this.currentAngle;
            let nearestIndex = Math.round(normalized / this.angleStep) % this.itemCount;
            if (nearestIndex < 0) nearestIndex += this.itemCount;

            this.focusCard(nearestIndex);
        }

        focusCard(index) {
            // Calcular o delta angular mais curto para trazer o card index à frente (0 deg)
            const targetBase = -index * this.angleStep;
            let diff = (targetBase - this.currentAngle) % 360;
            if (diff > 180) diff -= 360;
            if (diff < -180) diff += 360;

            this.targetAngle = this.currentAngle + diff;
            this.isAnimating = true;
            this.velocity = 0;
        }

        updateCards(dt) {
            // Autoplay drift
            if (this.options.autoplay === 'drift' && !this.isDragging && !this.isHovered && !this.isAnimating) {
                const directionFactor = this.options.direction === 'left' ? -1 : 1;
                this.currentAngle += directionFactor * this.options.speed * dt;
            }

            // Momentum friction
            if (!this.isDragging && Math.abs(this.velocity) > 0.05 && !this.isAnimating) {
                this.currentAngle += this.velocity;
                this.velocity *= (0.86 + 0.1 * this.options.momentum);

                if (Math.abs(this.velocity) <= 0.05 && this.options.snap) {
                    this.velocity = 0;
                    this.snapToClosest();
                }
            }

            // Spring interpolation ao focar card
            if (this.isAnimating) {
                const diff = this.targetAngle - this.currentAngle;
                this.currentAngle += diff * 0.12;
                if (Math.abs(diff) < 0.05) {
                    this.currentAngle = this.targetAngle;
                    this.isAnimating = false;
                }
            }

            const R = this.radius;
            let minDistanceToCenter = 9999;
            let closestCardIndex = 0;

            for (let i = 0; i < this.itemCount; i++) {
                const card = this.cardElements[i];
                const shade = this.shadeElements[i];
                const theta = this.currentAngle + i * this.angleStep;

                // Ângulo normalizado no intervalo [-180, 180]
                let normAngle = (theta % 360 + 360) % 360;
                if (normAngle > 180) normAngle -= 360;

                const rad = normAngle * (Math.PI / 180);
                const cosVal = Math.cos(rad); // 1 = frente, -1 = fundo
                const zNorm = (cosVal + 1) / 2; // [0, 1]

                // Transformação 3D de Cilindro
                const curveCorrection = this.options.curve * -1 * normAngle * 0.15;
                card.style.transform = `rotateY(${theta}deg) translateZ(${R}px) rotateY(${curveCorrection}deg)`;

                // Profundidade e z-index
                card.style.zIndex = Math.round(zNorm * 100);

                // depthFade: opacidade varia entre (1 - depthFade) e 1.0
                const opacity = (1 - this.options.depthFade) + (this.options.depthFade * zNorm);
                card.style.opacity = Math.max(0.15, opacity).toFixed(3);

                // innerShade atmosférico com a cor fadeColor (#106f80)
                const shadeOpacity = (1 - zNorm) * this.options.innerShade;
                shade.style.opacity = shadeOpacity.toFixed(3);

                // Identificar o card em destaque na frente
                const distToFront = Math.abs(normAngle);
                if (distToFront < minDistanceToCenter) {
                    minDistanceToCenter = distToFront;
                    closestCardIndex = i;
                }
            }

            // Atualizar legenda e dot ativo quando o foco mudar
            if (closestCardIndex !== this.activeCardIndex) {
                this.activeCardIndex = closestCardIndex;
                const activeItem = this.items[closestCardIndex];

                if (this.captionBar) {
                    const textEl = this.captionBar.querySelector('.circular-caption-text');
                    if (textEl) {
                        textEl.textContent = `AGENTE EM FOCO: ${activeItem.title} // ${activeItem.subtitle || ''}`;
                    }
                }

                if (this.dotsNav) {
                    const dots = this.dotsNav.querySelectorAll('.circular-dot-btn');
                    dots.forEach((d, idx) => {
                        if (idx === closestCardIndex) d.classList.add('active');
                        else d.classList.remove('active');
                    });
                }
            }
        }

        startLoop() {
            let prevTime = performance.now();
            const loop = (time) => {
                const dt = Math.min(0.1, (time - prevTime) / 1000);
                prevTime = time;

                this.updateCards(dt);
                this.rafId = requestAnimationFrame(loop);
            };
            this.rafId = requestAnimationFrame(loop);
        }

        destroy() {
            if (this.rafId) cancelAnimationFrame(this.rafId);
        }
    }

    // Expor globalmente
    window.criarCircularCarousel = function (container, options) {
        const el = typeof container === 'string' ? document.getElementById(container) : container;
        if (!el) return null;
        return new CircularCarouselVanilla(el, options);
    };

})(window, document);
