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
    try { inicializarDotGridAgentes(); } catch (e) { console.warn('Erro DotGrid Agentes:', e); }

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
    try { inicializarModalCentralOS(); } catch (e) { console.warn(e); }
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
    let width = canvas.clientWidth || 860;
    let height = canvas.clientHeight || 640;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    window.addEventListener('resize', () => {
        width = canvas.clientWidth || 860;
        height = canvas.clientHeight || 640;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
    });

    const raio = Math.min(width, height) * 0.44;
    const totalParticulas = 480;
    const particulas = [];

    for (let i = 0; i < totalParticulas; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        particulas.push({
            x: raio * Math.sin(phi) * Math.cos(theta),
            y: raio * Math.sin(phi) * Math.sin(theta),
            z: raio * Math.cos(phi),
            tamanho: Math.random() * 2.5 + 1.2,
            brilho: Math.random() * 0.6 + 0.4
        });
    }

    let rotX = 0.0025;
    let rotY = 0.0055;
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
        const fl = 480;

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
            const projX = centerX + x1 * scale;
            const projY = centerY + y2 * scale;
            const alpha = Math.max(0.12, (z2 + raio) / (raio * 2));

            projetados.push({ x: projX, y: projY, z: z2, alpha, tamanho: p.tamanho * scale });

            ctx.beginPath();
            ctx.arc(projX, projY, p.tamanho * scale, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 229, 255, ${alpha * 0.9})`;
            ctx.shadowColor = '#00E5FF';
            ctx.shadowBlur = alpha > 0.6 ? 12 : 4;
            ctx.fill();
        });

        // Desenhar conexões cósmicas entre pontos próximos
        ctx.shadowBlur = 0;
        for (let i = 0; i < projetados.length; i += 3) {
            for (let j = i + 1; j < projetados.length; j += 4) {
                const dx = projetados[i].x - projetados[j].x;
                const dy = projetados[i].y - projetados[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 46) {
                    ctx.beginPath();
                    ctx.moveTo(projetados[i].x, projetados[i].y);
                    ctx.lineTo(projetados[j].x, projetados[j].y);
                    const lineAlpha = (1 - dist / 46) * 0.22 * Math.min(projetados[i].alpha, projetados[j].alpha);
                    ctx.strokeStyle = `rgba(0, 229, 255, ${lineAlpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animarPlasma);
    }

    animarPlasma();
}

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
            tag: 'AGENTE 01 // QUALIFICAÇÃO',
            title: 'Triagem & Intenção',
            subtitle: 'Diagnóstico de Demanda',
            desc: 'Identifica o perfil do lead, separa curiosos de compradores reais e direciona cada oportunidade com contexto completo para o fechamento.',
            entregavel: 'Lead Qualificado',
            icon: 'fas fa-compass',
            destaque: false
        },
        {
            id: 2,
            tag: 'AGENTE 02 // GOVERNANÇA',
            title: 'Coordenação Operacional',
            subtitle: 'Controle de Qualidade',
            desc: 'Assegura que nenhuma etapa comercial seja pulada, mantendo o padrão de excelência sob a supervisão da Diretoria Executiva.',
            entregavel: 'Rigor Operacional',
            icon: 'fas fa-crown',
            destaque: true
        },
        {
            id: 3,
            tag: 'AGENTE 03 // PRESENÇA DIGITAL',
            title: 'Performance & Conversão',
            subtitle: 'Carregamento Instantâneo',
            desc: 'Garante que suas páginas abram em menos de um piscar de olhos no smartphone, evitando que potenciais clientes desistam por lentidão.',
            entregavel: 'Página de Alta Conversão',
            icon: 'fas fa-bolt',
            destaque: false
        },
        {
            id: 4,
            tag: 'AGENTE 04 // AUTORIDADE',
            title: 'Posicionamento & Prestígio',
            subtitle: 'Design de Alto Valor',
            desc: 'Constrói a percepção visual de alto padrão da sua empresa, ancorando autoridade para defender preços e contratos mais vantajosos.',
            entregavel: 'Identidade de Prestígio',
            icon: 'fas fa-gem',
            destaque: false
        },
        {
            id: 5,
            tag: 'AGENTE 05 // ESTRATÉGIA',
            title: 'Engenharia Comercial',
            subtitle: 'Quebra de Objeções',
            desc: 'Estrutura os roteiros de resposta contra as principais dúvidas do comprador (preço, tempo, confiança), acelerando a decisão de compra.',
            entregavel: 'Roteiro de Fechamento',
            icon: 'fas fa-comments-dollar',
            destaque: false
        },
        {
            id: 6,
            tag: 'AGENTE 06 // AGILIDADE',
            title: 'Atendimento no WhatsApp',
            subtitle: 'Resposta Instantânea',
            desc: 'Responde prontamente no WhatsApp e realiza a transição fluida para os consultores humanos no momento exato do interesse.',
            entregavel: 'Atendimento Imediato',
            icon: 'fab fa-whatsapp',
            destaque: false
        },
        {
            id: 7,
            tag: 'AGENTE 07 // INTELIGÊNCIA',
            title: 'Auditoria & Prevenção',
            subtitle: 'Recuperação de Vendas',
            desc: 'Identifica em quais etapas seus contatos silenciam, quantifica o faturamento em risco e orienta ações práticas para recuperar clientes.',
            entregavel: 'Recuperação de Receita',
            icon: 'fas fa-chart-line',
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

// =====================================================================
// 8. MODAL CENTRAL OS // ACESSO SEGURO, RESILIENTE E SEM 404
// =====================================================================
function inicializarModalCentralOS() {
    const modal = document.getElementById('modal-central-os');
    const btnOpenNav = document.getElementById('btn-header-central-os');
    const btnOpenFooter = document.getElementById('btn-portal-modal');
    const btnClose = document.getElementById('modal-central-close');

    if (!modal) return;

    function abrirModal(e) {
        if (e) e.preventDefault();
        modal.classList.add('ativo');
        modal.setAttribute('aria-hidden', 'false');
    }

    function fecharModal() {
        modal.classList.remove('ativo');
        modal.setAttribute('aria-hidden', 'true');
    }

    if (btnOpenNav) btnOpenNav.addEventListener('click', abrirModal);
    if (btnOpenFooter) btnOpenFooter.addEventListener('click', abrirModal);
    if (btnClose) btnClose.addEventListener('click', fecharModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) fecharModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('ativo')) {
            fecharModal();
        }
    });
}



