/**
 * =====================================================================
 * VIDE — SITE INSTITUCIONAL // PROPOSTA DE DIREÇÃO CRIATIVA OFICIAL
 * Motores: Tech Text, Morphic Navbar, Crystalized Ball 3D, Accordion Gallery,
 * Web Threads Procedural & Animated Content
 * =====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Fundo DotGrid React Bits Exclusivo na Seção Três Soluções (A Suíte)
    try { inicializarDotGridSolucoes(); } catch (e) { console.warn('Erro DotGrid Soluções:', e); }

    // 2. Animação Expansível de Diagnóstico (ScrollExpand)
    try { inicializarScrollExpand(); } catch (e) { console.warn('Erro ScrollExpand:', e); }

    // 3. Os 7 Agentes Especialistas em Carrossel 3D Wheel (CircularCarousel)
    try { inicializarCircularCarousel(); } catch (e) { console.warn('Erro CircularCarousel:', e); }

    // 4. Motores Visuais e Interativos
    try { inicializarScrollProgress(); } catch (e) { console.warn(e); }
    try { inicializarMorphicNavbar(); } catch (e) { console.warn(e); }
    try { inicializarTechTextDecodificador(); } catch (e) { console.warn(e); }
    try { inicializarRotatingText(); } catch (e) { console.warn(e); }
    try { inicializarOrbShowcase(); } catch (e) { console.warn(e); }
    try { inicializarCrystalizedBall(); } catch (e) { console.warn(e); }
    try { inicializarAccordionGallery(); } catch (e) { console.warn(e); }
    try { inicializarAnimatedContent(); } catch (e) { console.warn(e); }
});

// =====================================================================
// 1. BARRA DE PROGRESSO DE ROLAGEM (SCROLL PROGRESS)
// =====================================================================
function inicializarScrollProgress() {
    const bar = document.getElementById('scroll-progress-bar');
    if (!bar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = `${progress}%`;
    }, { passive: true });
}

// =====================================================================
// 2. MORPHIC NAVBAR (SPLIT NAV & INDICADOR MAGNÉTICO DESLIZANTE)
// =====================================================================
function inicializarMorphicNavbar() {
    const nav = document.getElementById('morphic-navbar');
    const track = document.getElementById('morphic-track');
    const pill = document.getElementById('morphic-pill');
    const links = document.querySelectorAll('.morphic-nav-link');
    if (!nav || !track || !pill || !links.length) return;

    // Scroll compacto
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, { passive: true });

    function moverPillParaElemento(el) {
        const trackRect = track.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        const left = elRect.left - trackRect.left;
        const width = elRect.width;

        pill.style.width = `${width}px`;
        pill.style.transform = `translateX(${left}px)`;
        pill.style.opacity = '1';
    }

    links.forEach((link) => {
        link.addEventListener('mouseenter', () => {
            moverPillParaElemento(link);
        });

        link.addEventListener('click', () => {
            links.forEach(l => l.classList.remove('ativo'));
            link.classList.add('ativo');
            moverPillParaElemento(link);
        });
    });

    track.addEventListener('mouseleave', () => {
        const activeLink = track.querySelector('.morphic-nav-link.ativo');
        if (activeLink) {
            moverPillParaElemento(activeLink);
        } else {
            pill.style.opacity = '0';
        }
    });
}

// =====================================================================
// 3. TECH TEXT // DECODIFICADOR TECNOLÓGICO DE CARACTERES (VIDE & SISTEMAS DE CRESCIMENTO)
// =====================================================================
function inicializarTechTextDecodificador() {
    const glyphs = '01#%&*+-/<>_~VIDECRESM';

    function glitchChar(el, finalChar, originalColor = '#FFFFFF') {
        let count = 0;
        const max = 6;
        const interval = setInterval(() => {
            el.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
            el.style.color = '#00E5FF';
            count++;
            if (count >= max) {
                clearInterval(interval);
                el.textContent = finalChar;
                el.style.color = originalColor;
            }
        }, 35);
    }

    // 1. Decodificador para a marca VIDE
    const displayVide = document.getElementById('tech-text-display');
    if (displayVide) {
        const charsVide = displayVide.querySelectorAll('.tech-char');
        charsVide.forEach((c) => {
            const original = c.textContent;
            c.addEventListener('mouseenter', () => {
                glitchChar(c, original, '#FFFFFF');
            });
            c.addEventListener('click', () => {
                glitchChar(c, original, '#FFFFFF');
            });
        });

        // Disparo inicial sequencial para VIDE
        setTimeout(() => {
            charsVide.forEach((c, idx) => {
                setTimeout(() => {
                    glitchChar(c, c.textContent, '#FFFFFF');
                }, idx * 100);
            });
        }, 400);
    }

    // 2. Decodificador para "SISTEMAS DE CRESCIMENTO"
    const headlineSistemas = document.getElementById('hero-headline-sistemas');
    if (headlineSistemas) {
        const charsSistemas = headlineSistemas.querySelectorAll('.tech-char');
        charsSistemas.forEach((c) => {
            const original = c.textContent;
            const targetColor = c.dataset.color || (c.closest('.destaque-sistemas') ? '#00E5FF' : '#FFFFFF');
            c.addEventListener('mouseenter', () => {
                glitchChar(c, original, targetColor);
            });
            c.addEventListener('click', () => {
                glitchChar(c, original, targetColor);
            });
        });

        // Efeito cascata ao passar o mouse sobre o headline
        headlineSistemas.addEventListener('mouseenter', () => {
            charsSistemas.forEach((c, idx) => {
                const targetColor = c.dataset.color || (c.closest('.destaque-sistemas') ? '#00E5FF' : '#FFFFFF');
                setTimeout(() => {
                    glitchChar(c, c.textContent, targetColor);
                }, idx * 30);
            });
        });

        // Disparo inicial sequencial suave para SISTEMAS DE CRESCIMENTO
        setTimeout(() => {
            charsSistemas.forEach((c, idx) => {
                const targetColor = c.dataset.color || (c.closest('.destaque-sistemas') ? '#00E5FF' : '#FFFFFF');
                setTimeout(() => {
                    glitchChar(c, c.textContent, targetColor);
                }, idx * 45);
            });
        }, 900);
    }
}

// =====================================================================
// 3.1. ROTATING TEXT // CICLO DE PILARES OPERACIONAIS COM TRANSIÇÃO SUAVE
// =====================================================================
function inicializarRotatingText() {
    const alvo = document.getElementById('texto-rotativo-alvo');
    if (!alvo) return;

    const termos = [
        'Experiências Digitais',
        'Inteligência Comercial',
        'Automação no WhatsApp',
        'Sistemas de Crescimento'
    ];
    let indice = 0;

    setInterval(() => {
        alvo.style.opacity = '0';
        alvo.style.transform = 'translateY(8px)';
        setTimeout(() => {
            indice = (indice + 1) % termos.length;
            alvo.textContent = termos[indice];
            alvo.style.opacity = '1';
            alvo.style.transform = 'translateY(0)';
        }, 300);
    }, 2800);
}



// =====================================================================
// 1. DOTGRID // REACT BITS EXCLUSIVO NA SEÇÃO TRÊS SOLUÇÕES (#solucoes)
// Spring Jelly Physics & Shockwaves (React Bits / DavidHDev)
// =====================================================================
function inicializarDotGridSolucoes() {
    const container = document.getElementById('dotgrid-solucoes');
    if (!container || !window.criarDotGrid) return;

    window.criarDotGrid(container, {
        baseColor: "#3a3446",
        activeColor: "#106f80",
        shape: "circle",
        dotSize: 5,
        gap: 18,
        proximity: 140,
        strength: 1,
        bounce: 0.6,
        tension: 0.4,
        returnDuration: 0.8,
        shockRadius: 320,
        shockStrength: 5,
        swell: 0.8,
        stretch: 0.5,
        glow: 0.5,
        fade: 0.15,
        intro: true,
        opacity: 0.95,
        mouseInteraction: true,
        clickShock: true
    });
}

// =====================================================================
// 3.2. ORB // REACT BITS 3D SHADER RUNTIME NA PRIMEIRA PÁGINA (HERO)
// =====================================================================
function inicializarOrbShowcase() {
    const container = document.getElementById('hero-orb-container');
    if (!container || !window.criarOrb) return;

    window.criarOrb(container, {
        colors: ["#9c43fe", "#4cc2e9", "#101499"],
        hoverIntensity: 1,
        trail: 1,
        rotateOnHover: true,
        followCursor: true,
        hue: 0,
        size: 0.65, // Aumentado conforme diretriz de Douglas
        glow: 1,
        bleed: 1,
        wobble: 1,
        highlight: 1,
        tiltX: 0,
        tiltY: 0,
        speed: 1,
        backgroundColor: "#000000",
        forceHoverState: false,
        clickPulse: true,
        intro: true
    });
}

// =====================================================================
// 4. CRYSTALIZED BALL // CANVAS 3D INTERATIVO (CIANO & AZUL PROFUNDO)
// =====================================================================
function inicializarCrystalizedBall() {
    const canvas = document.getElementById('canvas-crystalized-ball');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.clientWidth || 540;
    let height = canvas.clientHeight || 480;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    window.addEventListener('resize', () => {
        width = canvas.clientWidth || 540;
        height = canvas.clientHeight || 480;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
    });

    const raio = Math.min(width, height) * 0.36;
    const totalParticulas = 320;
    const particulas = [];

    for (let i = 0; i < totalParticulas; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        particulas.push({
            x: raio * Math.sin(phi) * Math.cos(theta),
            y: raio * Math.sin(phi) * Math.sin(theta),
            z: raio * Math.cos(phi),
            tamanho: Math.random() * 2 + 1
        });
    }

    const strandsCount = 6;
    let rotX = 0.003;
    let rotY = 0.006;
    let mouse = { x: width / 2, y: height / 2, hover: false };

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.hover = true;
    });

    canvas.addEventListener('mouseleave', () => {
        mouse.hover = false;
    });

    function animarPlasma() {
        ctx.clearRect(0, 0, width, height);

        const centerX = width / 2;
        const centerY = height / 2;
        const fl = 380;

        if (mouse.hover) {
            rotY += ((mouse.x - centerX) * 0.00008 - rotY) * 0.1;
            rotX += ((mouse.y - centerY) * 0.00008 - rotX) * 0.1;
        }

        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);

        const projetados = [];

        particulas.forEach(p => {
            let x1 = p.x * cosY - p.z * sinY;
            let z1 = p.z * cosY + p.x * sinY;
            let y2 = p.y * cosX - z1 * sinX;
            let z2 = z1 * cosX + p.y * sinX;

            p.x = x1;
            p.y = y2;
            p.z = z2;

            const scale = fl / (fl + z2);
            projetados.push({
                px: centerX + x1 * scale,
                py: centerY + y2 * scale,
                pz: z2,
                scale: scale,
                tamanho: p.tamanho
            });
        });

        // Filamentos conectores de plasma
        ctx.lineWidth = 1;
        for (let s = 0; s < strandsCount; s++) {
            const idx1 = (s * 45) % projetados.length;
            const idx2 = ((s + 1) * 45) % projetados.length;
            const p1 = projetados[idx1];
            const p2 = projetados[idx2];

            const grad = ctx.createLinearGradient(p1.px, p1.py, p2.px, p2.py);
            grad.addColorStop(0, 'rgba(0, 229, 255, 0.7)');
            grad.addColorStop(0.5, 'rgba(6, 182, 212, 0.3)');
            grad.addColorStop(1, 'rgba(16, 111, 128, 0.05)');

            ctx.strokeStyle = grad;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.quadraticCurveTo(centerX, centerY, p2.px, p2.py);
            ctx.stroke();
        }

        // Renderiza partículas
        projetados.forEach(p => {
            const alpha = Math.max(0.12, (p.pz + raio) / (2 * raio));
            ctx.beginPath();
            ctx.arc(p.px, p.py, p.tamanho * p.scale, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 229, 255, ${alpha})`;
            ctx.shadowColor = '#00E5FF';
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        requestAnimationFrame(animarPlasma);
    }

    animarPlasma();
}

// =====================================================================
// 5. ACCORDION GALLERY (EXPANSÃO DE SOLUÇÕES & TILT 3D)
// =====================================================================
function inicializarAccordionGallery() {
    const paineis = document.querySelectorAll('.accordion-panel');
    if (!paineis.length) return;

    paineis.forEach((panel) => {
        panel.addEventListener('mouseenter', () => {
            paineis.forEach(p => p.classList.remove('active'));
            panel.classList.add('active');
        });

        panel.addEventListener('mousemove', (e) => {
            const rect = panel.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const tiltX = -(y / rect.height) * 6;
            const tiltY = (x / rect.width) * 6;
            panel.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });

        panel.addEventListener('mouseleave', () => {
            panel.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
}

// =====================================================================
// 5.5. SCROLL EXPAND // DIAGNÓSTICO OPERACIONAL (REACT BITS)
// =====================================================================
function inicializarScrollExpand() {
    const container = document.getElementById('scroll-expand-wrapper');
    if (!container || !window.criarScrollExpand) return;

    window.criarScrollExpand(container, {
        src: "assets/img/diagnostico_hero.svg",
        alt: "Telemetria de Diagnóstico Operacional VIDE",
        title: "Diagnóstico Operacional",
        scrollHint: "Role para expandir o diagnóstico",
        useWindowScroll: true,
        mediaZoom: 1.25,
        startWidth: 78,
        startRadius: 24,
        endRadius: 16,
        scrollDistance: 1.2,
        holdDistance: 0.35,
        smoothing: 0.1,
        overlayScrim: 0.55,
        enabled: true
    });
}

// =====================================================================
// 6. CIRCULAR CAROUSEL 3D (PRESET: WHEEL) // OS 7 AGENTES ESPECIALISTAS
// =====================================================================
function inicializarCircularCarousel() {
    const container = document.getElementById('circular-carousel-container');
    if (!container || !window.criarCircularCarousel) return;

    const items = [
        {
            id: 1,
            tag: 'AGENTE 01 // COGNIÇÃO',
            title: 'Triagem & Mapeamento',
            subtitle: 'Qualificação & Intenção',
            desc: 'Interpreta a intenção do cliente, ticket médio e requisitos críticos antes da produção.',
            entregavel: 'Briefing Estruturado',
            icon: 'fas fa-compass',
            destaque: false
        },
        {
            id: 2,
            tag: 'AGENTE 02 // GOVERNANÇA',
            title: 'Coordenador Geral',
            subtitle: 'Orquestração do Grafo DAG',
            desc: 'Orquestra o grafo DAG, trava tarefas sem pré-requisitos e reporta diretamente à Direção Executiva (Douglas).',
            entregavel: 'Grafo de Precedência',
            icon: 'fas fa-crown',
            destaque: true
        },
        {
            id: 3,
            tag: 'AGENTE 03 // DEV WEB',
            title: 'Desenvolvedor Full-Stack',
            subtitle: 'Engenharia de Alta Performance',
            desc: 'Constrói páginas proprietárias com tempo de resposta < 800ms e score Lighthouse > 95.',
            entregavel: 'Código Autoral Puro',
            icon: 'fas fa-laptop-code',
            destaque: false
        },
        {
            id: 4,
            tag: 'AGENTE 04 // BRANDING',
            title: 'Branding & Design System',
            subtitle: 'Identidade Visual de Luxo',
            desc: 'Gera a identidade de luxo, tipografia cirúrgica, curvas Bézier e tokens CSS exportados.',
            entregavel: 'Tokens & Ativos SVG',
            icon: 'fas fa-bezier-curve',
            destaque: false
        },
        {
            id: 5,
            tag: 'AGENTE 05 // VENDAS',
            title: 'Atendimento Comercial',
            subtitle: 'Engenharia de Conversão',
            desc: 'Estrutura a jornada de qualificação em menos de 45 segundos e matriz de 4 objeções.',
            entregavel: 'Matriz de Objeções',
            icon: 'fas fa-funnel-dollar',
            destaque: false
        },
        {
            id: 6,
            tag: 'AGENTE 06 // AUTOMAÇÃO',
            title: 'Automação com n8n',
            subtitle: 'Orquestração WhatsApp',
            desc: 'Executa réguas no WhatsApp com Stop-on-Reply: respondeu, a automação encerra imediatamente.',
            entregavel: 'Workflows Técnicos',
            icon: 'fab fa-whatsapp',
            destaque: false
        },
        {
            id: 7,
            tag: 'AGENTE 07 // INTELIGÊNCIA',
            title: 'Inteligência Comercial',
            subtitle: 'Auditoria & Prevenção de Perdas',
            desc: 'Audita perdas do funil, quantifica receita em risco em R$ e orienta ações com dados reais.',
            entregavel: 'Relatório de Objeções',
            icon: 'fas fa-brain',
            destaque: false
        }
    ];

    window.criarCircularCarousel(container, {
        items: items,
        preset: "wheel",
        intro: "rise",
        cardWidth: 320,
        aspectRatio: 1.333,
        speed: 14,
        captions: false,
        gap: 25,
        tilt: 0,
        curve: 0,
        perspective: 1800,
        autoplay: "drift",
        interval: 3,
        direction: "left",
        momentum: 0.6,
        snap: true,
        pauseOnHover: true,
        focusOnClick: true,
        draggable: true,
        parallax: 0.3,
        stretch: 0.82,
        fadeColor: "#106f80",
        depthFade: 0.55,
        innerShade: 0.65,
        cornerRadius: 12
    });
}

// =====================================================================
// 7. ANIMATED CONTENT // OBSERVER DE ENTRADA SUAVE
// =====================================================================
function inicializarAnimatedContent() {
    const elementos = document.querySelectorAll('.anim-fade-up');
    if (!elementos.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    elementos.forEach(el => observer.observe(el));
}
