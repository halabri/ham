// Export all UI components for the fancy glowing dark background home page
export { ParticleBackground } from './ParticleBackground';
export { GlowEffect } from './GlowEffect';
export { DarkThemeProvider, useTheme } from './DarkThemeProvider';

// Re-export types for convenience
export type {
  ParticleBackgroundProps,
  GlowEffectProps,
  DarkThemeProviderProps,
  DarkThemeConfig,
  ParticleConfig,
  GlowConfig,
  AccessibilityState,
} from '@/types/components';

// Re-export constants
export {
  DEFAULT_DARK_THEME,
  PARTICLE_DENSITY_CONFIG,
  GLOW_INTENSITY_CONFIG,
} from '@/types/components';