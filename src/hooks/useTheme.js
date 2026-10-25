import { useState, useEffect } from 'react';

export const THEMES = [
  { id: 'midnight-studio', name: 'Midnight Studio' },
  { id: 'daylight-studio', name: 'Daylight Studio' },
  { id: 'retro-sunset', name: 'Retro Sunset' },
  { id: 'forest-tech', name: 'Forest Tech' },
];

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'midnight-studio';
    try {
      const stored = localStorage.getItem('nx-theme');
      if (THEMES.some((t) => t.id === stored)) return stored;
    } catch { /* storage unavailable */ }
    return 'midnight-studio';
  });

  useEffect(() => {
    const root = document.documentElement;
    /* Smooth colour cross-fade: class enables colour-only transitions
       for ~500ms, then is removed so it never interferes with other motion. */
    root.classList.add('theme-transition');
    root.dataset.theme = theme;
    try { localStorage.setItem('nx-theme', theme); } catch { /* ignore */ }

    /* theme-color follows the ACTIVE theme's --bg — read from CSS, no hex map */
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      const bg = getComputedStyle(root).getPropertyValue('--bg').trim();
      if (bg) meta.setAttribute('content', bg);
    }
    const t = setTimeout(() => root.classList.remove('theme-transition'), 520);
    return () => clearTimeout(t);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'midnight-studio' ? 'daylight-studio' : 'midnight-studio'));
  };

  return { theme, setTheme, toggleTheme, themes: THEMES };
}
