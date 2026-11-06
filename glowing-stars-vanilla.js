/**
 * =====================================================================
 * VIDE — ACETERNITY UI GLOWING STARS (VANILLA FULLSCREEN RUNTIME)
 * Componente: Glowing Stars Background (Aceternity UI / Manu Arora)
 * Efeito: Fundo de tela inteira com constelação de estrelas brilhantes,
 * cintilação orgânica, estrelas de 4 pontas e interação de proximidade
 * com o cursor do mouse e ondas ao clique.
 * =====================================================================
 */

(function (window, document) {
    'use strict';

    class GlowingStarsBackground {
        constructor(canvas, options = {}) {
            if (!canvas) return;
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            if (!this.ctx) return;

            this.options = Object.assign({
                gridSpacing: 55,         // Distância média entre as estrelas na grade
                jitter: 18,              // Variação orgânica para que não fique perfeitamente rígido
                sparkleRatio: 0.18,      // Proporção de estrelas de 4 pontas (tipo diamante)
                proximity: 130,          // Raio de ativação do cursor do mouse (px)
                starColor: '#ffffff',
                glowColor1: '#00e5ff',   // Ciano VIDE
                glowColor2: '#38bdf8',   // Sky Blue Aceternity
                glowColor3: '#9c43fe',   // Violeta Quântico
                maxTwinkling: 14,        // Quantidade de estrelas cintilando simultaneamente
                twinkleSpeed: 0.018      // Velocidade do ciclo de cintilação
            }, options);

            this.stars = [];
            this.mouse = { x: -1000, y: -1000, isOver: false };
            this.ripples = [];
            this.width = 0;
            this.height = 0;
            this.dpr = Math.min(window.devicePixelRatio || 1, 2);
            this.rafId = null;
            this.running = true;

            this.init();
        }

        init() {
            this.handleResize = this.resize.bind(this);
            this.handlePointerMove = this.onPointerMove.bind(this);
            this.handlePointerLeave = this.onPointerLeave.bind(this);
            this.handlePointerDown = this.onPointerDown.bind(this);
            this.handleVisibility = this.onVisibilityChange.bind(this);

            window.addEventListener('resize', this.handleResize, { passive: true });
            window.addEventListener('pointermove', this.handlePointerMove, { passive: true });
            document.documentElement.addEventListener('pointerleave', this.handlePointerLeave);
            window.addEventListener('pointerdown', this.handlePointerDown, { passive: true });
            document.addEventListener('visibilitychange', this.handleVisibility);

            this.resize();
            this.loop();
        }

        resize() {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.width = Math.round(this.width * this.dpr);
            this.canvas.height = Math.round(this.height * this.dpr);
            this.canvas.style.width = this.width + 'px';
            this.canvas.style.height = this.height + 'px';
            this.ctx.scale(this.dpr, this.dpr);
            this.generateStars();
        }

        generateStars() {
            this.stars = [];
            const cols = Math.ceil(this.width / this.options.gridSpacing) + 2;
            const rows = Math.ceil(this.height / this.options.gridSpacing) + 2;

            for (let c = -1; c < cols; c++) {
                for (let r = -1; r < rows; r++) {
                    const baseX = c * this.options.gridSpacing;
                    const baseY = r * this.options.gridSpacing;
                    const offsetX = (Math.random() - 0.5) * this.options.jitter * 2;
                    const offsetY = (Math.random() - 0.5) * this.options.jitter * 2;

                    const isSparkle = Math.random() < this.options.sparkleRatio;
                    const glowHue = Math.random() < 0.7 ? this.options.glowColor1 : (Math.random() < 0.5 ? this.options.glowColor2 : this.options.glowColor3);

                    this.stars.push({
                        x: baseX + offsetX,
                        y: baseY + offsetY,
                        baseSize: isSparkle ? (1.5 + Math.random() * 0.8) : (0.8 + Math.random() * 0.7),
                        isSparkle: isSparkle,
                        glowHue: glowHue,
                        twinklePhase: Math.random() * Math.PI * 2,
                        twinkleSpeed: 0.015 + Math.random() * 0.025,
                        isTwinkling: Math.random() < 0.12,
                        glowIntensity: 0,
                        currentScale: 1
                    });
                }
            }
        }

        onPointerMove(e) {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.mouse.isOver = true;
        }

        onPointerLeave() {
            this.mouse.isOver = false;
            this.mouse.x = -1000;
            this.mouse.y = -1000;
        }

        onPointerDown(e) {
            this.ripples.push({
                x: e.clientX,
                y: e.clientY,
                radius: 10,
                maxRadius: 280,
                speed: 7,
                opacity: 1
            });
        }

        onVisibilityChange() {
            if (document.hidden) {
                this.running = false;
                if (this.rafId) cancelAnimationFrame(this.rafId);
            } else {
                this.running = true;
                this.loop();
            }
        }

        drawFourPointStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
            let rot = Math.PI / 2 * 3;
            let x = cx;
            let y = cy;
            const step = Math.PI / spikes;

            ctx.beginPath();
            ctx.moveTo(cx, cy - outerRadius);

            for (let i = 0; i < spikes; i++) {
                x = cx + Math.cos(rot) * outerRadius;
                y = cy + Math.sin(rot) * outerRadius;
                ctx.lineTo(x, y);
                rot += step;

                x = cx + Math.cos(rot) * innerRadius;
                y = cy + Math.sin(rot) * innerRadius;
                ctx.lineTo(x, y);
                rot += step;
            }
            ctx.lineTo(cx, cy - outerRadius);
            ctx.closePath();
            ctx.fill();
        }

        update() {
            // Atualizar ondas de choque (ripples)
            for (let i = this.ripples.length - 1; i >= 0; i--) {
                const rip = this.ripples[i];
                rip.radius += rip.speed;
                rip.opacity = 1 - (rip.radius / rip.maxRadius);
                if (rip.radius >= rip.maxRadius || rip.opacity <= 0) {
                    this.ripples.splice(i, 1);
                }
            }

            // Atualizar estrelas
            const len = this.stars.length;
            const mouseX = this.mouse.x;
            const mouseY = this.mouse.y;
            const prox = this.options.proximity;
            const proxSq = prox * prox;

            for (let i = 0; i < len; i++) {
                const s = this.stars[i];

                // Ciclo orgânico de cintilação autônoma
                s.twinklePhase += s.twinkleSpeed;
                let naturalGlow = Math.sin(s.twinklePhase);
                if (naturalGlow < 0) naturalGlow = 0;
                naturalGlow = naturalGlow * naturalGlow; // Curva suave no ápice

                // Efeito do mouse por proximidade
                let mouseGlow = 0;
                if (this.mouse.isOver) {
                    const dx = s.x - mouseX;
                    const dy = s.y - mouseY;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < proxSq) {
                        const dist = Math.sqrt(distSq);
                        mouseGlow = (1 - dist / prox);
                        mouseGlow = Math.pow(mouseGlow, 1.6);
                    }
                }

                // Efeito de ondas ao clique
                let rippleGlow = 0;
                for (let r = 0; r < this.ripples.length; r++) {
                    const rip = this.ripples[r];
                    const rdx = s.x - rip.x;
                    const rdy = s.y - rip.y;
                    const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
                    const diff = Math.abs(rdist - rip.radius);
                    if (diff < 40) {
                        const wavePower = (1 - diff / 40) * rip.opacity;
                        if (wavePower > rippleGlow) rippleGlow = wavePower;
                    }
                }

                // Intensidade combinada
                const targetGlow = Math.max(naturalGlow * 0.45, mouseGlow * 1.0, rippleGlow * 0.95);
                s.glowIntensity += (targetGlow - s.glowIntensity) * 0.12;

                // Escala dinâmica Aceternity: [1 -> 1.5 -> 2.5]
                s.currentScale = 1 + s.glowIntensity * 1.6;
            }
        }

        render() {
            this.ctx.clearRect(0, 0, this.width, this.height);

            const len = this.stars.length;
            const ctx = this.ctx;

            for (let i = 0; i < len; i++) {
                const s = this.stars[i];
                const intensity = s.glowIntensity;
                const scale = s.currentScale;

                if (intensity > 0.05) {
                    // Estrela Brilhante Ativa (Estilo Aceternity UI Glow)
                    ctx.save();
                    ctx.shadowColor = s.glowHue;
                    ctx.shadowBlur = 8 + intensity * 16;
                    ctx.fillStyle = intensity > 0.4 ? '#ffffff' : s.glowHue;
                    ctx.globalAlpha = Math.min(1, 0.25 + intensity * 0.85);

                    if (s.isSparkle) {
                        // Estrela de 4 pontas em diamante
                        const outer = s.baseSize * 3.2 * scale;
                        const inner = outer * 0.28;
                        this.drawFourPointStar(ctx, s.x, s.y, 4, outer, inner);
                    } else {
                        // Ponto estelar com halo concentrado
                        ctx.beginPath();
                        ctx.arc(s.x, s.y, s.baseSize * scale, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    ctx.restore();
                } else {
                    // Estrela em repouso tênue (Constelação de fundo)
                    ctx.save();
                    ctx.fillStyle = '#6b7280';
                    ctx.globalAlpha = 0.18;
                    ctx.beginPath();
                    ctx.arc(s.x, s.y, s.baseSize * 0.9, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
            }
        }

        loop() {
            if (!this.running) return;
            this.update();
            this.render();
            this.rafId = requestAnimationFrame(this.loop.bind(this));
        }

        destroy() {
            this.running = false;
            if (this.rafId) cancelAnimationFrame(this.rafId);
            window.removeEventListener('resize', this.handleResize);
            window.removeEventListener('pointermove', this.handlePointerMove);
            document.documentElement.removeEventListener('pointerleave', this.handlePointerLeave);
            window.removeEventListener('pointerdown', this.handlePointerDown);
            document.removeEventListener('visibilitychange', this.handleVisibility);
        }
    }

    // Expor globalmente para inicialização no app institucional
    window.criarGlowingStarsBackground = function (canvasId, options) {
        const canvas = typeof canvasId === 'string' ? document.getElementById(canvasId) : canvasId;
        if (!canvas) return null;
        return new GlowingStarsBackground(canvas, options);
    };

})(window, document);
