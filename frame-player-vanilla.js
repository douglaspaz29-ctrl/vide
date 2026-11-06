/**
 * =====================================================================
 * VIDE — FRAME SEQUENCE ANIMATION ENGINE (VANILLA RUNTIME)
 * Componente: FramePlayer / CanvasSequence
 * Renderizador de alta performance via HTML5 Canvas em 60 FPS
 * Substitui o Orb no Hero na mesma posição exata
 * =====================================================================
 */

(function (window, document) {
    'use strict';

    class FramePlayerVanilla {
        constructor(containerOrId, options = {}) {
            this.container = typeof containerOrId === 'string' 
                ? document.getElementById(containerOrId) 
                : containerOrId;
            if (!this.container) return;

            this.options = Object.assign({
                totalFrames: 299,
                framePrefix: 'assets/frames/ezgif-frame-',
                frameSuffix: '.jpg',
                padLength: 3,
                fps: 30,
                autoplay: true,
                loop: true,
                fit: 'contain', // 'contain' | 'cover'
                interactiveScrub: true,
                glowColor: 'rgba(0, 229, 255, 0.25)',
                glowRadius: 35
            }, options);

            this.canvas = document.createElement('canvas');
            this.canvas.className = 'frame-player-canvas';
            this.canvas.setAttribute('aria-label', 'Animação de telemetria cinematográfica VIDE');
            this.ctx = this.canvas.getContext('2d', { alpha: true });

            this.container.innerHTML = '';
            this.container.classList.add('frame-player-container');
            this.container.appendChild(this.canvas);

            this.images = new Array(this.options.totalFrames);
            this.loadedCount = 0;
            this.currentFrame = 0;
            this.isPlaying = this.options.autoplay;
            this.isScrubbing = false;
            this.lastTimestamp = 0;
            this.frameInterval = 1000 / this.options.fps;
            this.accumulator = 0;
            this.rafId = null;
            this.isVisible = true;

            this.init();
        }

        init() {
            this.resize();
            this.preloadImages();
            this.attachEvents();
            this.rafId = requestAnimationFrame(this.animate.bind(this));
        }

        resize() {
            const rect = this.container.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const w = Math.max(1, Math.round(rect.width || 680));
            const h = Math.max(1, Math.round(rect.height || 680));

            this.canvas.width = Math.round(w * dpr);
            this.canvas.height = Math.round(h * dpr);
            this.canvas.style.width = `${w}px`;
            this.canvas.style.height = `${h}px`;

            this.drawFrame(this.currentFrame);
        }

        preloadImages() {
            const total = this.options.totalFrames;

            const loadFrame = (index, callback) => {
                const img = new Image();
                const pad = String(index).padStart(this.options.padLength, '0');
                img.src = `${this.options.framePrefix}${pad}${this.options.frameSuffix}`;
                img.onload = () => {
                    this.images[index - 1] = img;
                    this.loadedCount++;
                    if (index === 1) {
                        this.drawFrame(0);
                    }
                    if (callback) callback();
                };
                img.onerror = () => {
                    if (callback) callback();
                };
            };

            // Carrega frame 1 imediatamente para render inicial
            loadFrame(1, () => {
                let nextBatch = 2;
                const loadBatch = () => {
                    const batchEnd = Math.min(nextBatch + 12, total);
                    let doneInBatch = 0;
                    const count = batchEnd - nextBatch + 1;
                    if (count <= 0) return;

                    for (let i = nextBatch; i <= batchEnd; i++) {
                        loadFrame(i, () => {
                            doneInBatch++;
                            if (doneInBatch === count && batchEnd < total) {
                                nextBatch = batchEnd + 1;
                                setTimeout(loadBatch, 8);
                            }
                        });
                    }
                };
                loadBatch();
            });
        }

        drawFrame(index) {
            const img = this.images[index];
            if (!img || !img.complete || img.naturalWidth === 0) {
                // Se o frame atual ainda está baixando, desenha o frame válido mais próximo
                for (let i = index - 1; i >= 0; i--) {
                    if (this.images[i] && this.images[i].complete && this.images[i].naturalWidth > 0) {
                        this.renderImage(this.images[i]);
                        return;
                    }
                }
                return;
            }
            this.renderImage(img);
        }

        renderImage(img) {
            const ctx = this.ctx;
            const w = this.canvas.width;
            const h = this.canvas.height;
            if (!w || !h) return;

            ctx.clearRect(0, 0, w, h);

            const imgW = img.naturalWidth || 1920;
            const imgH = img.naturalHeight || 1080;
            const imgRatio = imgW / imgH;
            const canvasRatio = w / h;

            let drawW, drawH, drawX, drawY;

            if (this.options.fit === 'cover') {
                if (canvasRatio > imgRatio) {
                    drawW = w;
                    drawH = w / imgRatio;
                    drawX = 0;
                    drawY = (h - drawH) / 2;
                } else {
                    drawH = h;
                    drawW = h * imgRatio;
                    drawX = (w - drawW) / 2;
                    drawY = 0;
                }
            } else { // 'contain'
                if (canvasRatio > imgRatio) {
                    drawH = h;
                    drawW = h * imgRatio;
                    drawX = (w - drawW) / 2;
                    drawY = 0;
                } else {
                    drawW = w;
                    drawH = w / imgRatio;
                    drawX = 0;
                    drawY = (h - drawH) / 2;
                }
            }

            ctx.drawImage(img, drawX, drawY, drawW, drawH);
        }

        animate(timestamp) {
            if (!this.lastTimestamp) this.lastTimestamp = timestamp;
            const delta = timestamp - this.lastTimestamp;
            this.lastTimestamp = timestamp;

            if (this.isVisible && this.isPlaying && !this.isScrubbing) {
                this.accumulator += delta;
                while (this.accumulator >= this.frameInterval) {
                    this.accumulator -= this.frameInterval;
                    this.currentFrame++;
                    if (this.currentFrame >= this.options.totalFrames) {
                        if (this.options.loop) {
                            this.currentFrame = 0;
                        } else {
                            this.currentFrame = this.options.totalFrames - 1;
                            this.isPlaying = false;
                            break;
                        }
                    }
                }
                this.drawFrame(this.currentFrame);
            }

            this.rafId = requestAnimationFrame(this.animate.bind(this));
        }

        attachEvents() {
            window.addEventListener('resize', () => this.resize(), { passive: true });

            if (this.options.interactiveScrub) {
                this.container.addEventListener('pointerenter', () => {
                    this.isScrubbing = true;
                });

                this.container.addEventListener('pointermove', (e) => {
                    if (!this.isScrubbing) return;
                    const rect = this.container.getBoundingClientRect();
                    const progress = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                    this.currentFrame = Math.floor(progress * (this.options.totalFrames - 1));
                    this.drawFrame(this.currentFrame);
                }, { passive: true });

                this.container.addEventListener('pointerleave', () => {
                    this.isScrubbing = false;
                });
            }

            // Click para alternar pause/play
            this.container.addEventListener('click', () => {
                this.isPlaying = !this.isPlaying;
            });

            // IntersectionObserver para economia de recursos quando fora de viewport
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver(([entry]) => {
                    this.isVisible = entry.isIntersecting;
                    if (this.isVisible && !this.rafId) {
                        this.lastTimestamp = performance.now();
                        this.rafId = requestAnimationFrame(this.animate.bind(this));
                    }
                }, { threshold: 0.05 });
                observer.observe(this.container);
            }
        }

        destroy() {
            if (this.rafId) cancelAnimationFrame(this.rafId);
            this.container.innerHTML = '';
        }
    }

    window.criarFramePlayer = function (containerOrId, options) {
        return new FramePlayerVanilla(containerOrId, options);
    };

})(window, document);
