/**
 * =====================================================================
 * GLOW CURSOR VANILLA (ReactBits Spec Adapted for VIDE)
 * Preset: Aurora // Colors: #5effc4, #00E5FF, #2a8cff
 * Intensity: 1.3 // Glow: 0.8 // ClickBurst: True // Zero Touch Interference
 * =====================================================================
 */

(function () {
    // Only run on devices that support hover (desktop/mouse)
    if (window.matchMedia('(hover: none)').matches) return;

    let canvas, ctx;
    let width = window.innerWidth;
    let height = window.innerHeight;

    let mouse = { x: width / 2, y: height / 2 };
    let pos = { x: width / 2, y: height / 2 };
    let points = [];
    let bursts = [];
    let isVisible = false;

    const maxPoints = 28;
    const linger = 1.3;
    const trailWidth = 2.5;
    const colorCore = '#00E5FF';
    const colorAurora = '#5effc4';
    const colorSecondary = '#2a8cff';

    function initCanvas() {
        canvas = document.createElement('canvas');
        canvas.id = 'glow-cursor-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '99999';
        canvas.style.opacity = '0';
        canvas.style.transition = 'opacity 0.4s ease';
        document.body.appendChild(canvas);

        ctx = canvas.getContext('2d');
        resize();

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseenter', () => { isVisible = true; canvas.style.opacity = '1'; });
        window.addEventListener('mouseleave', () => { isVisible = false; canvas.style.opacity = '0'; });
        window.addEventListener('mousedown', onClickBurst);

        requestAnimationFrame(render);
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
    }

    function onMouseMove(e) {
        if (!isVisible) {
            isVisible = true;
            canvas.style.opacity = '1';
        }
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }

    function onClickBurst(e) {
        // Create 12 micro particles and 2 expanding shockwave rings
        const count = 14;
        const particles = [];
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
            const speed = 2.5 + Math.random() * 4.5;
            particles.push({
                x: e.clientX,
                y: e.clientY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                radius: 1.5 + Math.random() * 2,
                alpha: 1,
                decay: 0.025 + Math.random() * 0.02,
                color: i % 2 === 0 ? colorAurora : colorCore
            });
        }
        bursts.push({
            x: e.clientX,
            y: e.clientY,
            radius: 4,
            maxRadius: 48,
            alpha: 0.9,
            particles: particles
        });
    }

    function render() {
        ctx.clearRect(0, 0, width, height);

        // Smooth cursor interpolation (followSpeed)
        pos.x += (mouse.x - pos.x) * 0.35;
        pos.y += (mouse.y - pos.y) * 0.35;

        // Add history point
        points.unshift({ x: pos.x, y: pos.y, age: 0 });
        if (points.length > maxPoints) points.pop();

        // 1. Draw glowing aura trail
        if (points.length > 2) {
            ctx.save();
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            for (let i = 0; i < points.length - 1; i++) {
                const p1 = points[i];
                const p2 = points[i + 1];
                p1.age += 0.04;

                const progress = i / points.length;
                const alpha = Math.max(0, (1 - progress) * (1 - p1.age / linger));
                const currentWidth = trailWidth * (1 - progress * 0.7);

                if (alpha <= 0) continue;

                // Outer aura glow
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = i % 2 === 0 ? `rgba(0, 229, 255, ${alpha * 0.35})` : `rgba(94, 255, 196, ${alpha * 0.35})`;
                ctx.lineWidth = currentWidth * 5;
                ctx.shadowColor = colorCore;
                ctx.shadowBlur = 14;
                ctx.stroke();

                // Core crisp beam
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.85})`;
                ctx.lineWidth = currentWidth;
                ctx.shadowBlur = 0;
                ctx.stroke();
            }
            ctx.restore();
        }

        // 2. Draw active cursor particle dot with pulsing glow
        if (isVisible) {
            ctx.save();
            // Outer cyan aura
            const grad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 16);
            grad.addColorStop(0, 'rgba(0, 229, 255, 0.45)');
            grad.addColorStop(0.5, 'rgba(94, 255, 196, 0.2)');
            grad.addColorStop(1, 'rgba(0, 229, 255, 0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 16, 0, Math.PI * 2);
            ctx.fill();

            // Core center dot
            ctx.fillStyle = '#FFFFFF';
            ctx.shadowColor = '#00E5FF';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 2.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // 3. Render Click Bursts
        for (let b = bursts.length - 1; b >= 0; b--) {
            const burst = bursts[b];
            burst.radius += 2.2;
            burst.alpha -= 0.035;

            if (burst.alpha <= 0) {
                bursts.splice(b, 1);
                continue;
            }

            ctx.save();
            // Expanding shockwave ring
            ctx.beginPath();
            ctx.arc(burst.x, burst.y, burst.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 229, 255, ${burst.alpha * 0.7})`;
            ctx.lineWidth = 1.5;
            ctx.shadowColor = colorAurora;
            ctx.shadowBlur = 10;
            ctx.stroke();

            // Particles
            for (let p of burst.particles) {
                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.94;
                p.vy *= 0.94;
                p.alpha -= p.decay;

                if (p.alpha > 0) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = p.alpha;
                    ctx.shadowColor = p.color;
                    ctx.shadowBlur = 6;
                    ctx.fill();
                }
            }
            ctx.restore();
        }

        requestAnimationFrame(render);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCanvas);
    } else {
        initCanvas();
    }
})();
