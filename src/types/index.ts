import type { editor as monacoEditor } from 'monaco-editor';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Supported programming languages
 */
export type SupportedLanguage =
  | 'python'
  | 'javascript'
  | 'typescript'
  | 'java'
  | 'cpp'
  | 'c';

/**
 * Theme options for the editor
 */
export type EditorTheme = 'light' | 'dark' | 'auto';

/**
 * Readonly range definition for protected code blocks
 */
export type ReadonlyRange = {
  startLine: number;
  endLine: number;
  startColumn?: number;
  endColumn?: number;
};

/**
 * Monaco editor options - properly typed to match Monaco's API
 */
export type CodeEditorOptions = {
  minimap?: monacoEditor.IEditorMinimapOptions;
  lineNumbers?: monacoEditor.LineNumbersType;
  wordWrap?: 'off' | 'on' | 'wordWrapColumn' | 'bounded';
  readOnly?: boolean;
  fontSize?: number;
  tabSize?: number;
  insertSpaces?: boolean;
  automaticLayout?: boolean;
  scrollBeyondLastLine?: boolean;
  renderWhitespace?: 'none' | 'boundary' | 'selection' | 'trailing' | 'all';
  cursorStyle?:
  | 'line'
  | 'block'
  | 'underline'
  | 'line-thin'
  | 'block-outline'
  | 'underline-thin';
};

/**
 * Icon component type for customizable icons
 */
export type IconComponent = React.ComponentType<{ className?: string; size?: string | number }>;

/**
 * Configuration for editor icons
 */
export type EditorIcons = {
  format?: IconComponent;
  reset?: IconComponent;
  fullScreen?: IconComponent;
  exitFullScreen?: IconComponent;
  run?: IconComponent;
  submit?: IconComponent;
  autoCorrect?: IconComponent;
  language?: IconComponent;
  chevronDown?: IconComponent;
};

/**
 * Main props type for the CodeEditor component
 */
export type CodeEditorProps = {
  /** Programming language for syntax highlighting */
  language: SupportedLanguage | string;

  /** Current code content */
  value: string;

  /** Callback fired when code content changes */
  onChange?: (
    code: string,
    event?: monacoEditor.IModelContentChangedEvent
  ) => void;

  /** Readonly ranges that cannot be edited */
  readonlyRanges?: ReadonlyRange[];

  /** Theme preference */
  theme?: EditorTheme;

  /** Editor height (CSS value) */
  height?: string | number;

  /** Editor width (CSS value) */
  width?: string | number;

  /** Additional CSS class name */
  className?: string;

  /** Inline CSS styles */
  style?: CSSProperties;

  /** Monaco editor options */
  options?: CodeEditorOptions;

  /** Whether to override default styles completely */
  overrideStyles?: boolean;

  /** Loading placeholder content */
  loading?: ReactNode;

  /** Callback fired when editor mounts */
  onMount?: (
    editor: monacoEditor.IStandaloneCodeEditor,
    monaco: typeof import('monaco-editor')
  ) => void;

  /** Callback fired before editor mounts */
  beforeMount?: (monaco: typeof import('monaco-editor')) => void;

  /** Callback fired when editor validation occurs */
  onValidate?: (markers: monacoEditor.IMarker[]) => void;
};

/**
 * Enhanced props type for the CodeEditor with toolbar and additional features
 */
export type EnhancedCodeEditorProps = CodeEditorProps & {
  // Toolbar features
  showToolbar?: boolean;
  showLanguageSwitcher?: boolean;
  showFormatButton?: boolean;
  showResetButton?: boolean;
  showFullScreenButton?: boolean;
  showAutoCorrectToggle?: boolean;

  // Status bar
  showStatusBar?: boolean;

  // Action buttons
  showActionButtons?: boolean;
  onRun?: () => void;
  onSubmit?: () => void;

  // Advanced features
  defaultCode?: Record<SupportedLanguage, string>;
  onLanguageChange?: (language: SupportedLanguage) => void;
  autoCorrect?: boolean;
  onAutoCorrectToggle?: (enabled: boolean) => void;

  // Icon configuration
  icons?: EditorIcons;

  // Full screen
  isFullScreen?: boolean;
  onFullScreenToggle?: (isFullScreen: boolean) => void;

  // Reset functionality
  onReset?: () => void;
  showResetConfirmation?: boolean;

  // Format functionality
  onFormat?: () => void;
};

/**
 * Language configuration for Monaco Editor
 */
export type LanguageConfig = {
  id: string;
  label: string;
  monacoLanguage: string;
  defaultCode: string;
  fileExtension: string;
};

/**
 * Theme configuration for Monaco Editor
 */
export type ThemeConfig = {
  name: string;
  base: 'vs' | 'vs-dark' | 'hc-black' | 'hc-light';
  inherit: boolean;
  colors: Record<string, string>;
  rules: Array<{
    token: string;
    foreground?: string;
    background?: string;
    fontStyle?: string;
  }>;
};

/**
 * Cursor position information
 */
export type CursorPosition = {
  lineNumber: number;
  column: number;
};

/**
 * Editor status information
 */
export type EditorStatus = {
  isDirty: boolean;
  language: string;
  position: CursorPosition;
};
