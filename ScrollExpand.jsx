import React, { useRef, useEffect } from 'react';
import '../css/ScrollExpand.css';

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

    return (
        <div ref={wrapperRef} className="scroll-expand-container">
            <div className="scroll-expand-frame">
                <img src={src} alt={alt} className="scroll-expand-media" />
                <div className="scroll-expand-scrim" />
                <div className="scroll-expand-content grade-diagnostico-dupla">
                    {children}
                </div>
                {scrollHint && (
                    <div className="scroll-expand-hint">
                        <i className="fas fa-arrows-up-down"></i> <span>{scrollHint}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