// =====================================================================
// CONTROLADOR DO COCKPIT EXECUTIVO EMBUTIDO (ZERO 404)
// =====================================================================
window.abrirCockpitExecutivo = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    const modalCentral = document.getElementById('modal-central-os');
    if (modalCentral) modalCentral.classList.remove('ativo');
    const overlay = document.getElementById('cockpit-executivo-overlay');
    if (overlay) {
        overlay.classList.add('ativo');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        history.replaceState(null, '', '#central_de_comando');
        try {
            if (typeof renderizarGrafoTarefas === 'function') renderizarGrafoTarefas();
            if (typeof renderizarAnimatedList === 'function') renderizarAnimatedList();
        } catch(err) { console.warn(err); }
    }
};

window.fecharCockpitExecutivo = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    const overlay = document.getElementById('cockpit-executivo-overlay');
    if (overlay) {
        overlay.classList.remove('ativo');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        history.replaceState(null, '', window.location.pathname);
    }
};

// Auto-abrir se acessado via hash #central_de_comando
window.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash === '#central_de_comando') {
        abrirCockpitExecutivo();
    }
});
window.addEventListener('hashchange', () => {
    if (window.location.hash === '#central_de_comando') {
        abrirCockpitExecutivo();
    } else {
        fecharCockpitExecutivo();
    }
});
/**
 * =====================================================================
 * VIDE — CENTRAL DE COMANDO // PROPOSTA DE DIREÇÃO CRIATIVA (PROJETO 1)
 * Motor Interativo: Magic Bento Spotlight, Animated List & Prompt Bar
 * =====================================================================
 */

