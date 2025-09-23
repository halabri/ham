// TypeScript declarations for custom Jest matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeAccessible(): R;
      toRespectReducedMotion(): R;
    }
  }
}

export {};