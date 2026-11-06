import React, { useRef, useEffect } from 'react';

export default function ScrollExpand({
    src = "assets/img/diagnostico_hero.svg",
    alt = "Telemetria de Diagnóstico VIDE",
    title = "Diagnóstico Operacional",
    scrollHint = "Role para expandir o diagnóstico",
    useWindowScroll = true,
    mediaZoom = 1.25,
    startWidth = 78,
    startRadius = 24,
    endRadius = 16,
    scrollDistance = 1.2,
    holdDistance = 0.35,
    smoothing = 0.1,
    overlayScrim = 0.55,
    enabled = true,
    children
}) {
    const wrapperRef = useRef(null);
    const instanceRef = useRef(null);

    useEffect(() => {
        if (!wrapperRef.current || !window.criarScrollExpand) return;
        instanceRef.current = window.criarScrollExpand(wrapperRef.current, {
            src, alt, title, scrollHint, useWindowScroll, mediaZoom,
            startWidth, startRadius, endRadius,
            scrollDistance, holdDistance, smoothing, overlayScrim, enabled
        });
    }, [
        src, alt, title, scrollHint, useWindowScroll, mediaZoom,
        startWidth, startRadius, endRadius,
        scrollDistance, holdDistance, smoothing, overlayScrim, enabled
    ]);

    return React.createElement(
        'div',
        { ref: wrapperRef, className: 'scroll-expand-container' },
        React.createElement(
            'div',
            { className: 'scroll-expand-frame' },
            React.createElement('img', { src, alt, className: 'scroll-expand-media' }),
            React.createElement('div', { className: 'scroll-expand-scrim' }),
            React.createElement('div', { className: 'scroll-expand-content grade-diagnostico-dupla' }, children),
            scrollHint ? React.createElement(
                'div',
                { className: 'scroll-expand-hint' },
                React.createElement('i', { className: 'fas fa-arrows-up-down' }),
                ' ',
                React.createElement('span', null, scrollHint)
            ) : null
        )
    );
}
