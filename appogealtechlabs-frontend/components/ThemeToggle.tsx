'use client';

import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2 rounded-xl transition-all duration-300 ${
        theme === 'light' 
          ? 'bg-white/50 text-amber-500 hover:bg-amber-100 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]' 
          : 'bg-white/5 text-accent hover:bg-white/10 hover:shadow-[0_0_15px_rgba(100,255,218,0.3)]'
      } border border-transparent hover:scale-105`}
      aria-label="Toggle Theme"
    >
      <div className="relative w-6 h-6">
        <Sun 
          size={24} 
          className={`absolute inset-0 transition-all duration-500 rotate-0 scale-100 ${
            theme === 'dark' ? 'opacity-0 -rotate-90 scale-0' : 'opacity-100'
          }`} 
        />
        <Moon 
          size={24} 
          className={`absolute inset-0 transition-all duration-500 rotate-0 scale-100 ${
            theme === 'light' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100'
          }`} 
        />
      </div>
    </button>
  );
}