const ESTADO_COMANDO = {
    visaoAtual: 'bento',
    projetoSelecionadoId: 'PRJ-LUMINA-MASTER',
    token: localStorage.getItem('vide_token') || null,
    tarefaInspecionada: null,
    indiceItemSelecionado: 0,
    filtroListaAtual: 'todos',

    // Feed de Atividades Operacionais em Tempo Real
    atividades: [
        {
            id: 'ACT-01',
            agente: 'Agente 02 — Coordenador Geral',
            tipo: 'auditoria',
            icone: 'fa-shield-alt',
            titulo: 'Homologação Técnica do Agente 06 (Automação)',
            meta: 'Hoje, 05:35 // Stop-on-Reply Aprovado',
            tarefaId: 'TSK-05',
            status: 'APROVADA'
        },
        {
            id: 'ACT-02',
            agente: 'Agente 07 — Inteligência Comercial',
            tipo: 'alerta',
            icone: 'fa-brain',
            titulo: 'R$ 42.800 em Risco Mapeados no CRM',
            meta: 'Hoje, 05:36 // 42% Objeção de Preço',
            tarefaId: 'TSK-06',
            status: 'EM_ANALISE'
        },
        {
            id: 'ACT-03',
            agente: 'Agente 04 — Branding & Design',
            tipo: 'tarefa',
            icone: 'fa-palette',
            titulo: 'Exportação de Tokens CSS e Ativos SVG',
            meta: 'Hoje, 05:20 // Brand Book Lumina',
            tarefaId: 'TSK-02',
            status: 'APROVADA'
        },
        {
            id: 'ACT-04',
            agente: 'Agente 03 — Dev Full-Stack',
            tipo: 'tarefa',
            icone: 'fa-code',
            titulo: 'Landing Page com Carregamento < 800ms',
            meta: 'Hoje, 05:25 // Lighthouse Score 99',
            tarefaId: 'TSK-03',
            status: 'APROVADA'
        },
        {
            id: 'ACT-05',
            agente: 'Agente 05 — Atendimento & Vendas',
            tipo: 'auditoria',
            icone: 'fa-comments-dollar',
            titulo: 'Matriz de 4 Objeções Estruturada',
            meta: 'Hoje, 05:30 // Qualificação em 30s',
            tarefaId: 'TSK-04',
            status: 'APROVADA'
        }
    ],

    // Projetos Pré-Carregados com Grafo de Tarefas dos 7 Agentes
    projetos: [
        {
            id: 'PRJ-LUMINA-MASTER',
            cliente: 'Clínica Lumina Estética Avançada',
            segmento: 'Estética de Alto Padrão (Harmonização e Laser)',
            status: 'EM_EXECUCAO',
            autorizacao: 'AUTORIZADO_DIRETOR_DOUGLAS',
            progresso: 83,
            tarefas: [
                {
                    id: 'TSK-01',
                    agenteId: 'AGENTE_01',
                    agenteNome: 'Agente 01 — Triagem',
                    icone: 'fa-filter',
                    titulo: 'Triagem Estruturada e Mapeamento de Intenção',
                    descricao: 'Mapeamento das necessidades da clínica: captação qualificada para procedimentos de ticket superior a R$ 3.500 e contenção de silêncio no WhatsApp.',
                    estado: 'APROVADA',
                    dependencias: [],
                    criterios: [
                        { texto: 'Mapeamento dos 5 procedimentos prioritários', cumprido: true },
                        { texto: 'Definição de canais de aquisição prioritários', cumprido: true },
                        { texto: 'Critérios de triagem técnica validados', cumprido: true }
                    ],
                    artefatos: ['matriz_triagem_lumina.json', 'briefing_executivo.md'],
                    auditoria: [
                        { autor: 'Agente 01 (Triagem)', data: 'Hoje, 05:14', nota: 'Triagem inicial formalizada e persistida no repositório.' },
                        { autor: 'Coordenador Geral', data: 'Hoje, 05:15', nota: 'Conferência técnica realizada: 100% de conformidade.' }
                    ]
                },
                {
                    id: 'TSK-02',
                    agenteId: 'AGENTE_04',
                    agenteNome: 'Agente 04 — Branding & Design',
                    icone: 'fa-palette',
                    titulo: 'Identidade Visual & Design System Obsidian/JK',
                    descricao: 'Desenvolvimento de paleta cromática de autoridade, tipografia Montserrat/Outfit, biblioteca de ícones cirúrgicos e ativos vetoriais SVG.',
                    estado: 'APROVADA',
                    dependencias: ['TSK-01'],
                    criterios: [
                        { texto: 'Geração do Brand Book com paleta contrastante', cumprido: true },
                        { texto: 'Tokens CSS proprietários exportados', cumprido: true },
                        { texto: 'Ativos SVG estruturados com curvas Bézier', cumprido: true }
                    ],
                    artefatos: ['tokens_marca_lumina.json', 'guia_identidade_visual.pdf'],
                    auditoria: [
                        { autor: 'Agente 04 (Branding)', data: 'Hoje, 05:18', nota: 'Tokens e ativos visuais gerados com rigor estético.' },
                        { autor: 'Coordenador Geral', data: 'Hoje, 05:20', nota: 'Auditoria de curvas e conformidade aprovada.' }
                    ]
                },
                {
                    id: 'TSK-03',
                    agenteId: 'AGENTE_03',
                    agenteNome: 'Agente 03 — Dev Full-Stack',
                    icone: 'fa-code',
                    titulo: 'Engenharia da Landing Page de Alta Performance',
                    descricao: 'Construção da interface web com tempo de carregamento < 800ms, sem templates genéricos, consumindo tokens do Agente 04.',
                    estado: 'APROVADA',
                    dependencias: ['TSK-02'],
                    criterios: [
                        { texto: 'HTML semântico e CSS modular sem Bootstrap', cumprido: true },
                        { texto: 'Formulário integrado à API do Coordenador', cumprido: true },
                        { texto: 'Score de performance Lighthouse > 95', cumprido: true }
                    ],
                    artefatos: ['index.html', 'estilos.css', 'app.js'],
                    auditoria: [
                        { autor: 'Agente 03 (Dev)', data: 'Hoje, 05:24', nota: 'Landing page implantada no servidor local com microinterações.' },
                        { autor: 'Coordenador Geral', data: 'Hoje, 05:25', nota: 'Aprovada no benchmark de velocidade e responsividade.' }
                    ]
                },
                {
                    id: 'TSK-04',
                    agenteId: 'AGENTE_05',
                    agenteNome: 'Agente 05 — Atendimento & Vendas',
                    icone: 'fa-comments-dollar',
                    titulo: 'Jornada Conversacional & Matriz de 4 Objeções',
                    descricao: 'Mapeamento das rotas de qualificação rápida no WhatsApp, roteiro de quebra de preço alto e regras de cadência ativa.',
                    estado: 'APROVADA',
                    dependencias: ['TSK-01'],
                    criterios: [
                        { texto: 'Matriz de Objeções: Preço, Timing, Confiança, Terceiros', cumprido: true },
                        { texto: 'Roteiros de quebra human-in-the-loop documentados', cumprido: true },
                        { texto: 'Tempo de qualificação estimado em menos de 45 segundos', cumprido: true }
                    ],
                    artefatos: ['matriz_objecoes_vendas.json', 'roteiro_atendimento.md'],
                    auditoria: [
                        { autor: 'Agente 05 (Atendimento)', data: 'Hoje, 05:29', nota: 'Mapeamento de objeções concluído.' },
                        { autor: 'Coordenador Geral', data: 'Hoje, 05:30', nota: 'Aprovada para alimentar o fluxo técnico no n8n.' }
                    ]
                },
                {
                    id: 'TSK-05',
                    agenteId: 'AGENTE_06',
                    agenteNome: 'Agente 06 — Automação & n8n',
                    icone: 'fa-network-wired',
                    titulo: 'Workflows Técnicos no n8n com Stop-on-Reply',
                    descricao: 'Conexão dos webhooks de lead ao CRM, cadência de reengajamento e trava imediata de mensagens quando o paciente responde.',
                    estado: 'APROVADA',
                    dependencias: ['TSK-03', 'TSK-04'],
                    criterios: [
                        { texto: 'Workflow JSON exportado para importação direta no n8n', cumprido: true },
                        { texto: 'Mecanismo de deduplicação idempotente ativo', cumprido: true },
                        { texto: 'Regra estrita de Stop-on-Reply verificada em teste unitário', cumprido: true }
                    ],
                    artefatos: ['workflow_n8n_lumina.json', 'motor_deduplicacao.js'],
                    auditoria: [
                        { autor: 'Agente 06 (Automação)', data: 'Hoje, 05:34', nota: 'Workflow n8n operacionalizado na porta 5678.' },
                        { autor: 'Coordenador Geral', data: 'Hoje, 05:35', nota: 'Homologação técnica de envio e parada validada.' }
                    ]
                },
                {
                    id: 'TSK-06',
                    agenteId: 'AGENTE_07',
                    agenteNome: 'Agente 07 — Inteligência Comercial',
                    icone: 'fa-brain',
                    titulo: 'Auditoria de Perdas, Funil e Retroalimentação',
                    descricao: 'Análise diária de conversas para mensurar onde a receita está vazando, quantificar perdas em R$ e gerar recomendações para a equipe humana.',
                    estado: 'PRONTA_PARA_EXECUCAO',
                    dependencias: ['TSK-05'],
                    criterios: [
                        { texto: 'Taxa de perda no funil mapeada com separação de hipóteses', cumprido: false },
                        { texto: 'Dashboard de Objeções gerado com receita em risco', cumprido: true },
                        { texto: 'Relatório executivo submetido à Diretoria', cumprido: false }
                    ],
                    artefatos: ['relatorio_vazamento_receita.md', 'dashboard_auditoria.html'],
                    auditoria: [
                        { autor: 'Coordenador Geral', data: 'Hoje, 05:36', nota: 'Liberada para execução técnica do Agente 07.' }
                    ]
                }
            ]
        }
    ]
};

