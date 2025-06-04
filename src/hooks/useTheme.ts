import { useState, useEffect } from 'react';
import { ThemeMode } from '../types';
import { getThemeFromStorage, saveThemeToStorage } from '../utils/storage';

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeMode>('light');
  
  useEffect(() => {
    const savedTheme = getThemeFromStorage() as ThemeMode;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    saveThemeToStorage(newTheme);
  };
  
  return { theme, toggleTheme };
};