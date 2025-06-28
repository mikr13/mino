import type { ThemeConfig } from '@/types';

/**
 * LeetCode-inspired light theme
 */
export const LIGHT_THEME: ThemeConfig = {
  name: 'mino-light',
  base: 'vs',
  inherit: true,
  colors: {
    'editor.background': '#ffffff',
    'editor.foreground': '#1a202c',
    'editorLineNumber.foreground': '#a0aec0',
    'editorLineNumber.activeForeground': '#4a5568',
    'editor.selectionBackground': '#bee3f8',
    'editor.selectionHighlightBackground': '#e2e8f0',
    'editorCursor.foreground': '#3182ce',
    'editor.findMatchBackground': '#fed7d7',
    'editor.findMatchHighlightBackground': '#feebc8',
    'editorBracketMatch.background': '#e2e8f0',
    'editorBracketMatch.border': '#a0aec0',
    'editorError.foreground': '#e53e3e',
    'editorWarning.foreground': '#d69e2e',
    'editorInfo.foreground': '#3182ce',
    'editorHint.foreground': '#38a169',
    'editorGutter.background': '#f7fafc',
    'scrollbarSlider.background': '#e2e8f0',
    'scrollbarSlider.hoverBackground': '#cbd5e0',
    'scrollbarSlider.activeBackground': '#a0aec0',
  },
  rules: [
    { token: 'comment', foreground: '718096', fontStyle: 'italic' },
    { token: 'keyword', foreground: '9f7aea' },
    { token: 'string', foreground: '38a169' },
    { token: 'number', foreground: 'd69e2e' },
    { token: 'regexp', foreground: 'e53e3e' },
    { token: 'operator', foreground: '4a5568' },
    { token: 'namespace', foreground: '3182ce' },
    { token: 'type', foreground: '3182ce' },
    { token: 'struct', foreground: '3182ce' },
    { token: 'class', foreground: '3182ce' },
    { token: 'interface', foreground: '3182ce' },
    { token: 'parameter', foreground: '1a202c' },
    { token: 'variable', foreground: '1a202c' },
    { token: 'function', foreground: '805ad5' },
    { token: 'member', foreground: '805ad5' },
  ],
};

/**
 * LeetCode-inspired dark theme
 */
export const DARK_THEME: ThemeConfig = {
  name: 'mino-dark',
  base: 'vs-dark',
  inherit: true,
  colors: {
    'editor.background': '#1a202c',
    'editor.foreground': '#f7fafc',
    'editorLineNumber.foreground': '#4a5568',
    'editorLineNumber.activeForeground': '#a0aec0',
    'editor.selectionBackground': '#2d3748',
    'editor.selectionHighlightBackground': '#2d3748',
    'editorCursor.foreground': '#63b3ed',
    'editor.findMatchBackground': '#553c9a',
    'editor.findMatchHighlightBackground': '#4a5568',
    'editorBracketMatch.background': '#2d3748',
    'editorBracketMatch.border': '#4a5568',
    'editorError.foreground': '#fc8181',
    'editorWarning.foreground': '#f6ad55',
    'editorInfo.foreground': '#63b3ed',
    'editorHint.foreground': '#68d391',
    'editorGutter.background': '#171923',
    'scrollbarSlider.background': '#2d3748',
    'scrollbarSlider.hoverBackground': '#4a5568',
    'scrollbarSlider.activeBackground': '#63b3ed',
  },
  rules: [
    { token: 'comment', foreground: '718096', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'b794f6' },
    { token: 'string', foreground: '68d391' },
    { token: 'number', foreground: 'f6ad55' },
    { token: 'regexp', foreground: 'fc8181' },
    { token: 'operator', foreground: 'a0aec0' },
    { token: 'namespace', foreground: '63b3ed' },
    { token: 'type', foreground: '63b3ed' },
    { token: 'struct', foreground: '63b3ed' },
    { token: 'class', foreground: '63b3ed' },
    { token: 'interface', foreground: '63b3ed' },
    { token: 'parameter', foreground: 'f7fafc' },
    { token: 'variable', foreground: 'f7fafc' },
    { token: 'function', foreground: 'b794f6' },
    { token: 'member', foreground: 'b794f6' },
  ],
};

/**
 * Theme registry
 */
export const THEMES = {
  light: LIGHT_THEME,
  dark: DARK_THEME,
} as const;

/**
 * Get theme configuration by name
 */
export function getThemeConfig(themeName: 'light' | 'dark'): ThemeConfig {
  return THEMES[themeName] || THEMES.light;
}

/**
 * Detect system theme preference
 */
export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return 'light';
}

/**
 * Create Monaco theme from theme config
 */
export function createMonacoTheme(config: ThemeConfig) {
  return {
    base: config.base,
    inherit: config.inherit,
    rules: config.rules.map((rule) => ({
      token: rule.token,
      foreground: rule.foreground,
      background: rule.background,
      fontStyle: rule.fontStyle,
    })),
    colors: config.colors,
  };
}