// =====================================================================
// INICIALIZAÇÃO
// =====================================================================
document.addEventListener('DOMContentLoaded', () => {
    configurarNavegacao();
    inicializarMagicBentoSpotlight();
    inicializarAnimatedList();
    inicializarPromptBar();
    renderizarGrafoTarefas();
    carregarTelemetriaRealServidor();
    configurarNavegacaoTeclado();
});

// =====================================================================
// 1. COMPONENTE A: MAGIC BENTO SPOTLIGHT CONTROLLER
// =====================================================================
function inicializarMagicBentoSpotlight() {
    const cards = document.querySelectorAll('.magic-bento-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--spotlight-x', `${x}px`);
            card.style.setProperty('--spotlight-y', `${y}px`);
        });
    });
}

// =====================================================================
// 2. COMPONENTE B: ANIMATED LIST (FEED OPERACIONAL & TAREFAS VIVAS)
// =====================================================================
function inicializarAnimatedList() {
    renderizarAnimatedList();

    // Filtros por Categoria
    const tabs = document.querySelectorAll('.tab-list-chip[data-filtro]');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('ativo'));
            tab.classList.add('ativo');
            ESTADO_COMANDO.filtroListaAtual = tab.getAttribute('data-filtro');
            renderizarAnimatedList();
        });
    });
}

function renderizarAnimatedList() {
    const container = document.getElementById('animated-list-container');
    if (!container) return;

    container.innerHTML = '';
    const filtro = ESTADO_COMANDO.filtroListaAtual;
    const filtrados = ESTADO_COMANDO.atividades.filter(item => {
        if (filtro === 'todos') return true;
        if (filtro === 'auditorias') return item.tipo === 'auditoria';
        if (filtro === 'tarefas') return item.tipo === 'tarefa';
        if (filtro === 'alertas') return item.tipo === 'alerta';
        return true;
    });

    filtrados.forEach((item, idx) => {
        const el = document.createElement('div');
        el.className = `animated-list-item ${idx === ESTADO_COMANDO.indiceItemSelecionado ? 'selecionado' : ''}`;
        el.setAttribute('data-index', idx);

        el.innerHTML = `
            <div class="item-lado-esquerdo">
                <div class="item-icone-agente">
                    <i class="fas ${item.icone}"></i>
                </div>
                <div>
                    <div class="item-titulo">${item.titulo}</div>
                    <div class="item-meta">${item.agente} • ${item.meta}</div>
                </div>
            </div>
            <div>
                <span style="font-family: var(--font-mono); font-size: 10px; padding: 2px 8px; border-radius: 4px; background: rgba(0,229,255,0.1); color: var(--cyan-primary);">
                    ${item.status}
                </span>
            </div>
        `;

        el.addEventListener('click', () => {
            selecionarItemLista(idx);
            const projeto = ESTADO_COMANDO.projetos[0];
            const tarefaCorrespondente = projeto.tarefas.find(t => t.id === item.tarefaId);
            if (tarefaCorrespondente) abrirInspectorDrawer(tarefaCorrespondente);
        });

        container.appendChild(el);
    });
}

function selecionarItemLista(idx) {
    ESTADO_COMANDO.indiceItemSelecionado = idx;
    const items = document.querySelectorAll('.animated-list-item');
    items.forEach((it, i) => {
        if (i === idx) {
            it.classList.add('selecionado');
            it.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        } else {
            it.classList.remove('selecionado');
        }
    });
}

// Navegação por Teclado na Animated List
function configurarNavegacaoTeclado() {
    document.addEventListener('keydown', (e) => {
        if (ESTADO_COMANDO.visaoAtual !== 'bento') return;
        const total = document.querySelectorAll('.animated-list-item').length;
        if (total === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const novo = Math.min(total - 1, ESTADO_COMANDO.indiceItemSelecionado + 1);
            selecionarItemLista(novo);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const novo = Math.max(0, ESTADO_COMANDO.indiceItemSelecionado - 1);
            selecionarItemLista(novo);
        } else if (e.key === 'Enter') {
            const itemEl = document.querySelector(`.animated-list-item[data-index="${ESTADO_COMANDO.indiceItemSelecionado}"]`);
            if (itemEl) itemEl.click();
        }
    });
}

// =====================================================================
// 3. COMPONENTE C: PROMPT BAR (COMUNICAÇÃO COM O COORDENADOR GERAL)
// =====================================================================
function inicializarPromptBar() {
    const input = document.getElementById('prompt-bar-input');
    const form = document.getElementById('form-prompt-bar');
    if (!input || !form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const cmd = input.value.trim();
        if (!cmd) return;

        input.value = '';
        input.disabled = true;
        input.placeholder = 'Coordenador Geral processando instrução...';

        await processarInstrucaoCoordenador(cmd);

        input.disabled = false;
        input.placeholder = 'Instruir Coordenador Geral em linguagem natural (ex: Quais projetos em andamento?)...';
        input.focus();
    });
}

window.enviarPromptAtalho = function(texto) {
    const input = document.getElementById('prompt-bar-input');
    if (input) {
        input.value = texto;
        processarInstrucaoCoordenador(texto);
    }
};

async function processarInstrucaoCoordenador(comandoTexto) {
    exibirToastSucesso(`Instrução enviada ao Coordenador Geral: "${comandoTexto}"`);

    try {
        const headers = { 'Content-Type': 'application/json' };
        if (ESTADO_COMANDO.token) headers['Authorization'] = 'Bearer ' + ESTADO_COMANDO.token;

        const res = await fetch('/api/coordenador/comando', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ comando: comandoTexto })
        });

        if (res.ok) {
            const data = await res.json();
            abrirModalRespostaCoordenador(data.resposta || 'Comando processado com sucesso na esteira.');
            return;
        }
    } catch (e) {
        console.warn('Backend local executando via motor de contingência.');
    }

    // Fallback Inteligente Local
    setTimeout(() => {
        let resposta = '';
        const c = comandoTexto.toLowerCase();
        if (c.includes('andamento') || c.includes('projetos')) {
            resposta = `Diretor Douglas, atualmente temos **1 projeto prioritário em execução ativa**:\n\n` +
                       `• **Clínica Lumina Estética Avançada**:\n` +
                       `  - Progresso: 83% concluído (5 de 6 tarefas homologadas).\n` +
                       `  - Tarefa Atual: Agente 07 submeteu o dashboard de perdas e objeções para sua validação executiva.`;
        } else if (c.includes('pendente') || c.includes('aprovação')) {
            resposta = `Identifiquei **1 pendência aguardando sua autorização**:\n\n` +
                       `• **[TSK-06] Auditoria de Funil & Receita em Risco (Clínica Lumina)**.\n` +
                       `Você pode homologar diretamente pelo card Magic Bento ou no Slide-Over Inspector Drawer.`;
        } else {
            resposta = `Comando recebido pelo Coordenador Geral: "${comandoTexto}".\n\nTodos os 7 especialistas estão operando com 100% de integridade e governança.`;
        }
        abrirModalRespostaCoordenador(resposta);
    }, 400);
}

