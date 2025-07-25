import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

const ThemeContext = createContext();

const THEME_STORAGE_KEY = 'moneymap-theme';

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    
    // Check system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemPrefersDark(mediaQuery.matches);
    
    // Set initial theme
    const initialTheme = savedTheme || (mediaQuery.matches ? 'dark' : 'light');
    setTheme(initialTheme);
    setMounted(true);

    // Listen for system theme changes
    const handleSystemThemeChange = (e) => {
      setSystemPrefersDark(e.matches);
      // Only update theme if no manual preference is set
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  // Update the class and data-theme attribute on the HTML element when theme changes
  useEffect(() => {
    if (!mounted || !theme) return;
    
    const root = window.document.documentElement;
    
    // Remove all theme classes and attributes
    root.classList.remove('light', 'dark');
    
    // Add the current theme class and data-theme attribute
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.content = theme === 'dark' ? '#111827' : '#ffffff';
    }
    
    // Save to localStorage if it's a manual selection
    if (theme === 'system') {
      localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      if (prevTheme === 'light') return 'dark';
      if (prevTheme === 'dark') return 'system';
      return 'light';
    });
  };

  // Get the effective theme (respects system preference for 'system' theme)
  const effectiveTheme = theme === 'system' 
    ? (systemPrefersDark ? 'dark' : 'light')
    : theme;

  const value = useMemo(() => ({
    theme,
    effectiveTheme,
    toggleTheme,
    mounted,
    systemPrefersDark
  }), [theme, effectiveTheme, mounted, systemPrefersDark]);

  // Don't render the app until we know the theme
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
