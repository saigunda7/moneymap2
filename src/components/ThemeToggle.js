import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme, effectiveTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Show tooltip on first render
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasSeenThemeToggle');
    if (!hasVisited) {
      setShowTooltip(true);
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 3000);
      localStorage.setItem('hasSeenThemeToggle', 'true');
      return () => clearTimeout(timer);
    }
  }, []);

  const getThemeIcon = () => {
    if (theme === 'system') {
      return <ComputerDesktopIcon className="h-5 w-5" />;
    }
    return theme === 'dark' ? (
      <SunIcon className="h-5 w-5" />
    ) : (
      <MoonIcon className="h-5 w-5" />
    );
  };

  const getNextThemeLabel = () => {
    if (theme === 'light') return 'Switch to dark mode';
    if (theme === 'dark') return 'Switch to system theme';
    return 'Switch to light mode';
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {showTooltip && (
        <div className="absolute right-14 -top-2 bg-gray-900 text-white text-xs font-medium px-2.5 py-1 rounded whitespace-nowrap">
          Toggle theme
          <div className="absolute right-0 top-1/2 w-2 h-2 -mr-1 bg-gray-900 transform rotate-45 translate-y-[-50%]" />
        </div>
      )}
      <button
        onClick={toggleTheme}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`p-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          effectiveTheme === 'dark' 
            ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
            : 'bg-white hover:bg-gray-100 text-gray-600'
        }`}
        aria-label={getNextThemeLabel()}
      >
        <div className="relative w-5 h-5">
          <div 
            className={`absolute inset-0 transition-opacity duration-300 ${
              theme === 'light' ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <SunIcon className="w-5 h-5" />
          </div>
          <div 
            className={`absolute inset-0 transition-opacity duration-300 ${
              theme === 'dark' ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <MoonIcon className="w-5 h-5" />
          </div>
          <div 
            className={`absolute inset-0 transition-opacity duration-300 ${
              theme === 'system' ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <ComputerDesktopIcon className="w-5 h-5" />
          </div>
        </div>
      </button>
      {isHovered && (
        <div className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs font-medium px-2.5 py-1 rounded whitespace-nowrap">
          {getNextThemeLabel()}
          <div className="absolute right-0 top-1/2 w-2 h-2 -mr-1 bg-gray-900 transform rotate-45 translate-y-[-50%]" />
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
