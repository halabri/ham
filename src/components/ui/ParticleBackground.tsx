'use client';

import React, { useEffect, useState } from 'react';
import { ParticleBackgroundProps, PARTICLE_DENSITY_CONFIG } from '@/types/components';

// Seeded random number generator for consistent particles
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

interface Particle {
  id: number;
  size: number;
  left: number;
  top: number;
  animationDelay: number;
  isSparkle: boolean;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  density = 'medium',
  animationSpeed = 'medium',
  respectReducedMotion = true,
  className = '',
  ...props
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Set client-side flag after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    if (!respectReducedMotion || !isClient) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [respectReducedMotion, isClient]);

  // Check for mobile device
  useEffect(() => {
    if (!isClient) return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isClient]);

  // Generate particles after hydration with seeded randomness
  useEffect(() => {
    if (!isClient) return;

    const config = PARTICLE_DENSITY_CONFIG[density];
    let particleCount = config.count;

    // Reduce particle count on mobile for performance
    if (isMobile) {
      particleCount = Math.floor(particleCount * 0.6);
    }

    const newParticles = Array.from({ length: particleCount }, (_, index) => {
      const seed = index * 1000; // Use index as seed for consistency
      const size = seededRandom(seed + 1) * config.maxSize + 1;
      const isSparkle = seededRandom(seed + 2) < config.sparkleFrequency;
      
      return {
        id: index,
        size,
        left: seededRandom(seed + 3) * 100,
        top: seededRandom(seed + 4) * 100,
        animationDelay: seededRandom(seed + 5) * config.animationDuration,
        isSparkle,
      };
    });

    setParticles(newParticles);
  }, [density, isMobile, isClient]);

  const containerClasses = [
    'particle-background',
    `particle-density-${density}`,
    `animation-${animationSpeed}`,
    reducedMotion ? 'reduced-motion' : '',
    isMobile ? 'mobile-optimized' : 'desktop-optimized',
    'gpu-accelerated',
    className,
  ].filter(Boolean).join(' ');

  // Don't render particles until client-side hydration is complete
  if (!isClient) {
    return (
      <div
        className={containerClasses}
        role="presentation"
        aria-hidden="true"
        {...props}
      />
    );
  }

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