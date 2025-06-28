import { getLanguageConfig } from '@/config/languages';
import {
  createMonacoTheme,
  getSystemTheme,
  getThemeConfig,
} from '@/config/themes';
import '@/index.css';
import type { CodeEditorProps } from '@/types';
import { setupReadonlyRanges } from '@/utils/readonly';
import Editor from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Monaco Editor React component with enhanced features for coding interviews and practice
 */
export const CodeEditor: React.FC<CodeEditorProps> = ({
  language = 'javascript',
  value,
  onChange,
  readonlyRanges = [],
  theme = 'auto',
  height = '100%',
  width = '100%',
  className = '',
  style,
  options = {},
  overrideStyles = false,
  loading = 'Loading editor...',
  onMount,
  beforeMount,
  onValidate,
}) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof import('monaco-editor') | null>(null);
  const readonlyCleanupRef = useRef<(() => void) | null>(null);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // Resolve theme based on preference
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

  // Get language configuration
  const languageConfig = getLanguageConfig(language);

  // Handle before mount
  const handleBeforeMount = useCallback(
    (monaco: typeof import('monaco-editor')) => {
      monacoRef.current = monaco;

      // Register custom themes
      const lightTheme = getThemeConfig('light');
      const darkTheme = getThemeConfig('dark');

      monaco.editor.defineTheme(lightTheme.name, createMonacoTheme(lightTheme));
      monaco.editor.defineTheme(darkTheme.name, createMonacoTheme(darkTheme));

      // Call user-provided beforeMount
      beforeMount?.(monaco);
    },
    [beforeMount]
  );

  // Handle editor mount
  const handleMount = useCallback(
    (
      editorInstance: editor.IStandaloneCodeEditor,
      monaco: typeof import('monaco-editor')
    ) => {
      editorRef.current = editorInstance;
      monacoRef.current = monaco;

      // Setup readonly ranges
      if (readonlyRanges.length > 0) {
        readonlyCleanupRef.current = setupReadonlyRanges(
          editorInstance,
          monaco,
          readonlyRanges
        );
      }

      // Call user-provided onMount
      onMount?.(editorInstance, monaco);
    },
    [onMount, readonlyRanges]
  );

  // Handle editor value changes
  const handleChange = useCallback(
    (
      newValue: string | undefined,
      event?: editor.IModelContentChangedEvent
    ) => {
      if (newValue !== undefined) {
        onChange?.(newValue, event);
      }
    },
    [onChange]
  );

  // Handle validation
  const handleValidate = useCallback(
    (markers: editor.IMarker[]) => {
      onValidate?.(markers);
    },
    [onValidate]
  );

  // Update readonly ranges when they change
  useEffect(() => {
    if (editorRef.current && monacoRef.current) {
      // Clean up previous readonly ranges
      readonlyCleanupRef.current?.();

      // Setup new readonly ranges
      if (readonlyRanges.length > 0) {
        readonlyCleanupRef.current = setupReadonlyRanges(
          editorRef.current,
          monacoRef.current,
          readonlyRanges
        );
      }
    }
  }, [readonlyRanges]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      readonlyCleanupRef.current?.();
    };
  }, []);

  // Prepare Monaco editor options
  const editorOptions: editor.IStandaloneEditorConstructionOptions = {
    fontSize: 14,
    fontFamily:
      'var(--mino-font-mono, "Fira Code", "Monaco", "Cascadia Code", "Roboto Mono", monospace)',
    lineHeight: 20,
    minimap: { enabled: true },
    lineNumbers: 'on',
    wordWrap: 'off',
    automaticLayout: true,
    scrollBeyondLastLine: false,
    renderWhitespace: 'boundary',
    cursorStyle: 'line',
    tabSize: 2,
    insertSpaces: true,
    detectIndentation: false,
    folding: true,
    foldingStrategy: 'indentation',
    showFoldingControls: 'always',
    bracketPairColorization: { enabled: true },
    guides: {
      bracketPairs: true,
      indentation: true,
    },
    padding: { top: 16, bottom: 16 },
    ...options,
  };

  // Get current theme name
  const currentThemeName =
    resolvedTheme === 'dark' ? 'mino-dark' : 'mino-light';

  // Prepare container classes
  const containerClasses = [
    'mino-code-editor',
    `mino-theme-${resolvedTheme}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={overrideStyles ? className : containerClasses}
      style={{
        width,
        height,
        ...style,
      }}
    >
      <Editor
        beforeMount={handleBeforeMount}
        height="100%"
        language={languageConfig.monacoLanguage}
        loading={loading}
        onChange={handleChange}
        onMount={handleMount}
        onValidate={handleValidate}
        options={editorOptions}
        theme={currentThemeName}
        value={value}
        width="100%"
      />
    </div>
  );
};

export default CodeEditor;
