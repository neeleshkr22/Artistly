"use client"

/**
 * Theme initialization script to prevent flash of unstyled content
 * This runs before React hydration to set the initial theme
 */
export function ThemeScript() {
  const script = `
    (function() {
      try {
        function getThemePreference() {
          if (typeof localStorage !== 'undefined' && localStorage.getItem('artistly-theme')) {
            return localStorage.getItem('artistly-theme');
          }
          return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        
        function setTheme(theme) {
          const root = document.documentElement;
          const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
          
          root.classList.remove('light', 'dark');
          root.classList.add(isDark ? 'dark' : 'light');
          root.setAttribute('data-theme', isDark ? 'dark' : 'light');
        }
        
        const theme = getThemePreference();
        setTheme(theme);
      } catch (error) {
        console.warn('Theme initialization failed:', error);
        // Fallback to light theme
        document.documentElement.classList.add('light');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    })();
  `

  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
