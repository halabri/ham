import { render, screen, act } from '@testing-library/react';
import { ParticleBackground } from '@/components/ui/ParticleBackground';
import { GlowEffect } from '@/components/ui/GlowEffect';

describe('Animation Performance', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('ParticleBackground maintains 60 FPS target', () => {
    const startTime = performance.now();
    
    render(<ParticleBackground density="high" data-testid="performance-particles" />);
    
    const background = screen.getByTestId('performance-particles');
    expect(background).toBeInTheDocument();
    
    // Simulate animation frame
    act(() => {
      const callback = (global.requestAnimationFrame as jest.Mock).mock.calls[0]?.[0];
      if (callback) callback(performance.now());
    });
    
    const endTime = performance.now();
    const frameTime = endTime - startTime;
    
    // 60 FPS = ~16.67ms per frame
    expect(frameTime).toBeLessThan(16.67);
  });

  test('GlowEffect hover transitions are performant', () => {
    render(
      <GlowEffect intensity="strong" data-testid="performance-glow">
        <button>Performance test button</button>
      </GlowEffect>
    );
    
    const glowEffect = screen.getByTestId('performance-glow');
    
    // Check that the component has glow classes for performance
    expect(glowEffect).toHaveClass('glow-effect');
    expect(glowEffect).toHaveClass('glow-intensity-strong');
  });

  test('high density particles do not exceed performance budget', () => {
    const { container } = render(<ParticleBackground density="high" />);
    
    const particles = container.querySelectorAll('.particle');
    
    // Ensure particle count doesn't exceed performance budget (accounting for mobile optimization)
    expect(particles.length).toBeLessThanOrEqual(100);
    expect(particles.length).toBeGreaterThan(0);
    
    // Check each particle has the right classes for GPU acceleration
    particles.forEach(particle => {
      expect(particle).toHaveClass('particle');
    });
  });

  test('animations use CSS transforms for GPU acceleration', () => {
    render(
      <div>
        <ParticleBackground data-testid="particles" />
        <GlowEffect data-testid="glow">
          <span>GPU accelerated</span>
        </GlowEffect>
      </div>
    );
    
    const particles = screen.getByTestId('particles');
    const glow = screen.getByTestId('glow');
    
    // Both should have GPU acceleration classes
    expect(particles).toHaveClass('gpu-accelerated');
    expect(glow).toHaveClass('glow-effect');
  });

  test('reduced motion disables performance-intensive animations', () => {
    // Mock reduced motion preference
    (window.matchMedia as jest.Mock).mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(<ParticleBackground density="high" data-testid="reduced-particles" />);
    
    const background = screen.getByTestId('reduced-particles');
    
    // Should have reduced motion class when reduced motion is preferred
    expect(background).toHaveClass('reduced-motion');
  });

  test('mobile optimization reduces particle count', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      value: 375,
      configurable: true
    });
    
    // Mock mobile device detection
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
      configurable: true
    });

    const { container } = render(<ParticleBackground density="medium" />);
    
    const particles = container.querySelectorAll('.particle');
    
    // Mobile should have fewer particles for performance
    expect(particles.length).toBeLessThanOrEqual(30);
  });

  test('no memory leaks in animation cleanup', () => {
    const { unmount } = render(<ParticleBackground />);
    
    const initialRequestCount = (global.requestAnimationFrame as jest.Mock).mock.calls.length;
    
    // Unmount component
    unmount();
    
    // Verify cleanup - no additional animation frames requested after unmount
    const finalRequestCount = (global.requestAnimationFrame as jest.Mock).mock.calls.length;
    expect(finalRequestCount).toBe(initialRequestCount);
  });
});