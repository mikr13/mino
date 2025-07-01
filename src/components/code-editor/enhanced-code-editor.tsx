import { DEFAULT_CODE_TEMPLATES } from '@/config/languages';
import {
  createMonacoTheme,
  getSystemTheme,
  getThemeConfig,
} from '@/config/themes';
import '@/index.css';
import type {
  CursorPosition,
  EnhancedCodeEditorProps,
  SupportedLanguage,
} from '@/types';
import { formatCode, supportsFormatting } from '@/utils/formatter';
import { setupReadonlyRanges } from '@/utils/readonly';
import type { editor } from 'monaco-editor';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActionButtons } from '../action-buttons';
import { StatusBar } from '../status-bar';
import { CodeEditorToolbar } from '../toolbar';
import { CodeEditor } from './code-editor';
import { getIcons } from './default-icons';

export const EnhancedCodeEditor: React.FC<EnhancedCodeEditorProps> = ({
  // Base props
  language,
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
  showToolbar = true,
  showLanguageSwitcher = true,
  showFormatButton = true,
  showResetButton = true,
  showFullScreenButton = true,
  showAutoCorrectToggle = true,
  showStatusBar = true,
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
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof import('monaco-editor') | null>(null);
  const readonlyCleanupRef = useRef<(() => void) | null>(null);
  const originalValue = useRef(value);

  // Merge user icons with defaults
  const icons = getIcons(userIcons);

  // Resolve theme based on preference (ported from original editor)
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

  // Handle before mount (ported from original editor)
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
  const handleEditorMount = useCallback(
    (
      editorInstance: editor.IStandaloneCodeEditor,
      monaco: typeof import('monaco-editor')
    ) => {
      editorRef.current = editorInstance;
      monacoRef.current = monaco;

      // Setup readonly ranges (ported from original editor)
      if (readonlyRanges.length > 0) {
        readonlyCleanupRef.current = setupReadonlyRanges(
          editorInstance,
          monaco,
          readonlyRanges
        );
      }

      // Track cursor position
      editorInstance.onDidChangeCursorPosition((e) => {
        setCursorPosition({
          lineNumber: e.position.lineNumber,
          column: e.position.column,
        });
      });

      // Track content changes for dirty state
      editorInstance.onDidChangeModelContent(() => {
        const currentContent = editorInstance.getValue();
        setIsDirty(currentContent !== originalValue.current);
        setTotalLines(editorInstance.getModel()?.getLineCount() || 0);
      });

      // Initial line count
      setTotalLines(editorInstance.getModel()?.getLineCount() || 0);

      onMount?.(editorInstance, monaco);
    },
    [onMount, readonlyRanges]
  );

  // Update readonly ranges when they change (ported from original editor)
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

  // Cleanup on unmount (ported from original editor)
  useEffect(() => {
    return () => {
      readonlyCleanupRef.current?.();
    };
  }, []);

  // Handle value changes
  const handleValueChange = useCallback(
    (newValue: string, event?: editor.IModelContentChangedEvent) => {
      setCurrentValue(newValue);
      onChange?.(newValue, event);
    },
    [onChange]
  );

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
    [defaultCode, onChange, onLanguageChange]
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
  }, [currentValue, currentLanguage, onChange, onFormat]);

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
  }, [currentLanguage, defaultCode, onChange, onReset]);

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
  }, [onRun]);

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
  }, [onSubmit]);

  // Prepare Monaco editor options (ported from original editor)
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

  // Prepare container classes
  const containerClasses = [
    'mino-enhanced-editor',
    `mino-theme-${resolvedTheme}`,
    isFullScreen ? 'fullscreen' : '',
    overrideStyles ? '' : 'mino',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={containerClasses}
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
        <CodeEditor
          beforeMount={handleBeforeMount}
          height="100%"
          language={currentLanguage}
          loading={loading}
          onChange={handleValueChange}
          onMount={handleEditorMount}
          onValidate={onValidate}
          options={editorOptions}
          overrideStyles={overrideStyles}
          readonlyRanges={readonlyRanges}
          theme={theme}
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

export default EnhancedCodeEditor;
