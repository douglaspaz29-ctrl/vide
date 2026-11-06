'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import '../css/CircularCarousel.css';

export default function CircularCarousel({
  items = [],
  preset = 'cylinder',
  intro = 'rise',
  cardWidth = 292,
  aspectRatio = 1,
  speed = 14,
  captions = true,
  gap = 25,
  tilt = -5,
  curve = 1,
  perspective = 2500,
  autoplay = 'drift',
  interval = 3,
  direction = 'left',
  momentum = 0.6,
  snap = true,
  pauseOnHover = true,
  focusOnClick = true,
  draggable = true,
  parallax = 0.3,
  stretch = 0.5,
  fadeColor = '#106f80',
  depthFade = 0.55,
  innerShade = 0.6,
  cornerRadius = 12
}) {
  const containerRef = useRef(null);
  const [currentAngle, setCurrentAngle] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const itemCount = items.length;
  const angleStep = 360 / Math.max(1, itemCount);
  const chord = cardWidth + gap;
  const radius = Math.max(360, Math.round((chord / 2) / Math.sin(Math.PI / Math.max(1, itemCount))));
  const cardHeight = Math.round(cardWidth / aspectRatio);

  return (
    <div
      ref={containerRef}
      className={`circular-carousel-wrapper ${isDragging ? 'is-dragging' : ''} ${intro === 'rise' ? 'intro-rise' : ''}`}
      style={{ perspective: `${perspective}px`, height: '560px' }}
    >
      <div
        className="circular-carousel-stage"
        style={{ transform: `rotateX(${tilt}deg)` }}
      >
        {items.map((item, idx) => {
          const theta = currentAngle + idx * angleStep;
          let norm = ((theta % 360) + 360) % 360;
          if (norm > 180) norm -= 360;
          const rad = norm * (Math.PI / 180);
          const zNorm = (Math.cos(rad) + 1) / 2;
          const opacity = (1 - depthFade) + depthFade * zNorm;
          const shadeOpacity = (1 - zNorm) * innerShade;

          return (
            <div
              key={item.id || idx}
              className="circular-carousel-card"
              style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                borderRadius: `${cornerRadius}px`,
                transform: `rotateY(${theta}deg) translateZ(${radius}px) rotateY(${curve * -1 * norm * 0.15}deg)`,
                opacity,
                zIndex: Math.round(zNorm * 100)
              }}
            >
              <div
                className="circular-card-shade"
                style={{ backgroundColor: fadeColor, opacity: shadeOpacity }}
              />
              <div className="circular-card-inner">
                <span className={`circular-card-chip ${item.destaque ? 'destaque-gold' : ''}`}>
                  <i className={item.icon || 'fas fa-microchip'}></i> {item.tag || `AGENTE 0${idx + 1}`}
                </span>
                <div className="circular-card-center">
                  <div className="circular-card-icon-wrap">
                    <i className={item.icon || 'fas fa-microchip'}></i>
                  </div>
                  <h4 className="circular-card-title">{item.title}</h4>
                  <div className="circular-card-subtitle">{item.subtitle}</div>
                  <p className="circular-card-desc">{item.desc}</p>
                </div>
                <div className="circular-card-pill">
                  <i className="fas fa-check-circle"></i>
                  <span>{item.entregavel || 'Homologado'}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {captions && items[activeIndex] && (
        <div className="circular-caption-bar">
          <span className="circular-caption-bullet"></span>
          <span className="circular-caption-text">
            AGENTE ATIVO: {items[activeIndex].title} // {items[activeIndex].subtitle}
          </span>
        </div>
      )}
    </div>
  );
}
