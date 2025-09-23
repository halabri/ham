// Component type definitions for fancy glowing dark background home page
export interface ParticleBackgroundProps {
  density?: 'low' | 'medium' | 'high';
  animationSpeed?: 'slow' | 'medium' | 'fast';
  respectReducedMotion?: boolean;
  className?: string;
}

export interface ParticleConfig {
  count: number;
  maxSize: number;
  animationDuration: number;
  sparkleFrequency: number;
}

export interface GlowEffectProps {
  intensity?: 'subtle' | 'medium' | 'strong';
  color?: string;
  element?: 'text' | 'button' | 'border';
  children: React.ReactNode;
  className?: string;
}

export interface GlowConfig {
  shadowBlur: number;
  shadowSpread: number;
  shadowLayers: number;
  hoverMultiplier: number;
}

export interface DarkThemeProviderProps {
  children: React.ReactNode;
  config?: Partial<DarkThemeConfig>;
}

export interface DarkThemeConfig {
  backgroundColor: string;
  primaryText: string;
  secondaryText: string;
  glowColor: string;
  particleColor: string;
}

export interface AccessibilityState {
  prefersReducedMotion: boolean;
  highContrast: boolean;
  devicePixelRatio: number;
}

// Constant configurations
export const DEFAULT_DARK_THEME: DarkThemeConfig = {
  backgroundColor: '#0a0a0f',
  primaryText: '#ffffff',
  secondaryText: '#c0c0c0',
  glowColor: '#ffffff',
  particleColor: '#ffffff'
};

export const PARTICLE_DENSITY_CONFIG: Record<ParticleBackgroundProps['density'] & string, ParticleConfig> = {
  low: {
    count: 20,
    maxSize: 3,
    animationDuration: 8000,
    sparkleFrequency: 0.1
  },
  medium: {
    count: 50,
    maxSize: 4,
    animationDuration: 6000,
    sparkleFrequency: 0.2
  },
  high: {
    count: 80,
    maxSize: 5,
    animationDuration: 4000,
    sparkleFrequency: 0.3
  }
};

export const GLOW_INTENSITY_CONFIG: Record<GlowEffectProps['intensity'] & string, GlowConfig> = {
  subtle: {
    shadowBlur: 10,
    shadowSpread: 2,
    shadowLayers: 2,
    hoverMultiplier: 1.5
  },
  medium: {
    shadowBlur: 15,
    shadowSpread: 3,
    shadowLayers: 3,
    hoverMultiplier: 2
  },
  strong: {
    shadowBlur: 25,
    shadowSpread: 5,
    shadowLayers: 4,
    hoverMultiplier: 2.5
  }
};