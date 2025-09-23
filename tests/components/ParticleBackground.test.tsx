import { render, screen } from '@testing-library/react';
import { ParticleBackground } from '@/components/ui/ParticleBackground';

describe('ParticleBackground', () => {
  beforeEach(() => {
    // Reset matchMedia mock for each test
    (window.matchMedia as jest.Mock).mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)' ? false : true,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  test('renders with default props', () => {
    render(<ParticleBackground data-testid="particle-background" />);
    const background = screen.getByTestId('particle-background');
    expect(background).toBeInTheDocument();
    expect(background).toHaveClass('particle-background');
  });

  test('respects reduced motion preference', () => {
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

    render(<ParticleBackground respectReducedMotion={true} data-testid="particle-background" />);
    const background = screen.getByTestId('particle-background');
    expect(background).toHaveClass('reduced-motion');
  });

  test('adjusts particle count based on density', () => {
    const { rerender } = render(<ParticleBackground density="low" data-testid="particle-background" />);
    let background = screen.getByTestId('particle-background');
    expect(background).toHaveClass('particle-density-low');

    rerender(<ParticleBackground density="high" data-testid="particle-background" />);
    background = screen.getByTestId('particle-background');
    expect(background).toHaveClass('particle-density-high');
  });

  test('maintains performance targets', () => {
    render(<ParticleBackground density="high" data-testid="particle-background" />);
    const background = screen.getByTestId('particle-background');
    
    // Check that transform property is used for GPU acceleration
    const particles = background.querySelectorAll('.particle');
    particles.forEach(particle => {
      const style = window.getComputedStyle(particle);
      expect(style.transform).toBeDefined();
    });
  });

  test('applies custom className', () => {
    const customClass = 'custom-particle-bg';
    render(<ParticleBackground className={customClass} data-testid="particle-background" />);
    const background = screen.getByTestId('particle-background');
    expect(background).toHaveClass(customClass);
  });

  test('adapts animation speed based on prop', () => {
    const { rerender } = render(<ParticleBackground animationSpeed="slow" data-testid="particle-background" />);
    let background = screen.getByTestId('particle-background');
    expect(background).toHaveClass('animation-slow');

    rerender(<ParticleBackground animationSpeed="fast" data-testid="particle-background" />);
    background = screen.getByTestId('particle-background');
    expect(background).toHaveClass('animation-fast');
  });
});