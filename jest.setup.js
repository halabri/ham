// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

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