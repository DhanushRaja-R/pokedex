import { useState, useEffect } from 'react';

export const useTheme = () => {
  // Check local storage first. If empty, check the user's system preferences.
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('pokedex-theme');
    if (savedTheme) return savedTheme;
    // Fallback to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Whenever the theme changes, update the HTML tag and save to local storage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pokedex-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
};