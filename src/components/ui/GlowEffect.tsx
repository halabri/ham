'use client';

import React, { useState, useEffect } from 'react';
import { GlowEffectProps, GLOW_INTENSITY_CONFIG } from '@/types/components';

export const GlowEffect: React.FC<GlowEffectProps> = ({
  intensity = 'subtle',
  color = '#ffffff',
  element = 'text',
  children,
  className = '',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Validate color format (basic validation)
  const isValidColor = (colorValue: string): boolean => {
    const colorRegex = /^(#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}|rgb\(.*\)|rgba\(.*\)|hsl\(.*\)|hsla\(.*\))$/;
    return colorRegex.test(colorValue) || CSS.supports('color', colorValue);
  };

  const glowColor = isValidColor(color) ? color : '#ffffff';
  const config = GLOW_INTENSITY_CONFIG[intensity];

  const handleMouseEnter = () => {
    if (!reducedMotion) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const containerClasses = [
    'glow-effect',
    `glow-${element}`,
    `glow-intensity-${intensity}`,
    isHovered ? 'glow-hover' : '',
    reducedMotion ? 'reduced-motion' : '',
    className,
  ].filter(Boolean).join(' ');

  const glowStyles = {
    '--glow-color': glowColor,
    '--glow-blur': `${config.shadowBlur}px`,
    '--glow-spread': `${config.shadowSpread}px`,
    '--glow-intensity': isHovered ? config.hoverMultiplier : 1,
  } as React.CSSProperties;

  return (
    <div
      className={containerClasses}
      style={glowStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
};