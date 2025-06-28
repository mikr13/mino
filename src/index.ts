// Main component exports
export { CodeEditor, EnhancedCodeEditor } from '@/components/code-editor';
// Configuration exports
export {
  DEFAULT_CODE_TEMPLATES,
  getLanguageConfig,
  getSupportedLanguages,
  isLanguageSupported,
  LANGUAGE_CONFIGS,
} from './config/languages';
export {
  createMonacoTheme,
  DARK_THEME,
  getSystemTheme,
  getThemeConfig,
  LIGHT_THEME,
  THEMES,
} from './config/themes';
// Type exports
export type {
  CodeEditorOptions,
  CodeEditorProps,
  EditorTheme,
  LanguageConfig,
  ReadonlyRange,
  SupportedLanguage,
  ThemeConfig,
} from './types';

// Utility exports
export {
  convertReadonlyRangesToMonaco,
  filterReadonlyChanges,
  isPositionInReadonlyRange,
  setupReadonlyRanges,
} from './utils/readonly';
