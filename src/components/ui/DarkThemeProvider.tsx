'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { DarkThemeProviderProps, DarkThemeConfig, DEFAULT_DARK_THEME } from '@/types/components';

interface ThemeContextType {
  theme: DarkThemeConfig;
  setTheme: (theme: Partial<DarkThemeConfig>) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a DarkThemeProvider');
  }
  return context;
};

export const DarkThemeProvider: React.FC<DarkThemeProviderProps> = ({
  children,
  config = {},
}) => {
  const [theme, setThemeState] = useState<DarkThemeConfig>({
    ...DEFAULT_DARK_THEME,
    ...config,
  });
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode for this feature

  // Apply theme variables to CSS custom properties
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply dark theme variables
    root.style.setProperty('--background', theme.backgroundColor);
    root.style.setProperty('--foreground', theme.primaryText);
    root.style.setProperty('--background-color', theme.backgroundColor);
    root.style.setProperty('--glow-color', theme.glowColor);
    root.style.setProperty('--particle-color', theme.particleColor);
    
    // Add dark theme class to body
    document.body.classList.add('dark-theme');
    
    return () => {
      // Cleanup when component unmounts
      document.body.classList.remove('dark-theme');
    };
  }, [theme]);

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // For this feature, we always use dark mode, but we could respect system preference
      // setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Handle theme persistence
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-preference');
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme);
        setThemeState(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.warn('Failed to parse saved theme preference:', error);
      }
    }
  }, []);

  const setTheme = (newTheme: Partial<DarkThemeConfig>) => {
    const updatedTheme = { ...theme, ...newTheme };
    setThemeState(updatedTheme);
    
    // Save to localStorage
    try {
      localStorage.setItem('theme-preference', JSON.stringify(newTheme));
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const contextValue: ThemeContextType = {
    theme,
    setTheme,
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};