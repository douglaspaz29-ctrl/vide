import React, { useRef, useEffect } from 'react';
import '../css/FramePlayer.css';

export default function FramePlayer({
    totalFrames = 299,
    framePrefix = 'assets/frames/ezgif-frame-',
    frameSuffix = '.jpg',
    padLength = 3,
    fps = 30,
    autoplay = true,
    loop = true,
    fit = 'contain',
    interactiveScrub = true,
    className = '',
    style
}) {
    const containerRef = useRef(null);
    const instanceRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current || !window.criarFramePlayer) return;
        instanceRef.current = window.criarFramePlayer(containerRef.current, {
            totalFrames,
            framePrefix,
            frameSuffix,
            padLength,
            fps,
            autoplay,
            loop,
            fit,
            interactiveScrub
        });

        return () => {
            instanceRef.current?.destroy();
        };
    }, [totalFrames, framePrefix, frameSuffix, padLength, fps, autoplay, loop, fit, interactiveScrub]);

    return (
        <div 
            ref={containerRef} 
            className={`frame-player-container ${className}`.trim()} 
            style={style} 
        />
    );
}
