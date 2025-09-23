# Data Model: Fancy Glowing Dark Background Home Page

## Overview
This feature is a pure UI enhancement with no persistent data requirements. All configuration is handled through CSS variables and component props.

## Component Data Models

### ParticleBackground Component
```typescript
interface ParticleBackgroundProps {
  density: 'low' | 'medium' | 'high';
  animationSpeed: 'slow' | 'medium' | 'fast';
  respectReducedMotion: boolean;
  className?: string;
}

interface ParticleConfig {
  count: number;
  maxSize: number;
  animationDuration: number;
  sparkleFrequency: number;
}
```

**Validation Rules**:
- density must be one of the predefined values
- animationSpeed affects CSS animation-duration property
- respectReducedMotion defaults to true for accessibility

### GlowEffect Component  
```typescript
interface GlowEffectProps {
  intensity: 'subtle' | 'medium' | 'strong';
  color: string;
  element: 'text' | 'button' | 'border';
  children: React.ReactNode;
  className?: string;
}

interface GlowConfig {
  shadowBlur: number;
  shadowSpread: number;
  shadowLayers: number;
  hoverMultiplier: number;
}
```

**Validation Rules**:
- intensity maps to specific shadow configurations
- color must be valid CSS color value
- element type determines which CSS properties to apply

### Theme Configuration
```typescript
interface DarkThemeConfig {
  backgroundColor: string;
  primaryText: string;
  secondaryText: string;
  glowColor: string;
  particleColor: string;
}

const DARK_THEME: DarkThemeConfig = {
  backgroundColor: '#0a0a0f',
  primaryText: '#ffffff',
  secondaryText: '#c0c0c0',
  glowColor: '#ffffff',
  particleColor: '#ffffff'
};
```

## State Management
No global state required. All configuration passed through component props or CSS custom properties.

## Performance Considerations
- Particle count calculated based on screen size
- Animation state managed through CSS classes
- Reduced motion state detected once and cached
- Glow effects use transform property for GPU acceleration

## Accessibility Data
```typescript
interface AccessibilityState {
  prefersReducedMotion: boolean;
  highContrast: boolean;
  devicePixelRatio: number;
}
```

**Detection Logic**:
- prefersReducedMotion from CSS media query
- highContrast from user agent or system preferences
- devicePixelRatio for appropriate particle density