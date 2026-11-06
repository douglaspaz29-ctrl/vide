"use client";
import React, { useState, useEffect } from "react";
import "../css/glowing-stars.css";

export const GlowingStarsBackgroundCard = ({
  className = "",
  children,
}) => {
  const [mouseEnter, setMouseEnter] = useState(false);

  return (
    <div
      onMouseEnter={() => setMouseEnter(true)}
      onMouseLeave={() => setMouseEnter(false)}
      className={`glowing-stars-card-root ${className}`}
    >
      <div className="glowing-stars-illustration-wrap">
        <Illustration mouseEnter={mouseEnter} />
      </div>
      <div className="glowing-stars-content-wrap">{children}</div>
    </div>
  );
};

export const GlowingStarsTitle = ({
  className = "",
  children,
}) => {
  return (
    <h3 className={`glowing-stars-title ${className}`}>
      {children}
    </h3>
  );
};

export const GlowingStarsDescription = ({
  className = "",
  children,
}) => {
  return (
    <p className={`glowing-stars-description ${className}`}>
      {children}
    </p>
  );
};

export const Illustration = ({ mouseEnter }) => {
  const stars = 108;
  const columns = 18;

  const [glowingStars, setGlowingStars] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const highlightedStars = Array.from({ length: 6 }, () =>
        Math.floor(Math.random() * stars)
      );
      setGlowingStars(highlightedStars);
    }, 2500);

    return () => clearInterval(interval);
  }, [stars]);

  return (
    <div
      className="glowing-stars-grid-container"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {[...Array(stars)].map((_, starIdx) => {
        const isGlowing = glowingStars.includes(starIdx);
        const delay = (starIdx % 10) * 0.1;
        return (
          <div key={starIdx} className="glowing-star-cell">
            <Star isGlowing={mouseEnter ? true : isGlowing} delay={delay} />
            {mouseEnter && <Glow delay={delay} />}
          </div>
        );
      })}
    </div>
  );
};

const Star = ({ isGlowing, delay }) => {
  return (
    <div
      className={`glowing-star-node ${isGlowing ? "glowing-active" : ""}`}
      style={{
        transitionDelay: `${delay}s`,
      }}
    />
  );
};

const Glow = ({ delay }) => {
  return (
    <div
      className="glowing-star-halo"
      style={{
        animationDelay: `${delay}s`,
      }}
    />
  );
};
