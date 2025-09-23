import { render, screen, waitFor } from '@testing-library/react';
import { DarkThemeProvider } from '@/components/ui';
import HomePage from '@/app/page';

// Helper to render HomePage with proper theme context
const renderHomePage = () => {
  return render(
    <DarkThemeProvider>
      <HomePage />
    </DarkThemeProvider>
  );
};

describe('Homepage Dark Theme Integration', () => {
  test('user sees dark background with particles on page load', async () => {
    renderHomePage();
    
    const particleBackground = screen.getByTestId('particle-background');
    expect(particleBackground).toBeInTheDocument();
    
    // Wait for theme to be applied
    await waitFor(() => {
      expect(document.body).toHaveClass('dark-theme');
    });
  });

  test('interactive elements show glow effects', () => {
    renderHomePage();
    
    // Look for glow effects on the main heading - update to match actual content
    const heading = screen.getByRole('heading', { name: /ham.*hisham alabri/i });
    expect(heading).toBeInTheDocument();
    
    // The heading should be wrapped in a glow effect
    const glowWrapper = heading.closest('.glow-effect');
    expect(glowWrapper).toBeTruthy();
  });

  test('respects reduced motion preferences', () => {
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

    renderHomePage();
    
    const particleBackground = screen.getByTestId('particle-background');
    expect(particleBackground).toHaveClass('reduced-motion');
  });

  test('dark theme provider wraps the entire page', async () => {
    renderHomePage();
    
    // Check that the main content exists and theme is applied
    const mainContent = screen.getByRole('main');
    expect(mainContent).toBeInTheDocument();
    
    // Wait for dark theme styles to be applied
    await waitFor(() => {
      expect(document.body).toHaveClass('dark-theme');
    });
  });

  test('maintains semantic HTML structure with theme enhancements', () => {
    renderHomePage();
    
    // Verify semantic structure is preserved
    expect(screen.getByRole('main')).toBeInTheDocument();
    
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
    
    // Check that the main heading is accessible - update to match actual content
    const mainHeading = screen.getByRole('heading', { name: /ham.*hisham alabri/i });
    expect(mainHeading).toBeAccessible();
  });

  test('CSS custom properties are set for dark theme', async () => {
    renderHomePage();
    
    // Wait for CSS custom properties to be set
    await waitFor(() => {
      const root = document.documentElement;
      expect(root.style.getPropertyValue('--background')).toBeTruthy();
    });
    
    const root = document.documentElement;
    expect(root.style.getPropertyValue('--foreground')).toBeTruthy();
    expect(root.style.getPropertyValue('--glow-color')).toBeTruthy();
  });

  test('particle background does not interfere with content interaction', () => {
    renderHomePage();
    
    const particleBackground = screen.getByTestId('particle-background');
    const mainContent = screen.getByRole('main');
    
    // Particle background should be present
    expect(particleBackground).toBeInTheDocument();
    expect(mainContent).toBeInTheDocument();
    
    // Check that particle background is properly positioned and accessible
    expect(particleBackground).toHaveClass('particle-background');
    expect(particleBackground).toHaveAttribute('aria-hidden', 'true');
  });

  test('responsive design adapts to different screen sizes', async () => {
    // Test mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      value: 375,
      configurable: true
    });
    
    const { rerender } = renderHomePage();
    
    await waitFor(() => {
      const particleBackground = screen.getByTestId('particle-background');
      expect(particleBackground).toHaveClass('mobile-optimized');
    });
    
    // Test desktop viewport
    Object.defineProperty(window, 'innerWidth', {
      value: 1920,
      configurable: true
    });
    
    // Trigger resize event
    window.dispatchEvent(new Event('resize'));
    
    rerender(
      <DarkThemeProvider>
        <HomePage />
      </DarkThemeProvider>
    );
    
    await waitFor(() => {
      const particleBackground = screen.getByTestId('particle-background');
      expect(particleBackground).toHaveClass('desktop-optimized');
    });
  });
});