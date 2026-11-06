/**
 * =====================================================================
 * VIDE — Sistemas de Crescimento Comercial
 * Interatividade da Landing Page & Janela de Auditoria em Tempo Real
 * =====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // Rolagem suave para navegação por âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.length > 1) {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    console.log('[VIDE] Landing Page de Alta Precisão carregada.');
});

/**
 * Alternância Dinâmica de Cenários na Janela de Interface
 * @param {'antes' | 'depois'} modo 
 */
function alternarVisaoAuditoria(modo) {
    const botoes = document.querySelectorAll('.aba-janela-btn');
    botoes.forEach(btn => btn.classList.remove('ativa'));

    const balaoResposta = document.getElementById('balao-resposta-equipe');
    const alertaAtrito = document.getElementById('caixa-alerta-atrito');
    const corpoSolucao = document.getElementById('corpo-prescricao-solucao');
    const tituloPrescricao = document.getElementById('titulo-prescricao-box');
    const tempoRegistro = document.getElementById('tempo-registro');

    // Métricas
    const valTempo = document.getElementById('val-tempo-resposta');
    const statusTempo = document.getElementById('status-tempo-resposta');
    const valTaxa = document.getElementById('val-taxa-conversao');
    const statusTaxa = document.getElementById('status-taxa-conversao');
    const valFollow = document.getElementById('val-followup-ativo');
    const statusFollow = document.getElementById('status-followup-ativo');
    const valImpacto = document.getElementById('val-impacto-financeiro');
    const statusImpacto = document.getElementById('status-impacto-financeiro');

    if (modo === 'depois') {
        botoes[1].classList.add('ativa');

        tempoRegistro.textContent = 'RESPOSTA INSTANTÂNEA EM 1.5 MIN';

        balaoResposta.className = 'balao-conversa';
        balaoResposta.style.alignSelf = 'flex-end';
        balaoResposta.style.background = 'rgba(0, 240, 255, 0.08)';
        balaoResposta.style.border = '1px solid rgba(0, 240, 255, 0.4)';
        balaoResposta.style.color = '#FFFFFF';
        balaoResposta.innerHTML = `
            <span class="autor" style="color: var(--ciano-eletrico); font-family: var(--fonte-mono); font-size: 10px; margin-bottom: 6px; display: block;">RESPOSTA COM O ROTEIRO VIDE (APÓS 1.5 MIN)</span>
            "Olá! Que excelente iniciativa buscar esse cuidado. Cada caso depende da estrutura óssea e estética individual avaliada pelo Dr. Marcos em escaneamento 3D antes de qualquer orçamento. Me conta: você já realizou algum exame recente ou tem sentido algum incômodo específico?"
        `;

        alertaAtrito.className = 'banner-atrito-detectado';
        alertaAtrito.style.background = 'rgba(0, 240, 160, 0.12)';
        alertaAtrito.style.borderLeftColor = 'var(--sucesso-verde)';
        alertaAtrito.innerHTML = `
            <div class="banner-atrito-titulo" style="color: var(--sucesso-verde);">
                <i class="fas fa-check-circle"></i> CONVERSÃO QUALIFICADA • ENGAJAMENTO IMEDIATO
            </div>
            <div class="banner-atrito-desc" style="color: #D4FFE8;">
                O lead sentiu acolhimento profissional, autoridade médica e explicou o incômodo. Agendamento de avaliação presencial concluído para a mesma semana. Follow-up automatizado via WhatsApp para confirmação em 24h.
            </div>
        `;

        tituloPrescricao.textContent = 'Validação dos Resultados Obtidos';
        corpoSolucao.innerHTML = `
            <span class="tag-status" style="color: var(--sucesso-verde);">STATUS: INTERVENÇÃO HOMOLOGADA</span>
            <p>
                Roteiro de triagem e ancoragem de autoridade clínica implementado com sucesso na recepção. O índice de rejeição ao preço foi reduzido a menos de 8%.
            </p>
        `;

        // Atualização dos números
        valTempo.textContent = '1.5 min';
        statusTempo.textContent = 'Excelente (Alta prontidão)';
        statusTempo.style.color = 'var(--sucesso-verde)';

        valTaxa.textContent = '18.7%';
        statusTaxa.textContent = '+345% de aumento real';
        statusTaxa.style.color = 'var(--sucesso-verde)';

        valFollow.textContent = '100%';
        statusFollow.textContent = 'Régua 24h e 72h ativa';
        statusFollow.style.color = 'var(--sucesso-verde)';

        valImpacto.textContent = '+R$ 51.000';
        valImpacto.style.color = 'var(--sucesso-verde)';
        statusImpacto.textContent = 'Faturamento resgatado / mês';
        statusImpacto.style.color = 'var(--sucesso-verde)';

    } else {
        botoes[0].classList.add('ativa');

        tempoRegistro.textContent = 'REGISTRADO HÁ 18 MIN';

        balaoResposta.className = 'balao-conversa atendente-antigo';
        balaoResposta.style.alignSelf = 'flex-end';
        balaoResposta.style.background = 'rgba(255, 77, 77, 0.08)';
        balaoResposta.style.border = '1px solid rgba(255, 77, 77, 0.3)';
        balaoResposta.style.color = '#FFA3A3';
        balaoResposta.innerHTML = `
            <span class="autor" style="color: var(--alerta-coral); font-family: var(--fonte-mono); font-size: 10px; margin-bottom: 6px; display: block;">RESPOSTA DA RECEPÇÃO (APÓS 48 MIN DE ESPERA)</span>
            "Boa tarde! Fica R$ 8.500 à vista no PIX ou até 10x no cartão de crédito. Se quiser podemos marcar."
        `;

        alertaAtrito.className = 'banner-atrito-detectado';
        alertaAtrito.style.background = 'rgba(255, 77, 77, 0.12)';
        alertaAtrito.style.borderLeftColor = 'var(--alerta-coral)';
        alertaAtrito.innerHTML = `
            <div class="banner-atrito-titulo" style="color: var(--alerta-coral);">
                <i class="fas fa-exclamation-triangle"></i> FALHA GRAVE: SILÊNCIO PÓS-PREÇO DETECTADO
            </div>
            <div class="banner-atrito-desc" style="color: #FFD4D4;">
                Preço emitido sem acolhimento de expectativas e sem ancoragem de autoridade médica. Lead visualizou e não respondeu há mais de 48 horas. Nenhuma régua de follow-up foi ativada.
            </div>
        `;

        tituloPrescricao.textContent = 'Reestruturação Imediata da Conversa';
        corpoSolucao.innerHTML = `
            <span class="tag-status" style="color: var(--ciano-eletrico);">ROTEIRO CORRETIVO SUGERIDO:</span>
            <p>
                "Olá! Que excelente iniciativa buscar esse cuidado. Antes de passarmos qualquer estimativa de valores, cada caso depende da estrutura óssea e estética individual avaliada pelo Dr. Marcos em escaneamento 3D. Me conta: você já realizou algum exame recente ou tem sentido algum incômodo específico?"
            </p>
        `;

        // Retorna para valores de atrito
        valTempo.textContent = '48 min';
        statusTempo.textContent = 'Crítico (Perda de urgência)';
        statusTempo.style.color = 'var(--alerta-coral)';

        valTaxa.textContent = '4.2%';
        statusTaxa.textContent = '-68% vs potencial';
        statusTaxa.style.color = 'var(--alerta-coral)';

        valFollow.textContent = '0%';
        statusFollow.textContent = 'Lead abandonado';
        statusFollow.style.color = 'var(--alerta-coral)';

        valImpacto.textContent = 'R$ 38.250';
        valImpacto.style.color = 'var(--ciano-eletrico)';
        statusImpacto.textContent = 'Perdidos por mês';
        statusImpacto.style.color = 'var(--ciano-eletrico)';
    }
}
