// Main component exports
export { CodeEditor } from '@/components/code-editor';
// Configuration exports
export {
  DEFAULT_CODE_TEMPLATES, LANGUAGE_CONFIGS, getLanguageConfig,
  getSupportedLanguages,
  isLanguageSupported
} from './config/languages';
export {
  DARK_THEME, LIGHT_THEME,
  THEMES, createMonacoTheme, getSystemTheme,
  getThemeConfig
} from './config/themes';
// Type exports
export type {
  CodeEditorOptions,
  CodeEditorProps,
  EditorTheme,
  LanguageConfig,
  ReadonlyRange,
  SupportedLanguage,
  ThemeConfig
} from './types';

// Utility exports
export {
  convertReadonlyRangesToMonaco,
  filterReadonlyChanges,
  isPositionInReadonlyRange,
  setupReadonlyRanges
} from './utils/readonly';

