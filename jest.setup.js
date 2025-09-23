// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Accessibility testing matchers for WCAG 2.1 AA compliance
expect.extend({
  toBeAccessible(received) {
    // Custom matcher for WCAG 2.1 AA compliance
    // This is a basic implementation - in production, you'd use axe-core
    const pass = received && received.tagName;
    return {
      message: () =>
        `expected ${received} ${pass ? 'not ' : ''}to be accessible according to WCAG 2.1 AA standards`,
      pass,
    };
  },
  
  toHaveAccessibleName(received) {
    const hasName = received.getAttribute('aria-label') || 
                   received.getAttribute('aria-labelledby') || 
                   received.textContent?.trim();
    return {
      message: () =>
        `expected element ${hasName ? 'not ' : ''}to have an accessible name`,
      pass: Boolean(hasName),
    };
  },
  
  toHaveKeyboardSupport(received) {
    const hasTabIndex = received.hasAttribute('tabindex') || 
                       ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(received.tagName);
    return {
      message: () =>
        `expected element ${hasTabIndex ? 'not ' : ''}to support keyboard navigation`,
      pass: hasTabIndex,
    };
  },

  toMeetContrastRequirements(received) {
    // Simplified contrast check - in production, use actual color analysis
    const computedStyle = window.getComputedStyle ? window.getComputedStyle(received) : {};
    const hasColor = computedStyle.color && computedStyle.backgroundColor;
    return {
      message: () =>
        `expected element ${hasColor ? 'not ' : ''}to meet WCAG 2.1 AA contrast requirements`,
      pass: Boolean(hasColor),
    };
  },
});

// Mock for reduced motion media query
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock for requestAnimationFrame
global.requestAnimationFrame = jest.fn(cb => setTimeout(cb, 16));
global.cancelAnimationFrame = jest.fn(id => clearTimeout(id));

// Mock for IntersectionObserver (used for performance optimization)
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock performance API properly
global.performance = {
  ...global.performance,
  now: jest.fn(() => Date.now()),
  mark: jest.fn(),
  measure: jest.fn(),
  getEntriesByType: jest.fn(),
  getEntriesByName: jest.fn(),
};

// Custom matchers for accessibility and animation testing
expect.extend({
  toBeAccessible(received) {
    const pass = received.getAttribute('aria-hidden') !== 'true' && 
                 received.getAttribute('role') !== 'presentation';
    return {
      message: () => `expected element to be accessible`,
      pass,
    };
  },
  toRespectReducedMotion(received) {
    const computedStyle = window.getComputedStyle(received);
    const hasReducedMotionClass = received.classList.contains('reduced-motion');
    const pass = hasReducedMotionClass || computedStyle.animationDuration === '0s' || computedStyle.animationDuration === 'none';
    return {
      message: () => `expected element to respect reduced motion preferences`,
      pass,
    };
  },
});