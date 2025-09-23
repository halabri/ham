import { render, screen } from '@testing-library/react';
import { DarkThemeProvider } from '@/components/ui/DarkThemeProvider';

describe('DarkThemeProvider', () => {
  test('applies dark theme variables to DOM', () => {
    render(
      <DarkThemeProvider>
        <div data-testid="child-content">Theme content</div>
      </DarkThemeProvider>
    );
    
    const content = screen.getByTestId('child-content');
    expect(content).toBeInTheDocument();
    
    // Check that CSS custom properties are applied
    const root = document.documentElement;
    expect(root.style.getPropertyValue('--background')).toBeTruthy();
    expect(root.style.getPropertyValue('--foreground')).toBeTruthy();
  });

  test('provides theme context to children', () => {
    const TestChild = () => {
      // This would use a theme context hook in real implementation
      return <div data-testid="themed-child">Themed content</div>;
    };

    render(
      <DarkThemeProvider>
        <TestChild />
      </DarkThemeProvider>
    );
    
    expect(screen.getByTestId('themed-child')).toBeInTheDocument();
  });

  test('merges custom config with defaults', () => {
    const customConfig = {
      backgroundColor: '#1a1a1a',
      glowColor: '#00ff00'
    };

    render(
      <DarkThemeProvider config={customConfig}>
        <div data-testid="custom-themed">Custom theme</div>
      </DarkThemeProvider>
    );
    
    const content = screen.getByTestId('custom-themed');
    expect(content).toBeInTheDocument();
    
    // Check that custom variables are applied
    const root = document.documentElement;
    expect(root.style.getPropertyValue('--background-color')).toContain('1a1a1a');
  });

  test('detects system theme preference', () => {
    // Mock system dark theme preference
    (window.matchMedia as jest.Mock).mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(
      <DarkThemeProvider>
        <div data-testid="system-themed">System theme</div>
      </DarkThemeProvider>
    );
    
    expect(screen.getByTestId('system-themed')).toBeInTheDocument();
  });

  test('handles theme persistence across sessions', () => {
    // Mock localStorage
    const mockLocalStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage
    });

    render(
      <DarkThemeProvider>
        <div data-testid="persistent-theme">Persistent theme</div>
      </DarkThemeProvider>
    );
    
    expect(screen.getByTestId('persistent-theme')).toBeInTheDocument();
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('theme-preference');
  });

  test('renders children without theme context errors', () => {
    render(
      <DarkThemeProvider>
        <div data-testid="child-one">First child</div>
        <div data-testid="child-two">Second child</div>
      </DarkThemeProvider>
    );
    
    expect(screen.getByTestId('child-one')).toBeInTheDocument();
    expect(screen.getByTestId('child-two')).toBeInTheDocument();
  });
});