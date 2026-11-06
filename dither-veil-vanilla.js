/**
 * =====================================================================
 * DITHER VEIL VANILLA (ReactBits Spec Adapted for VIDE)
 * Pattern: Atkinson Error-Diffusion // PixelSize: 2 // RevealRadius: 200
 * RimColor: #00E5FF // High-Tech Cyber-Tactile Interaction
 * =====================================================================
 */

(function () {
    class DitherVeilElement {
        constructor(container) {
            this.container = container;
            this.imgSrc = container.getAttribute('data-src') || container.querySelector('img')?.src;
            if (!this.imgSrc) return;

            this.canvas = document.createElement('canvas');
            this.canvas.className = 'dither-veil-canvas';
            this.container.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');

            this.mouse = { x: -999, y: -999, isOver: false };
            this.pos = { x: -999, y: -999 };
            this.revealRadius = parseInt(container.getAttribute('data-reveal-radius')) || 180;
            this.pixelSize = parseInt(container.getAttribute('data-pixel-size')) || 2;

            this.sourceImg = new Image();
            this.sourceImg.crossOrigin = 'anonymous';
            this.sourceImg.onload = () => {
                this.resize();
                this.setupEvents();
                this.render();
            };
            this.sourceImg.src = this.imgSrc;
        }

        resize() {
            const rect = this.container.getBoundingClientRect();
            this.width = rect.width || 600;
            this.height = rect.height || 400;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.computeDither();
        }

        computeDither() {
            // Create offscreen canvas to compute Atkinson dithered bitmap
            const off = document.createElement('canvas');
            const w = Math.floor(this.width / this.pixelSize);
            const h = Math.floor(this.height / this.pixelSize);
            off.width = w;
            off.height = h;
            const offCtx = off.getContext('2d');

            offCtx.drawImage(this.sourceImg, 0, 0, w, h);
            const imgData = offCtx.getImageData(0, 0, w, h);
            const d = imgData.data;

            // Grayscale & Atkinson Dither
            const gray = new Float32Array(w * h);
            for (let i = 0; i < d.length; i += 4) {
                gray[i / 4] = d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114;
            }

            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    const idx = y * w + x;
                    const oldPixel = gray[idx];
                    const newPixel = oldPixel > 128 ? 255 : 0;
                    gray[idx] = newPixel;
                    const err = (oldPixel - newPixel) / 8;

                    // Atkinson diffusion pattern
                    if (x + 1 < w) gray[idx + 1] += err;
                    if (x + 2 < w) gray[idx + 2] += err;
                    if (y + 1 < h) {
                        if (x - 1 >= 0) gray[idx + w - 1] += err;
                        gray[idx + w] += err;
                        if (x + 1 < w) gray[idx + w + 1] += err;
                    }
                    if (y + 2 < h) {
                        gray[idx + w * 2] += err;
                    }
                }
            }

            // Write back with VIDE cyan & obsidian duotone palette
            for (let i = 0; i < d.length; i += 4) {
                const val = gray[i / 4];
                if (val > 128) {
                    d[i] = 0;       // R
                    d[i + 1] = 229; // G (Cyan)
                    d[i + 2] = 255; // B
                    d[i + 3] = 180; // A
                } else {
                    d[i] = 5;       // Obsidian base
                    d[i + 1] = 6;
                    d[i + 2] = 8;
                    d[i + 3] = 240;
                }
            }
            offCtx.putImageData(imgData, 0, 0);
            this.ditherCanvas = off;
        }

        setupEvents() {
            this.container.addEventListener('mousemove', (e) => {
                const rect = this.container.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
                this.mouse.isOver = true;
            });
            this.container.addEventListener('mouseleave', () => {
                this.mouse.isOver = false;
            });
            window.addEventListener('resize', () => this.resize());
        }

        render() {
            this.ctx.clearRect(0, 0, this.width, this.height);

            // Draw crisp source image underneath
            this.ctx.drawImage(this.sourceImg, 0, 0, this.width, this.height);

            // Draw dither veil on top
            if (this.ditherCanvas) {
                this.ctx.save();
                this.ctx.imageSmoothingEnabled = false;
                this.ctx.drawImage(this.ditherCanvas, 0, 0, this.width, this.height);

                // Reveal spotlight around mouse
                if (this.mouse.isOver && this.mouse.x > 0) {
                    this.pos.x += (this.mouse.x - this.pos.x) * 0.25;
                    this.pos.y += (this.mouse.y - this.pos.y) * 0.25;

                    this.ctx.globalCompositeOperation = 'destination-out';
                    const grad = this.ctx.createRadialGradient(
                        this.pos.x, this.pos.y, 0,
                        this.pos.x, this.pos.y, this.revealRadius
                    );
                    grad.addColorStop(0, 'rgba(0,0,0,1)');
                    grad.addColorStop(0.7, 'rgba(0,0,0,0.85)');
                    grad.addColorStop(1, 'rgba(0,0,0,0)');

                    this.ctx.fillStyle = grad;
                    this.ctx.beginPath();
                    this.ctx.arc(this.pos.x, this.pos.y, this.revealRadius, 0, Math.PI * 2);
                    this.ctx.fill();
                    this.ctx.globalCompositeOperation = 'source-over';

                    // Cyan rim ring
                    this.ctx.beginPath();
                    this.ctx.arc(this.pos.x, this.pos.y, this.revealRadius, 0, Math.PI * 2);
                    this.ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
                    this.ctx.lineWidth = 1.5;
                    this.ctx.stroke();
                }
                this.ctx.restore();
            }

            requestAnimationFrame(() => this.render());
        }
    }

    function inicializarDitherVeil() {
        document.querySelectorAll('[data-dither-veil]').forEach(el => new DitherVeilElement(el));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarDitherVeil);
    } else {
        inicializarDitherVeil();
    }
})();
