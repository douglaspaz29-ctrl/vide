import React, { useRef, useEffect } from 'react';
import '../css/Scanner.css';

export default function Scanner({
    color1 = "#5227FF",
    color2 = "#FF9FFC",
    color3 = "#FFFFFF",
    speed = 0.5,
    sweepSpeed = 0.25,
    sweepWidth = 1.6,
    trail = 0.5,
    ripple = 0.22,
    bandDensity = 11,
    glow = 0.6,
    scanDirection = "vertical",
    colorSpread = 0.7,
    scanline = true,
    scanlineIntensity = 0.5,
    mouseInteraction = true,
    clickEffect = "ping",
    reverse = false,
    scale = 1.5,
    frequency = 2,
    lineWidth = 1.2,
    brightness = 1,
    vignette = 0.3,
    grain = true,
    grainIntensity = 0.04,
    opacity = 1,
    mouseMode = "repel",
    mouseRadius = 0.5,
    mouseStrength = 0.7,
    intro = true,
    lightMode = false,
    className = "",
    style = {}
}) {
    const canvasRef = useRef(null);
    const instanceRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current || !window.criarScanner) return;
        instanceRef.current = window.criarScanner(canvasRef.current, {
            color1, color2, color3, speed, sweepSpeed, sweepWidth, trail,
            ripple, bandDensity, glow, scanDirection, colorSpread, scanline,
            scanlineIntensity, mouseInteraction, clickEffect, reverse, scale,
            frequency, lineWidth, brightness, vignette, grain, grainIntensity,
            opacity, mouseMode, mouseRadius, mouseStrength, intro, lightMode
        });
    }, [
        color1, color2, color3, speed, sweepSpeed, sweepWidth, trail,
        ripple, bandDensity, glow, scanDirection, colorSpread, scanline,
        scanlineIntensity, mouseInteraction, clickEffect, reverse, scale,
        frequency, lineWidth, brightness, vignette, grain, grainIntensity,
        opacity, mouseMode, mouseRadius, mouseStrength, intro, lightMode
    ]);

    return (
        <div className={`scanner-container ${className}`.trim()} style={style}>
            <canvas ref={canvasRef} className="scanner-canvas" aria-hidden="true" />
        </div>
    );
}