function abrirModalRespostaCoordenador(texto) {
    const area = document.getElementById('modal-resposta-corpo');
    const modal = document.getElementById('modal-resposta-coordenador');
    if (area && modal) {
        area.innerHTML = texto.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
        modal.classList.add('ativo');
    }
}

window.fecharModalResposta = function() {
    const modal = document.getElementById('modal-resposta-coordenador');
    if (modal) modal.classList.remove('ativo');
};

// =====================================================================
// 4. GRAFO DE TAREFAS & SLIDE-OVER INSPECTOR DRAWER
// =====================================================================
function renderizarGrafoTarefas() {
    const container = document.getElementById('grade-tarefas-bento');
    if (!container) return;

    const projeto = ESTADO_COMANDO.projetos[0];
    container.innerHTML = '';

    projeto.tarefas.forEach(t => {
        const item = document.createElement('div');
        item.style.cssText = 'padding: 10px 14px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: space-between; transition: all 150ms ease;';

        const corEstado = t.estado === 'APROVADA' ? 'var(--emerald-success)' : 'var(--cyan-primary)';
        item.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas ${t.icone}" style="color: ${corEstado};"></i>
                <span style="font-size: 12px; font-weight: 600;">${t.titulo}</span>
            </div>
            <span style="font-family: var(--font-mono); font-size: 10px; color: ${corEstado}; background: rgba(0,229,255,0.08); padding: 2px 6px; border-radius: 4px;">
                ${t.estado}
            </span>
        `;

        item.addEventListener('mouseenter', () => item.style.borderColor = 'var(--border-accent)');
        item.addEventListener('mouseleave', () => item.style.borderColor = 'var(--border-subtle)');
        item.addEventListener('click', () => abrirInspectorDrawer(t));

        container.appendChild(item);
    });
}

function abrirInspectorDrawer(tarefa) {
    ESTADO_COMANDO.tarefaInspecionada = tarefa;
    const overlay = document.getElementById('inspector-overlay');
    const idEl = document.getElementById('drawer-tarefa-id');
    const tituloEl = document.getElementById('drawer-tarefa-titulo');
    const agenteEl = document.getElementById('drawer-tarefa-agente');
    const descEl = document.getElementById('drawer-tarefa-desc');
    const criteriosEl = document.getElementById('drawer-criterios-lista');
    const artefatosEl = document.getElementById('drawer-artefatos-lista');
    const auditoriaEl = document.getElementById('drawer-timeline-auditoria');

    if (idEl) idEl.textContent = tarefa.id;
    if (tituloEl) tituloEl.textContent = tarefa.titulo;
    if (agenteEl) agenteEl.textContent = tarefa.agenteNome || tarefa.agente;
    if (descEl) descEl.textContent = tarefa.descricao || tarefa.titulo;

    if (criteriosEl) {
        criteriosEl.innerHTML = '';
        (tarefa.criterios || [{ texto: 'Critério de integridade técnica aprovado', cumprido: true }]).forEach(c => {
            const li = document.createElement('li');
            li.className = `criterio-item ${c.cumprido ? 'cumprido' : ''}`;
            li.innerHTML = `<i class="fas ${c.cumprido ? 'fa-check-circle' : 'fa-circle-notch'}"></i><span>${c.texto}</span>`;
            criteriosEl.appendChild(li);
        });
    }

    if (artefatosEl) {
        artefatosEl.innerHTML = '';
        (tarefa.artefatos || ['manifesto_homologacao.json']).forEach(art => {
            const chip = document.createElement('div');
            chip.style.cssText = 'padding: 4px 10px; background: rgba(0,229,255,0.08); border: 1px solid rgba(0,229,255,0.25); border-radius: 4px; font-family: var(--font-mono); font-size: 11px; color: var(--cyan-primary); display: inline-flex; align-items: center; gap: 6px; margin: 0 4px 4px 0;';
            chip.innerHTML = `<i class="fas fa-file-code"></i> ${art}`;
            artefatosEl.appendChild(chip);
        });
    }

    if (auditoriaEl) {
        auditoriaEl.innerHTML = '';
        (tarefa.auditoria || [{ autor: 'Coordenador Geral', data: 'Hoje', nota: 'Conferência técnica realizada.' }]).forEach(aud => {
            const ponto = document.createElement('div');
            ponto.className = 'timeline-ponto';
            ponto.innerHTML = `
                <div class="timeline-hora">${aud.data}</div>
                <div class="timeline-autor">${aud.autor}</div>
                <div class="timeline-nota">${aud.nota}</div>
            `;
            auditoriaEl.appendChild(ponto);
        });
    }

    if (overlay) overlay.classList.add('ativo');
}

window.fecharInspectorDrawer = function() {
    const overlay = document.getElementById('inspector-overlay');
    if (overlay) overlay.classList.remove('ativo');
};

window.homologarTarefaAtual = function() {
    if (!ESTADO_COMANDO.tarefaInspecionada) return;
    ESTADO_COMANDO.tarefaInspecionada.estado = 'APROVADA';
    renderizarGrafoTarefas();
    fecharInspectorDrawer();
    exibirToastSucesso('Tarefa homologada com sucesso pelo Diretor Douglas!');
};

window.solicitarAjusteTarefaAtual = function() {
    if (!ESTADO_COMANDO.tarefaInspecionada) return;
    ESTADO_COMANDO.tarefaInspecionada.estado = 'PENDENTE_CORRECAO';
    renderizarGrafoTarefas();
    fecharInspectorDrawer();
    exibirToastSucesso('Apontamento de correção registrado na esteira.');
};

// =====================================================================
// NAVEGAÇÃO ENTRE VISÕES
// =====================================================================
function configurarNavegacao() {
    const botoes = document.querySelectorAll('.nav-item-btn[data-visao]');
    botoes.forEach(btn => {
        btn.addEventListener('click', () => {
            const visao = btn.getAttribute('data-visao');
            ESTADO_COMANDO.visaoAtual = visao;

            botoes.forEach(b => b.classList.remove('ativo'));
            btn.classList.add('ativo');

            document.querySelectorAll('.visao-bloco').forEach(v => {
                if (v.id === `visao-${visao}`) {
                    v.style.display = 'flex';
                } else {
                    v.style.display = 'none';
                }
            });

            const mapaTitulos = {
                'bento': 'Magic Bento // Cockpit Executivo',
                'chat': 'Terminal do Diretor',
                'agentes': 'Radar dos 7 Especialistas'
            };
            const breadcrumb = document.getElementById('breadcrumb-secao');
            if (breadcrumb) breadcrumb.textContent = mapaTitulos[visao] || visao;
        });
    });
}

// Telemetria do Servidor
async function carregarTelemetriaRealServidor() {
    try {
        const res = await fetch('/api/status/infraestrutura');
        if (res.ok) {
            const data = await res.json();
            const badge = document.getElementById('telemetria-badge-topo');
            if (badge && data.servidor) {
                badge.innerHTML = `<span class="ping-dot"></span> HOST: ${data.servidor.host}:${data.servidor.porta} // POSTGRESQL PRONTO`;
            }
        }
    } catch (e) {
        console.log('Telemetria local pronta.');
    }
}

