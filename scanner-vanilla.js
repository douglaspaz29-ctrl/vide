/**
 * =====================================================================
 * VIDE — REACT BITS SCANNER (VANILLA RUNTIME PORT)
 * Componente: Scanner (React Bits)
 * Shaders: WebGL 2.0 / WebGL 1.0 (Glowing interference lines & CRT Beam)
 * =====================================================================
 */

(function (window, document) {
    'use strict';

    const SCANNER_VERTEX = `#version 300 es
    in vec2 aPosition;
    void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }`;

    const SCANNER_FRAGMENT = `#version 300 es
    precision highp float;

    uniform vec2 uResolution;
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform float uSpeed;
    uniform float uSweepSpeed;
    uniform float uSweepWidth;
    uniform float uTrail;
    uniform float uRipple;
    uniform float uBandDensity;
    uniform float uGlow;
    uniform float uScanDirection; // 1.0 = vertical, 0.0 = horizontal
    uniform float uColorSpread;
    uniform float uScanline;
    uniform float uScanlineIntensity;
    uniform float uScale;
    uniform float uFrequency;
    uniform float uLineWidth;
    uniform float uBrightness;
    uniform float uVignette;
    uniform float uGrain;
    uniform float uGrainIntensity;
    uniform float uOpacity;
    uniform vec2 uMouse;
    uniform float uMouseRadius;
    uniform float uMouseStrength;
    uniform float uMouseMode; // 1.0 = repel, 0.0 = attract
    uniform vec2 uPingCenter;
    uniform float uPingTime;
    uniform float uIntro;

    out vec4 outColor;

    void main() {
        vec2 uv = gl_FragCoord.xy / uResolution.xy;

        // Repulsão de Cursor (Mouse Lensing)
        vec2 toMouse = uv - uMouse;
        toMouse.x *= (uResolution.x / uResolution.y);
        float mouseDist = length(toMouse);
        if (mouseDist < uMouseRadius && mouseDist > 0.0001) {
            float mFactor = (1.0 - smoothstep(0.0, uMouseRadius, mouseDist)) * uMouseStrength;
            vec2 push = normalize(toMouse) * mFactor * 0.12;
            push.x /= (uResolution.x / uResolution.y);
            uv += (uMouseMode > 0.5 ? push : -push);
        }

        // Efeito de Clique Shockwave (Ping)
        if (uPingTime >= 0.0 && uPingTime < 1.6) {
            vec2 toPing = uv - uPingCenter;
            toPing.x *= (uResolution.x / uResolution.y);
            float pingDist = length(toPing);
            float ringRadius = uPingTime * 0.75;
            float ringWidth = 0.06;
            float ring = smoothstep(ringWidth, 0.0, abs(pingDist - ringRadius));
            float fade = 1.0 - (uPingTime / 1.6);
            vec2 ripplePush = normalize(toPing + 0.0001) * ring * fade * 0.04;
            ripplePush.x /= (uResolution.x / uResolution.y);
            uv += ripplePush;
        }

        // Determinação da direção do feixe de varredura
        // vertical = scan sweeps verticalmente pelas linhas
        float coord = (uScanDirection > 0.5) ? (1.0 - uv.y) : uv.x;
        float crossCoord = (uScanDirection > 0.5) ? uv.x : uv.y;

        // Ondulação senoidal orgânica (Ripple & Frequency)
        float wave = sin(crossCoord * uFrequency * 6.28318 + uTime * uSpeed * 2.5) * uRipple * 0.06;
        float modulatedCoord = coord + wave;

        // Bandas / Linhas de interferência (Band Density & Scale)
        float bandScale = uBandDensity * uScale;
        float phase = modulatedCoord * bandScale;
        float lineDist = abs(fract(phase) - 0.5);
        float lineThickness = 0.075 * uLineWidth;
        float line = smoothstep(lineThickness + 0.015, lineThickness - 0.015, lineDist);

        // Posição da Cabeça de Varredura (Sweep Beam)
        float cycleLength = 1.0 + uSweepWidth;
        float sweepPos = mod(uTime * uSweepSpeed * 0.7, cycleLength) - (uSweepWidth * 0.3);
        float distToSweep = coord - sweepPos;

        // Cabeça quente do laser
        float scanHead = smoothstep(0.04, 0.0, abs(distToSweep));

        // Rastro de luminescência (Trail)
        float trailDist = distToSweep;
        float scanTrail = 0.0;
        if (trailDist > 0.0 && trailDist < uTrail) {
            scanTrail = pow(1.0 - (trailDist / uTrail), 1.8);
        }
        float scanInfluence = clamp(scanHead * 1.6 + scanTrail, 0.0, 1.0);

        // Mistura de Cores:
        // color1 = linhas em repouso
        // color2 = linhas ativadas pela passagem do feixe
        // color3 = núcleo térmico da cabeça do feixe
        vec3 litColor = mix(uColor1, uColor2, clamp(scanTrail / (uColorSpread + 0.001), 0.0, 1.0));
        vec3 finalLineColor = mix(litColor, uColor3, scanHead * 0.9);

        // Glow (Emissão lateral difusa das linhas)
        float glowFactor = (1.0 - smoothstep(0.0, 0.32, lineDist)) * uGlow * (0.35 + 0.65 * scanInfluence);
        vec3 rgb = finalLineColor * (line + glowFactor * 0.75) * uBrightness;

        // Ambiente suave de fundo do feixe de laser
        vec3 beamAtmosphere = (uColor2 * scanInfluence * 0.10) + (uColor1 * 0.035);
        rgb += beamAtmosphere;

        // Scanlines horizontais estilo CRT
        if (uScanline > 0.5) {
            float sl = sin(gl_FragCoord.y * 1.57079);
            float scanlineFactor = mix(1.0, 0.55 + 0.45 * sl * sl, uScanlineIntensity * 0.5);
            rgb *= scanlineFactor;
        }

        // Granulação de película (Film Grain)
        if (uGrain > 0.5) {
            float noise = fract(sin(dot(gl_FragCoord.xy + fract(uTime) * 87.0, vec2(12.9898, 78.233))) * 43758.5453);
            rgb += (noise - 0.5) * uGrainIntensity;
        }

        // Vinheta sutil nos cantos da tela (Vignette)
        if (uVignette > 0.01) {
            vec2 vUv = uv * (1.0 - uv);
            float vig = clamp(pow(vUv.x * vUv.y * 15.0, uVignette), 0.0, 1.0);
            rgb *= vig;
        }

        // Entrada suave
        rgb *= uIntro * uOpacity;

        outColor = vec4(rgb, uOpacity * clamp(length(rgb) * 1.8 + 0.08, 0.0, 1.0));
    }`;

    // Conversão de HEX para RGB [0..1]
    function hexToRgb(hex) {
        if (!hex) return [1, 1, 1];
        let h = hex.replace('#', '');
        if (h.length === 3) {
            h = h.split('').map(c => c + c).join('');
        }
        const num = parseInt(h, 16);
        return [
            ((num >> 16) & 255) / 255,
            ((num >> 8) & 255) / 255,
            (num & 255) / 255
        ];
    }

    class ScannerVanilla {
        constructor(canvasOrId, options = {}) {
            this.canvas = typeof canvasOrId === 'string' ? document.getElementById(canvasOrId) : canvasOrId;
            if (!this.canvas) return;

            this.options = Object.assign({
                color1: '#5227FF',
                color2: '#FF9FFC',
                color3: '#FFFFFF',
                speed: 0.5,
                sweepSpeed: 0.25,
                sweepWidth: 1.6,
                trail: 0.5,
                ripple: 0.22,
                bandDensity: 11,
                glow: 0.6,
                scanDirection: 'vertical',
                colorSpread: 0.7,
                scanline: true,
                scanlineIntensity: 0.5,
                mouseInteraction: true,
                clickEffect: 'ping',
                reverse: false,
                scale: 1.5,
                frequency: 2,
                lineWidth: 1.2,
                brightness: 1,
                vignette: 0.3,
                grain: true,
                grainIntensity: 0.04,
                opacity: 1,
                mouseMode: 'repel',
                mouseRadius: 0.5,
                mouseStrength: 0.7,
                intro: true,
                lightMode: false
            }, options);

            this.mouse = { x: 0.5, y: 0.5, active: false };
            this.ping = { x: 0.5, y: 0.5, startTime: -999 };
            this.startTime = performance.now();
            this.introProgress = this.options.intro ? 0.0 : 1.0;

            this.initWebGL();
            this.attachEvents();
            this.animate = this.animate.bind(this);
            requestAnimationFrame(this.animate);
        }

        initWebGL() {
            this.gl = this.canvas.getContext('webgl2', {
                alpha: true,
                premultipliedAlpha: true,
                antialias: false,
                powerPreference: 'high-performance'
            });

            if (!this.gl) {
                console.warn('WebGL2 not available for Scanner, falling back to 2D context');
                return;
            }

            const gl = this.gl;

            const compile = (type, src) => {
                const s = gl.createShader(type);
                gl.shaderSource(s, src);
                gl.compileShader(s);
                if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
                    console.error('Shader error:', gl.getShaderInfoLog(s));
                    gl.deleteShader(s);
                    return null;
                }
                return s;
            };

            const vs = compile(gl.VERTEX_SHADER, SCANNER_VERTEX);
            const fs = compile(gl.FRAGMENT_SHADER, SCANNER_FRAGMENT);
            if (!vs || !fs) return;

            this.program = gl.createProgram();
            gl.attachShader(this.program, vs);
            gl.attachShader(this.program, fs);
            gl.bindAttribLocation(this.program, 0, 'aPosition');
            gl.linkProgram(this.program);

            if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
                console.error('Program link error:', gl.getProgramInfoLog(this.program));
                return;
            }

            gl.useProgram(this.program);

            // Quad fullscreen
            const buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
            gl.enableVertexAttribArray(0);
            gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

            // Uniform locations
            this.u = {};
            const uniforms = [
                'uResolution', 'uTime', 'uColor1', 'uColor2', 'uColor3',
                'uSpeed', 'uSweepSpeed', 'uSweepWidth', 'uTrail', 'uRipple',
                'uBandDensity', 'uGlow', 'uScanDirection', 'uColorSpread',
                'uScanline', 'uScanlineIntensity', 'uScale', 'uFrequency',
                'uLineWidth', 'uBrightness', 'uVignette', 'uGrain',
                'uGrainIntensity', 'uOpacity', 'uMouse', 'uMouseRadius',
                'uMouseStrength', 'uMouseMode', 'uPingCenter', 'uPingTime', 'uIntro'
            ];

            uniforms.forEach(name => {
                this.u[name] = gl.getUniformLocation(this.program, name);
            });

            this.resize();
        }

        resize() {
            if (!this.canvas || !this.gl) return;
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            const w = this.canvas.clientWidth || window.innerWidth;
            const h = this.canvas.clientHeight || window.innerHeight;

            if (this.canvas.width !== Math.floor(w * dpr) || this.canvas.height !== Math.floor(h * dpr)) {
                this.canvas.width = Math.floor(w * dpr);
                this.canvas.height = Math.floor(h * dpr);
                this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
            }
        }

        attachEvents() {
            window.addEventListener('resize', () => this.resize(), { passive: true });

            if (this.options.mouseInteraction) {
                window.addEventListener('mousemove', (e) => {
                    this.mouse.x = e.clientX / window.innerWidth;
                    this.mouse.y = 1.0 - (e.clientY / window.innerHeight);
                    this.mouse.active = true;
                }, { passive: true });

                window.addEventListener('mouseleave', () => {
                    this.mouse.active = false;
                }, { passive: true });
            }

            if (this.options.clickEffect === 'ping') {
                window.addEventListener('click', (e) => {
                    this.ping.x = e.clientX / window.innerWidth;
                    this.ping.y = 1.0 - (e.clientY / window.innerHeight);
                    this.ping.startTime = performance.now();
                }, { passive: true });
            }
        }

        animate(now) {
            if (!this.gl || !this.program) return;
            const gl = this.gl;
            const elapsed = (now - this.startTime) * 0.001;

            if (this.options.intro && this.introProgress < 1.0) {
                this.introProgress = Math.min(1.0, this.introProgress + 0.02);
            }

            gl.useProgram(this.program);

            gl.uniform2f(this.u.uResolution, this.canvas.width, this.canvas.height);
            gl.uniform1f(this.u.uTime, elapsed);

            const c1 = hexToRgb(this.options.color1);
            const c2 = hexToRgb(this.options.color2);
            const c3 = hexToRgb(this.options.color3);
            gl.uniform3f(this.u.uColor1, c1[0], c1[1], c1[2]);
            gl.uniform3f(this.u.uColor2, c2[0], c2[1], c2[2]);
            gl.uniform3f(this.u.uColor3, c3[0], c3[1], c3[2]);

            gl.uniform1f(this.u.uSpeed, this.options.speed);
            gl.uniform1f(this.u.uSweepSpeed, this.options.sweepSpeed);
            gl.uniform1f(this.u.uSweepWidth, this.options.sweepWidth);
            gl.uniform1f(this.u.uTrail, this.options.trail);
            gl.uniform1f(this.u.uRipple, this.options.ripple);
            gl.uniform1f(this.u.uBandDensity, this.options.bandDensity);
            gl.uniform1f(this.u.uGlow, this.options.glow);
            gl.uniform1f(this.u.uScanDirection, this.options.scanDirection === 'vertical' ? 1.0 : 0.0);
            gl.uniform1f(this.u.uColorSpread, this.options.colorSpread);
            gl.uniform1f(this.u.uScanline, this.options.scanline ? 1.0 : 0.0);
            gl.uniform1f(this.u.uScanlineIntensity, this.options.scanlineIntensity);
            gl.uniform1f(this.u.uScale, this.options.scale);
            gl.uniform1f(this.u.uFrequency, this.options.frequency);
            gl.uniform1f(this.u.uLineWidth, this.options.lineWidth);
            gl.uniform1f(this.u.uBrightness, this.options.brightness);
            gl.uniform1f(this.u.uVignette, this.options.vignette);
            gl.uniform1f(this.u.uGrain, this.options.grain ? 1.0 : 0.0);
            gl.uniform1f(this.u.uGrainIntensity, this.options.grainIntensity);
            gl.uniform1f(this.u.uOpacity, this.options.opacity);

            gl.uniform2f(this.u.uMouse, this.mouse.x, this.mouse.y);
            gl.uniform1f(this.u.uMouseRadius, this.options.mouseRadius);
            gl.uniform1f(this.u.uMouseStrength, this.mouse.active ? this.options.mouseStrength : 0.0);
            gl.uniform1f(this.u.uMouseMode, this.options.mouseMode === 'repel' ? 1.0 : 0.0);

            const pingElapsed = (now - this.ping.startTime) * 0.001;
            gl.uniform2f(this.u.uPingCenter, this.ping.x, this.ping.y);
            gl.uniform1f(this.u.uPingTime, pingElapsed >= 0 && pingElapsed < 2.0 ? pingElapsed : -1.0);

            gl.uniform1f(this.u.uIntro, this.introProgress);

            gl.drawArrays(gl.TRIANGLES, 0, 3);
            requestAnimationFrame(this.animate);
        }
    }

    window.criarScanner = function (canvasOrId, options) {
        return new ScannerVanilla(canvasOrId, options);
    };

})(window, document);
