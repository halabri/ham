'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { ParticleBackgroundProps, PARTICLE_DENSITY_CONFIG } from '@/types/components';

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  density = 'medium',
  animationSpeed = 'medium',
  respectReducedMotion = true,
  className = '',
  ...props
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    if (!respectReducedMotion) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [respectReducedMotion]);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generate particles based on configuration
  const particles = useMemo(() => {
    const config = PARTICLE_DENSITY_CONFIG[density];
    let particleCount = config.count;

    // Reduce particle count on mobile for performance
    if (isMobile) {
      particleCount = Math.floor(particleCount * 0.6);
    }

    return Array.from({ length: particleCount }, (_, index) => {
      const size = Math.random() * config.maxSize + 1;
      const isSparkle = Math.random() < config.sparkleFrequency;
      
      return {
        id: index,
        size,
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDelay: Math.random() * config.animationDuration,
        isSparkle,
      };
    });
  }, [density, isMobile]);

  const containerClasses = [
    'particle-background',
    `particle-density-${density}`,
    `animation-${animationSpeed}`,
    reducedMotion ? 'reduced-motion' : '',
    isMobile ? 'mobile-optimized' : 'desktop-optimized',
    'gpu-accelerated',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={containerClasses}
      role="presentation"
      aria-hidden="true"
      {...props}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`particle ${particle.isSparkle ? 'sparkle' : ''}`}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.animationDelay}ms`,
          }}
        />
      ))}
    </div>
  );
};