function exibirToastSucesso(msg) {
    const toast = document.createElement('div');
    toast.style.cssText = 'position: fixed; bottom: 24px; right: 24px; background: #0D0F16; border: 1px solid #00E5FF; color: #FFF; padding: 12px 20px; border-radius: 8px; font-size: 13px; font-weight: 600; box-shadow: 0 10px 30px rgba(0,229,255,0.3); z-index: 999; display: flex; align-items: center; gap: 10px; animation: slideIn 0.3s ease;';
    toast.innerHTML = `<i class="fas fa-check-circle" style="color: #00E5FF;"></i> ${msg}`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.4s ease';
        setTimeout(() => toast.remove(), 400);
    }, 3200);
}



// =====================================================================
// FUNDO ANIMADO DOTGRID NO CLUSTER DOS 7 AGENTES ESPECIALISTAS
// =====================================================================
function inicializarDotGridAgentes() {
    const container = document.getElementById('dotgrid-agentes');
    if (!container || !window.criarDotGrid) return;

    window.criarDotGrid(container, {
        baseColor: "#1e293b",
        activeColor: "#00E5FF",
        shape: "circle",
        dotSize: 5,
        gap: 18,
        proximity: 160,
        strength: 1.2,
        bounce: 0.6,
        tension: 0.4,
        returnDuration: 0.8,
        shockRadius: 340,
        shockStrength: 5,
        swell: 0.8,
        stretch: 0.5,
        glow: 0.6,
        fade: 0.15,
        intro: true
    });
}

// =====================================================================
// INSPETOR DETALHADO DO AGENTE SELECIONADO NO CLUSTER 3D
// =====================================================================
const agentesData = [
    {
        codigo: 'AGT-01 // OPERAÇÃO & ENTRADA',
        status: 'ATIVO EM TEMPO REAL',
        titulo: 'TRIAGEM COMERCIAL',
        role: 'Acolhimento e Qualificação Instantânea no WhatsApp',
        desc: 'Recebe e acolhe contatos que chegam pelos canais oficiais da empresa em menos de 20 segundos. Identifica com precisão cirúrgica a intenção de compra, filtra curiosos e classifica o nível de prioridade comercial antes de acionar a equipe humana.',
        sla: '< 20 SEGUNDOS',
        stack: 'CLOUD API & N8N'
    },
    {
        codigo: 'AGT-02 // LIDERANÇA & GOVERNANÇA',
        status: 'LÍDER DA ESTEIRA',
        titulo: 'COORDENADOR GERAL',
        role: 'Orquestração do Roadmap e Auditoria de Entregas',
        desc: 'Recebe diretrizes da Diretoria Executiva (Douglas Paz), decompõe metas comerciais em tarefas técnicas acionáveis, distribui na esteira e audita o resultado de cada entrega antes de ir para homologação final.',
        sla: 'TEMPO REAL',
        stack: 'ORQUESTRADOR NATIVO'
    },
    {
        codigo: 'AGT-03 // DESIGN & AUTORIDADE',
        status: 'ATIVO',
        titulo: 'ARQUITETO DE PRESENÇA',
        role: 'Design de Interfaces Autorais & Hierarquia de Conversão',
        desc: 'Projeta a arquitetura de informação, jornada visual do usuário e wireframes de alto padrão. Elimina o aspecto genérico de templates de IA para posicionar a marca do cliente como líder indiscutível do seu segmento.',
        sla: 'SPRINT ÁGIL',
        stack: 'FIGMA & UI/UX'
    },
    {
        codigo: 'AGT-04 // PERSUASÃO & BRANDING',
        status: 'ATIVO',
        titulo: 'COPYWRITER DE PRESTÍGIO',
        role: 'Mensagem de Valor, Storytelling e Copywriting Comercial',
        desc: 'Desenvolve argumentos de vendas fundamentados em psicologia de decisão e princípios AIDA. Escreve títulos impactantes, abordagens de WhatsApp sem atrito e propostas comerciais que convertem com tickets mais altos.',
        sla: 'SPRINT ÁGIL',
        stack: 'COPYWRITING & STORYTELLING'
    },
    {
        codigo: 'AGT-05 // CÓDIGO & PERFORMANCE',
        status: 'ATIVO',
        titulo: 'ENGENHEIRO FRONT-END',
        role: 'Desenvolvimento Web Ultra-Rápido & Motion Design',
        desc: 'Codifica interfaces modernas em HTML5, CSS3 avançado e Vanilla JavaScript puro a 60 FPS. Garante carregamento instantâneo no celular do comprador (< 1.5s) e interações fluidas sem bibliotecas pesadas.',
        sla: '< 1.5s NO CELULAR',
        stack: 'HTML5 / CSS3 / VANILLA JS'
    },
    {
        codigo: 'AGT-06 // INFRAESTRUTURA & APIS',
        status: 'ATIVO',
        titulo: 'ENGENHEIRO DE INTEGRAÇÕES',
        role: 'Conexão de Webhooks, APIs Oficiais e Automação n8n',
        desc: 'Integra a API oficial do WhatsApp Business, Webhooks seguros com assinatura criptográfica HMAC SHA-256 e fluxos n8n para fluxo de dados ininterrupto entre o site, o CRM e o celular da equipe comercial.',
        sla: 'RESILIENTE 24/7',
        stack: 'REST API & DOCKER'
    },
    {
        codigo: 'AGT-07 // TELEMETRIA & AUDITORIA',
        status: 'MONITORANDO',
        titulo: 'AUDITOR DE TELEMETRIA',
        role: 'Inteligência de Dados e Monitoramento de Gargalos',
        desc: 'Mede cada evento comercial ao vivo: tempo de resposta da equipe, taxa de desistência por etapa e faturamento recuperado. Alimenta o Cockpit Executivo com dados reais para orientar decisões da diretoria.',
        sla: 'CONTÍNUO',
        stack: 'DASHBOARD & TELEMETRIA'
    }
];

