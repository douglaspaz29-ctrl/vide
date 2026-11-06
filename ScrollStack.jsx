'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import '../css/ScrollStack.css';

export const ScrollStackItem = ({ children, className = '', itemClassName = '' }) => {
  return (
    <div className={`scroll-stack-card ${itemClassName} ${className}`.trim()}>
      {children}
    </div>
  );
};

export default function ScrollStack({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.035,
  itemStackDistance = 18,
  stackTop = 36,
  baseScale = 0.88,
  blurAmount = 0
}) {
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = scroller.querySelectorAll('.scroll-stack-card');
    const scrollTop = scroller.scrollTop;

    let currentActive = 0;
    cards.forEach((card, i) => {
      const cardTop = card.offsetTop - scrollTop;
      const stickyPoint = stackTop + (i * itemStackDistance);
      if (cardTop <= stickyPoint + 2) {
        currentActive = i;
      }
    });

    cards.forEach((card, i) => {
      const cardTop = card.offsetTop - scrollTop;
      const stickyPoint = stackTop + (i * itemStackDistance);
      if (cardTop <= stickyPoint + 1) {
        const depth = Math.max(0, currentActive - i);
        const scale = Math.max(baseScale, 1 - depth * itemScale);
        const brightness = Math.max(0.5, 1 - depth * 0.08);
        card.style.transform = `scale(${scale})`;
        card.style.filter = `brightness(${brightness})`;
      } else {
        card.style.transform = 'scale(1)';
        card.style.filter = 'brightness(1)';
      }
    });

    setActiveIndex(currentActive);
  }, [itemScale, itemStackDistance, stackTop, baseScale]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => scroller.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div ref={scrollerRef} className={`scroll-stack-container ${className}`.trim()}>
      <div className="scroll-stack-hint">
        <span><i className="fas fa-layer-group"></i> FLUXO DE EXECUÇÃO EM GRAFO DAG // 7 AGENTES</span>
        <span style={{ color: '#00E5FF', fontWeight: 700 }}>
          {String(activeIndex + 1).padStart(2, '0')} / {String(React.Children.count(children)).padStart(2, '0')}
        </span>
      </div>
      <div className="scroll-stack-inner">
        {React.Children.map(children, (child, idx) => {
          if (!React.isValidElement(child)) return child;
          const stickyOffset = stackTop + idx * itemStackDistance;
          return React.cloneElement(child, {
            style: {
              ...(child.props.style || {}),
              top: `${stickyOffset}px`,
              zIndex: idx + 1
            }
          });
        })}
      </div>
    </div>
  );
}
