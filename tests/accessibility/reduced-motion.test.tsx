import { render, screen } from '@testing-library/react';
import { ParticleBackground } from '@/components/ui/ParticleBackground';
import { GlowEffect } from '@/components/ui/GlowEffect';

describe('Reduced Motion Accessibility', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  test('ParticleBackground respects reduced motion preference', () => {
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

    render(<ParticleBackground data-testid="reduced-motion-particles" />);
    
    const background = screen.getByTestId('reduced-motion-particles');
    expect(background).toRespectReducedMotion();
    expect(background).toHaveClass('reduced-motion');
  });

  test('GlowEffect respects reduced motion preference', () => {
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

    render(
      <GlowEffect data-testid="reduced-motion-glow">
        <button>Accessible button</button>
      </GlowEffect>
    );
    
    const glowEffect = screen.getByTestId('reduced-motion-glow');
    expect(glowEffect).toRespectReducedMotion();
  });

  test('animations are disabled when user prefers reduced motion', () => {
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

    render(
      <div>
        <ParticleBackground data-testid="particles" />
        <GlowEffect data-testid="glow">
          <h1>Heading</h1>
        </GlowEffect>
      </div>
    );
    
    const particles = screen.getByTestId('particles');
    const glow = screen.getByTestId('glow');
    
    // Both should have reduced motion classes
    expect(particles).toHaveClass('reduced-motion');
    expect(glow).toHaveClass('reduced-motion');
  });

  test('animations are enabled when user allows motion', () => {
    // Mock motion allowed preference
    (window.matchMedia as jest.Mock).mockImplementation(query => ({
      matches: query !== '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(
      <div>
        <ParticleBackground data-testid="particles" />
        <GlowEffect data-testid="glow">
          <h1>Heading</h1>
        </GlowEffect>
      </div>
    );
    
    const particles = screen.getByTestId('particles');
    const glow = screen.getByTestId('glow');
    
    // Neither should have reduced motion classes
    expect(particles).not.toHaveClass('reduced-motion');
    expect(glow).not.toHaveClass('reduced-motion');
  });

  test('media query change listeners are properly attached', () => {
    const mockAddEventListener = jest.fn();
    (window.matchMedia as jest.Mock).mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: mockAddEventListener,
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(<ParticleBackground />);
    
    expect(mockAddEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });
});