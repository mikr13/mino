import { getSystemTheme } from '@/config/themes';
import { useEffect, useState } from 'react';

export type ThemeType = 'light' | 'dark' | 'auto';

/**
 * Hook to handle theme resolution including system theme detection
 */
export const useThemeResolution = (theme: ThemeType) => {
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const resolveTheme = (): 'light' | 'dark' => {
            if (theme === 'auto') {
                return getSystemTheme();
            }
            return theme;
        };

        const updateTheme = () => {
            const newTheme = resolveTheme();
            setResolvedTheme(newTheme);
        };

        updateTheme();

        // Listen for system theme changes when using auto theme
        if (
            theme === 'auto' &&
            typeof window !== 'undefined' &&
            window.matchMedia
        ) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = () => updateTheme();

            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, [theme]);

    return resolvedTheme;
};