window.atualizarInspetorAgente = function(idx) {
    const card = document.getElementById('agent-inspector-card');
    if (!card) return;
    const data = agentesData[idx] || agentesData[0];

    card.style.opacity = '0.35';
    card.style.transform = 'translateY(6px)';

    setTimeout(() => {
        const b = document.getElementById('insp-badge');
        const s = document.getElementById('insp-status');
        const t = document.getElementById('insp-title');
        const r = document.getElementById('insp-role');
        const d = document.getElementById('insp-desc');
        const sla = document.getElementById('insp-sla');
        const stack = document.getElementById('insp-stack');

        if (b) b.textContent = data.codigo;
        if (s) s.innerHTML = '<i class="fas fa-circle" style="font-size: 7px;"></i> ' + data.status;
        if (t) t.textContent = data.titulo;
        if (r) r.textContent = data.role;
        if (d) d.textContent = data.desc;
        if (sla) sla.textContent = data.sla;
        if (stack) stack.textContent = data.stack;

        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 150);
};


/* =====================================================================
 * PACOTE DE MOTORES DE DINAMISMO & SCROLL SYNC (V15)
 * ===================================================================== */

// 1. NAVBAR SCROLL SPY EM TEMPO REAL COM INDICADOR MORPHIC
function inicializarNavbarScrollSpy() {
    const nav = document.getElementById('morphic-navbar');
    const track = document.getElementById('nav-track') || document.getElementById('morphic-track');
    const pill = document.getElementById('nav-pill') || document.getElementById('morphic-pill');
    const links = document.querySelectorAll('.morphic-nav-link');
    if (!nav || !track || !pill || !links.length) return;

    function moverPill(el) {
        if (!el) return;
        const trackRect = track.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        const left = elRect.left - trackRect.left;
        const width = elRect.width;

        pill.style.width = width + 'px';
        pill.style.transform = 'translateX(' + left + 'px)';
        pill.style.opacity = '1';
    }

    const sections = Array.from(links).map(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
            return { link, el: document.querySelector(href) };
        }
        return null;
    }).filter(s => s && s.el);

    function atualizarSpy() {
        const scrollY = window.scrollY;

        // Navbar scrolled state
        if (scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        const triggerPoint = window.innerHeight * 0.35;
        let currentSection = null;

        for (let i = sections.length - 1; i >= 0; i--) {
            const rect = sections[i].el.getBoundingClientRect();
            if (rect.top <= triggerPoint) {
                currentSection = sections[i];
                break;
            }
        }

        if (currentSection) {
            links.forEach(l => l.classList.remove('active'));
            currentSection.link.classList.add('active');
            moverPill(currentSection.link);
        }
    }

    window.addEventListener('scroll', atualizarSpy, { passive: true });
    window.addEventListener('resize', atualizarSpy, { passive: true });
    setTimeout(atualizarSpy, 250);

    links.forEach(link => {
        link.addEventListener('mouseenter', () => moverPill(link));
        link.addEventListener('click', () => {
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            moverPill(link);
        });
    });

    track.addEventListener('mouseleave', () => {
        const activeLink = track.querySelector('.morphic-nav-link.active');
        if (activeLink) moverPill(activeLink);
    });
}

// 2. FUNIL SCROLL INTERATIVO: PREENCHIMENTO EM CASCATA & CONTADORES
function inicializarFunilScrollInterativo() {
    const container = document.querySelector('.funil-pipeline-container');
    if (!container) return;

    const rows = container.querySelectorAll('.funil-etapa-row');
    rows.forEach(row => {
        const bar = row.querySelector('.funil-barra-progresso');
        if (bar) {
            bar.style.width = '0%';
            bar.style.transition = 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        }
    });

    let executado = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !executado) {
                executado = true;
                rows.forEach((row, idx) => {
                    const targetWidth = row.getAttribute('data-target-width') || '50%';
                    const bar = row.querySelector('.funil-barra-progresso');
                    const badge = row.querySelector('.funil-pct-badge');
                    const targetNum = parseInt(targetWidth, 10) || 50;

                    setTimeout(() => {
                        if (bar) bar.style.width = targetWidth;

                        if (badge) {
                            let start = 0;
                            const duration = 1200;
                            const startTime = performance.now();

                            function step(now) {
                                const elapsed = now - startTime;
                                const progress = Math.min(elapsed / duration, 1);
                                const easeVal = 1 - Math.pow(1 - progress, 3);
                                const current = Math.round(start + (targetNum - start) * easeVal);
                                badge.textContent = current + '%';

                                if (progress < 1) {
                                    requestAnimationFrame(step);
                                } else {
                                    badge.textContent = targetNum + '%';
                                    row.classList.add('is-charged');
                                }
                            }
                            requestAnimationFrame(step);
                        }
                    }, idx * 160);
                });
            }
        });
    }, { threshold: 0.2 });

    observer.observe(container);
}

