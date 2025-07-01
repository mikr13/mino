import { DEFAULT_CODE_TEMPLATES, getLanguageConfig } from '@/config/languages';
import {
  createMonacoTheme,
  getSystemTheme,
  getThemeConfig,
} from '@/config/themes';
import '@/index.css';
import type {
  CodeEditorProps,
  CursorPosition,
  SupportedLanguage,
} from '@/types';
import { formatCode, supportsFormatting } from '@/utils/formatter';
import { setupReadonlyRanges } from '@/utils/readonly';
import Editor from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActionButtons } from '../action-buttons';
import { StatusBar } from '../status-bar';
import { CodeEditorToolbar } from '../toolbar';
import { getIcons } from './default-icons';

// Helper function to setup theme resolution
const useThemeResolution = (theme: 'light' | 'dark' | 'auto') => {
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

// Helper function to setup editor handlers
const useEditorHandlers = (
  currentLanguage: SupportedLanguage,
  currentValue: string,
  onChange: CodeEditorProps['onChange'],
  onFormat: CodeEditorProps['onFormat'],
  onReset: CodeEditorProps['onReset'],
  onRun: CodeEditorProps['onRun'],
  onSubmit: CodeEditorProps['onSubmit'],
  onLanguageChange: CodeEditorProps['onLanguageChange'],
  onAutoCorrectToggle: CodeEditorProps['onAutoCorrectToggle'],
  onFullScreenToggle: CodeEditorProps['onFullScreenToggle'],
  defaultCode: CodeEditorProps['defaultCode'],
  editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>,
  originalValue: React.MutableRefObject<string | undefined>,
  setCurrentValue: (value: string) => void,
  setCurrentLanguage: (lang: SupportedLanguage) => void,
  setIsDirty: (dirty: boolean) => void,
  setIsFormatting: (formatting: boolean) => void,
  setIsRunning: (running: boolean) => void,
  setIsSubmitting: (submitting: boolean) => void
) => {
  // Handle language change
  const handleLanguageChange = useCallback(
    (newLanguage: SupportedLanguage) => {
      setCurrentLanguage(newLanguage);

      // Switch to default code for the new language if available
      if (defaultCode?.[newLanguage]) {
        const newCode = defaultCode[newLanguage];
        setCurrentValue(newCode);
        originalValue.current = newCode;
        setIsDirty(false);
        onChange?.(newCode);
      }

      onLanguageChange?.(newLanguage);
    },
    [
      defaultCode,
      onChange,
      onLanguageChange,
      setCurrentLanguage,
      setCurrentValue,
      setIsDirty,
      originalValue,
    ]
  );

  // Handle format
  const handleFormat = useCallback(async () => {
    if (!editorRef.current) {
      onFormat?.();
      return;
    }

    if (!supportsFormatting(currentLanguage)) {
      // For languages that don't support Prettier, use Monaco's built-in formatting
      try {
        await editorRef.current
          .getAction('editor.action.formatDocument')
          ?.run();
      } catch {
        // Fallback to custom format handler
        onFormat?.();
      }
      return;
    }

    setIsFormatting(true);
    try {
      const formatted = await formatCode(currentValue, currentLanguage);
      if (formatted !== currentValue) {
        setCurrentValue(formatted);
        onChange?.(formatted);

        // Update editor value
        editorRef.current.setValue(formatted);
      }
      onFormat?.();
    } catch {
      // Formatting failed, try Monaco's built-in formatting as fallback
      try {
        await editorRef.current
          .getAction('editor.action.formatDocument')
          ?.run();
      } catch {
        // Call custom format handler if provided
        onFormat?.();
      }
    } finally {
      setIsFormatting(false);
    }
  }, [
    currentValue,
    currentLanguage,
    onChange,
    onFormat,
    editorRef,
    setCurrentValue,
    setIsFormatting,
  ]);

  // Handle reset
  const handleReset = useCallback(() => {
    const resetCode =
      defaultCode?.[currentLanguage] ||
      DEFAULT_CODE_TEMPLATES[currentLanguage] ||
      '';
    setCurrentValue(resetCode);
    originalValue.current = resetCode;
    setIsDirty(false);
    onChange?.(resetCode);
    onReset?.();
  }, [
    currentLanguage,
    defaultCode,
    onChange,
    onReset,
    setCurrentValue,
    setIsDirty,
    originalValue,
  ]);

  // Handle auto correct toggle
  const handleAutoCorrectToggle = useCallback(
    (enabled: boolean) => {
      onAutoCorrectToggle?.(enabled);
    },
    [onAutoCorrectToggle]
  );

  // Handle full screen toggle
  const handleFullScreenToggle = useCallback(
    (fullScreen: boolean) => {
      onFullScreenToggle?.(fullScreen);
    },
    [onFullScreenToggle]
  );

  // Handle run
  const handleRun = useCallback(async () => {
    if (onRun) {
      setIsRunning(true);
      try {
        await onRun();
      } finally {
        setIsRunning(false);
      }
    }
  }, [onRun, setIsRunning]);

  // Handle submit
  const handleSubmit = useCallback(async () => {
    if (onSubmit) {
      setIsSubmitting(true);
      try {
        await onSubmit();
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [onSubmit, setIsSubmitting]);

  return {
    handleLanguageChange,
    handleFormat,
    handleReset,
    handleAutoCorrectToggle,
    handleFullScreenToggle,
    handleRun,
    handleSubmit,
  };
};

/**
 * Monaco Editor React component with enhanced features for coding interviews and practice
 */
export const CodeEditor: React.FC<CodeEditorProps> = ({
  // Base props
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

  // Enhanced props
  showToolbar = false,
  showLanguageSwitcher = true,
  showFormatButton = true,
  showResetButton = true,
  showFullScreenButton = true,
  showAutoCorrectToggle = true,
  showStatusBar = false,
  showActionButtons = false,

  // Callbacks
  onRun,
  onSubmit,
  onLanguageChange,
  onAutoCorrectToggle,
  onFullScreenToggle,
  onReset,
  onFormat,

  // State
  defaultCode,
  autoCorrect = true,
  isFullScreen = false,
  showResetConfirmation = true,

  // Icons
  icons: userIcons,
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Idc
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(
    language as SupportedLanguage
  );
  const [currentValue, setCurrentValue] = useState(value);
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({
    lineNumber: 1,
    column: 1,
  });
  const [isDirty, setIsDirty] = useState(false);
  const [isFormatting, setIsFormatting] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalLines, setTotalLines] = useState(0);

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof import('monaco-editor') | null>(null);
  const readonlyCleanupRef = useRef<(() => void) | null>(null);
  const originalValue = useRef(value);

  // Merge user icons with defaults
  const icons = getIcons(userIcons);

  // Use theme resolution hook
  const resolvedTheme = useThemeResolution(theme);

  // Use editor handlers hook
  const {
    handleLanguageChange,
    handleFormat,
    handleReset,
    handleAutoCorrectToggle,
    handleFullScreenToggle,
    handleRun,
    handleSubmit,
  } = useEditorHandlers(
    currentLanguage,
    currentValue,
    onChange,
    onFormat,
    onReset,
    onRun,
    onSubmit,
    onLanguageChange,
    onAutoCorrectToggle,
    onFullScreenToggle,
    defaultCode,
    editorRef,
    originalValue,
    setCurrentValue,
    setCurrentLanguage,
    setIsDirty,
    setIsFormatting,
    setIsRunning,
    setIsSubmitting
  );

  // Update language when prop changes
  useEffect(() => {
    setCurrentLanguage(language as SupportedLanguage);
  }, [language]);

  // Update value when prop changes
  useEffect(() => {
    setCurrentValue(value);
    originalValue.current = value;
    setIsDirty(false);
  }, [value]);

  // Get language configuration
  const languageConfig = getLanguageConfig(currentLanguage);

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

      // Track cursor position for enhanced features
      if (showStatusBar) {
        editorInstance.onDidChangeCursorPosition((e) => {
          setCursorPosition({
            lineNumber: e.position.lineNumber,
            column: e.position.column,
          });
        });
      }

      // Track content changes for dirty state
      if (showStatusBar) {
        editorInstance.onDidChangeModelContent(() => {
          const currentContent = editorInstance.getValue();
          setIsDirty(currentContent !== originalValue.current);
          setTotalLines(editorInstance.getModel()?.getLineCount() || 0);
        });

        // Initial line count
        setTotalLines(editorInstance.getModel()?.getLineCount() || 0);
      }

      // Call user-provided onMount
      onMount?.(editorInstance, monaco);
    },
    [onMount, readonlyRanges, showStatusBar]
  );

  // Handle editor value changes
  const handleChange = useCallback(
    (
      newValue: string | undefined,
      event?: editor.IModelContentChangedEvent
    ) => {
      if (newValue !== undefined) {
        setCurrentValue(newValue);
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
    'mino',
    `mino-theme-${resolvedTheme}`,
    showToolbar || showStatusBar || showActionButtons
      ? 'mino-enhanced-editor'
      : '',
    isFullScreen ? 'fullscreen' : '',
    overrideStyles ? '' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={overrideStyles ? className : containerClasses}
      style={{
        width: isFullScreen ? '100vw' : width,
        height: isFullScreen ? '100vh' : height,
        ...style,
      }}
    >
      {showToolbar && (
        <CodeEditorToolbar
          autoCorrect={autoCorrect}
          currentLanguage={currentLanguage}
          icons={icons}
          isFormatting={isFormatting}
          isFullScreen={isFullScreen}
          onAutoCorrectToggle={
            showAutoCorrectToggle ? handleAutoCorrectToggle : undefined
          }
          onFormat={showFormatButton ? handleFormat : undefined}
          onFullScreenToggle={
            showFullScreenButton ? handleFullScreenToggle : undefined
          }
          onLanguageChange={
            showLanguageSwitcher ? handleLanguageChange : undefined
          }
          onReset={showResetButton ? handleReset : undefined}
          showAutoCorrectToggle={showAutoCorrectToggle}
          showFormatButton={showFormatButton}
          showFullScreenButton={showFullScreenButton}
          showLanguageSwitcher={showLanguageSwitcher}
          showResetButton={showResetButton}
          showResetConfirmation={showResetConfirmation}
        />
      )}

      <div className="mino-editor-container">
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
          value={currentValue}
          width="100%"
        />
      </div>

      {showActionButtons && (onRun || onSubmit) && (
        <div className="mino-fullscreen-overlay">
          <ActionButtons
            icons={{
              run: icons.run,
              submit: icons.submit,
            }}
            isRunning={isRunning}
            isSubmitting={isSubmitting}
            onRun={onRun ? handleRun : undefined}
            onSubmit={onSubmit ? handleSubmit : undefined}
            showRunButton={!!onRun}
            showSubmitButton={!!onSubmit}
          />
        </div>
      )}

      {showStatusBar && (
        <StatusBar
          isDirty={isDirty}
          isReadOnly={editorOptions.readOnly}
          language={currentLanguage}
          position={cursorPosition}
          totalLines={totalLines}
        />
      )}
    </div>
  );
};

export default CodeEditor;
