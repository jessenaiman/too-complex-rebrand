'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface AnimatedThemeTogglerProps {
  onThemeChange?: (theme: string) => void;
}

const AnimatedThemeToggler: React.FC<AnimatedThemeTogglerProps> = ({ onThemeChange }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Update theme when state changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    // Notify parent component of theme change
    if (onThemeChange) {
      onThemeChange(isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode, onThemeChange]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative rounded-full w-16 h-8 flex items-center bg-gray-300 dark:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {/* Sun icon for light mode */}
      <motion.svg
        className="absolute left-1 w-5 h-5 text-yellow-500"
        viewBox="0 0 24 24"
        fill="currentColor"
        initial={false}
        animate={{ 
          opacity: isDarkMode ? 0 : 1,
          rotate: isDarkMode ? 0 : 180
        }}
        transition={{ duration: 0.3 }}
      >
        <path d="M12 2.25a.75.75 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
      </motion.svg>

      {/* Moon icon for dark mode */}
      <motion.svg
        className="absolute right-1 w-5 h-5 text-indigo-300"
        viewBox="0 0 24 24"
        fill="currentColor"
        initial={false}
        animate={{ 
          opacity: isDarkMode ? 1 : 0,
          rotate: isDarkMode ? 180 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <path
          fillRule="evenodd"
          d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
          clipRule="evenodd"
        />
      </motion.svg>

      {/* Toggle thumb */}
      <motion.div
        className="absolute w-6 h-6 bg-white rounded-full shadow-md"
        initial={false}
        animate={{ 
          x: isDarkMode ? 36 : 4
        }}
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
      />
    </motion.button>
  );
};

export default AnimatedThemeToggler;