// 3. PARALLAX FLUIDO NAS IMAGENS AO ROLAR
function inicializarParallaxImagens() {
    const heroBusto = document.querySelector('.hero-busto-center-wrap .hero-busto-img');
    const arteEscultura = document.querySelector('.arte-escultura-img');
    const artePerfil = document.querySelector('.arte-perfil-img');

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const vh = window.innerHeight;

                if (heroBusto && scrollY < vh * 1.6) {
                    const offset = scrollY * 0.12;
                    heroBusto.style.transform = 'translateY(' + offset.toFixed(1) + 'px)';
                }

                if (arteEscultura) {
                    const rect = arteEscultura.getBoundingClientRect();
                    if (rect.top < vh && rect.bottom > 0) {
                        const offset = (rect.top - vh / 2) * 0.08;
                        arteEscultura.style.transform = 'translateY(' + offset.toFixed(1) + 'px)';
                    }
                }

                if (artePerfil) {
                    const rect = artePerfil.getBoundingClientRect();
                    if (rect.top < vh && rect.bottom > 0) {
                        const offset = (rect.top - vh / 2) * 0.08;
                        artePerfil.style.transform = 'translateY(' + offset.toFixed(1) + 'px)';
                    }
                }

                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// 4. ATIVAÇÃO DINÂMICA DA TIMELINE DO MÉTODO VIDE
function inicializarMetodoTimelineScroll() {
    const timeline = document.querySelector('.metodo-timeline');
    if (!timeline) return;

    const cards = timeline.querySelectorAll('.metodo-etapa-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                cards.forEach((card, idx) => {
                    setTimeout(() => {
                        card.classList.add('is-step-active');
                    }, idx * 130);
                });
            }
        });
    }, { threshold: 0.25 });

    observer.observe(timeline);
}

// 5. 3D MAGNETIC TILT NOS CARDS AO PASSAR O MOUSE
function inicializarCardTilt3D() {
    if (window.matchMedia('(hover: none)').matches) return;

    const cards = document.querySelectorAll(
        '.problema-card, .metodo-etapa-card, .dif-col-card, .perfil-card, .frente-card, .accordion-panel, .simulador-neo-display-box, .simulador-neo-control-box'
    );

    cards.forEach(card => {
        card.style.transition = 'transform 0.15s ease-out, box-shadow 0.25s ease, border-color 0.25s ease';

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = 'perspective(1000px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) translateY(-3px) scale3d(1.015, 1.015, 1.015)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';
        });
    });
}

// 6. CONTADORES NUMÉRICOS DINÂMICOS NO SCROLL
function inicializarContadoresScroll() {
    const simuladorBox = document.querySelector('.simulador-neo-display-box');
    if (!simuladorBox) return;

    let animado = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animado) {
                animado = true;
                animarValor('#disp-anual-neo', 0, 384000, 1500, 'R$ ', ',00', true);
                animarValor('#disp-mensal-neo', 0, 32000, 1500, 'R$ ', ',00', true);
                animarValor('#disp-perdidos-neo', 0, 52, 1200, '', ' contatos', false);
                animarValor('#disp-resgatados-neo', 0, 8, 1200, '', ' vendas', false);
            }
        });
    }, { threshold: 0.25 });

    observer.observe(simuladorBox);

    function animarValor(sel, start, end, duration, prefix, suffix, isCurrency) {
        const el = document.querySelector(sel);
        if (!el) return;
        const startTime = performance.now();

        function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeVal = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (end - start) * easeVal);

            if (isCurrency) {
                el.textContent = prefix + current.toLocaleString('pt-BR') + suffix;
            } else {
                el.textContent = prefix + current + suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    }
}

// 7. HUD DE TELEMETRIA EM TEMPO REAL NO NÚCLEO 3D
function inicializarLiveTelemetryHUD() {
    const logEl = document.getElementById('telemetry-hud-log-text');
    if (!logEl) return;

    const streams = [
        'LEAD QUALIFICADO NO WHATSAPP :: TICKET > R$ 8.000 :: TEMPO RESPOSTA 14s',
        'AGT-01 ENCAMINHOU FICHA COMPLETA PARA VENDEDOR HUMANO :: 0 LATÊNCIA',
        'AGT-04 DISPAROU RÉGUA ATIVA DE REATIVAÇÃO :: 3 ORÇAMENTOS RESGATADOS',
        'COCKPIT EXECUTIVO ATUALIZADO :: RECEITA PROTEGIDA HOJE: R$ 86.400,00',
        'TELEMETRIA 3D CONECTADA :: CLOUD API & N8N OPERANDO EM 100% DE CAPACIDADE'
    ];

    let index = 0;
    setInterval(() => {
        logEl.style.opacity = '0';
        logEl.style.transform = 'translateY(4px)';

        setTimeout(() => {
            index = (index + 1) % streams.length;
            logEl.textContent = streams[index];
            logEl.style.opacity = '1';
            logEl.style.transform = 'translateY(0)';
        }, 220);
    }, 2800);
}

// 8. DISPARO GERAL DOS MOTORES DINÂMICOS
document.addEventListener('DOMContentLoaded', () => {
    try { inicializarNavbarScrollSpy(); } catch(e) { console.warn(e); }
    try { inicializarFunilScrollInterativo(); } catch(e) { console.warn(e); }
    try { inicializarParallaxImagens(); } catch(e) { console.warn(e); }
    try { inicializarMetodoTimelineScroll(); } catch(e) { console.warn(e); }
    try { inicializarCardTilt3D(); } catch(e) { console.warn(e); }
    try { inicializarContadoresScroll(); } catch(e) { console.warn(e); }
    try { inicializarLiveTelemetryHUD(); } catch(e) { console.warn(e); }
});
