import { DEFAULT_EDITOR_OPTIONS } from '@/config/editor';
import { getLanguageConfig } from '@/config/languages';
import { createMonacoTheme, getThemeConfig } from '@/config/themes';
import { useEditorHandlers } from '@/hooks/use-editor-handlers';
import { useEditorState } from '@/hooks/use-editor-state';
import { useThemeResolution } from '@/hooks/use-theme-resolution';
import '@/index.css';
import type { CodeEditorProps, SupportedLanguage } from '@/types';
import { setupReadonlyRanges } from '@/utils/readonly';
import Editor from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { useCallback, useEffect, useRef } from 'react';
import { ActionButtons } from '../action-buttons';
import { StatusBar } from '../status-bar';
import { CodeEditorToolbar } from '../toolbar';
import { getIcons } from './default-icons';

// Helper function to setup container classes
const getContainerClasses = (
  resolvedTheme: 'light' | 'dark',
  showToolbar: boolean,
  showStatusBar: boolean,
  showActionButtons: boolean,
  isFullScreen: boolean,
  overrideStyles: boolean,
  className: string
) => {
  return [
    'mino',
    `mino-theme-${resolvedTheme}`,
    showToolbar || showStatusBar || showActionButtons
      ? 'mino-enhanced-editor'
      : '',
    isFullScreen ? 'mino-fullscreen' : '',
    overrideStyles ? '' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
};

// Helper function to setup editor mount handlers
const useEditorMountHandlers = (
  onMount: CodeEditorProps['onMount'],
  beforeMount: CodeEditorProps['beforeMount'],
  readonlyRanges: NonNullable<CodeEditorProps['readonlyRanges']>,
  showStatusBar: boolean,
  actions: ReturnType<typeof useEditorState>[1],
  originalValue: React.MutableRefObject<string | undefined>,
  editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>,
  monacoRef: React.MutableRefObject<typeof import('monaco-editor') | null>,
  readonlyCleanupRef: React.MutableRefObject<(() => void) | null>
) => {
  // Setup cursor position tracking
  const setupCursorTracking = useCallback(
    (editorInstance: editor.IStandaloneCodeEditor) => {
      editorInstance.onDidChangeCursorPosition((e) => {
        actions.setCursorPosition({
          lineNumber: e.position.lineNumber,
          column: e.position.column,
        });
      });
    },
    [actions]
  );

  // Setup content change tracking
  const setupContentTracking = useCallback(
    (editorInstance: editor.IStandaloneCodeEditor) => {
      editorInstance.onDidChangeModelContent(() => {
        const currentContent = editorInstance.getValue();
        actions.setIsDirty(currentContent !== originalValue.current);
        actions.setTotalLines(editorInstance.getModel()?.getLineCount() || 0);
      });

      // Initial line count
      actions.setTotalLines(editorInstance.getModel()?.getLineCount() || 0);
    },
    [actions, originalValue]
  );

  // Setup readonly ranges
  const setupReadonly = useCallback(
    (
      editorInstance: editor.IStandaloneCodeEditor,
      monaco: typeof import('monaco-editor')
    ) => {
      if (readonlyRanges.length > 0) {
        readonlyCleanupRef.current = setupReadonlyRanges(
          editorInstance,
          monaco,
          readonlyRanges
        );
      }
    },
    [readonlyRanges, readonlyCleanupRef]
  );

  // Setup enhanced features
  const setupEnhancedFeatures = useCallback(
    (editorInstance: editor.IStandaloneCodeEditor) => {
      if (showStatusBar) {
        setupCursorTracking(editorInstance);
        setupContentTracking(editorInstance);
      }
    },
    [showStatusBar, setupCursorTracking, setupContentTracking]
  );

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
    [beforeMount, monacoRef]
  );

  const handleMount = useCallback(
    (
      editorInstance: editor.IStandaloneCodeEditor,
      monaco: typeof import('monaco-editor')
    ) => {
      editorRef.current = editorInstance;
      monacoRef.current = monaco;

      setupReadonly(editorInstance, monaco);
      setupEnhancedFeatures(editorInstance);

      // Call user-provided onMount
      onMount?.(editorInstance, monaco);
    },
    [onMount, setupReadonly, setupEnhancedFeatures, editorRef, monacoRef]
  );

  return { handleBeforeMount, handleMount };
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
  showThemeSwitcher = true,
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
  onThemeChange,

  // State
  defaultCode,
  autoCorrect = true,
  isFullScreen = false,
  showResetConfirmation = true,

  // Icons
  icons: userIcons,

  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Idc
}) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof import('monaco-editor') | null>(null);
  const readonlyCleanupRef = useRef<(() => void) | null>(null);
  const originalValue = useRef(value);

  // Use hooks
  const resolvedTheme = useThemeResolution(theme);
  const [state, actions] = useEditorState(language as SupportedLanguage, value);
  const handlers = useEditorHandlers({
    currentLanguage: state.currentLanguage,
    currentValue: state.currentValue,
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
    actions,
  });

  // Merge user icons with defaults
  const icons = getIcons(userIcons);

  // Use mount handlers
  const { handleBeforeMount, handleMount } = useEditorMountHandlers(
    onMount,
    beforeMount,
    readonlyRanges || [],
    showStatusBar,
    actions,
    originalValue,
    editorRef,
    monacoRef,
    readonlyCleanupRef
  );

  // Handle editor value changes
  const handleChange = useCallback(
    (
      newValue: string | undefined,
      event?: editor.IModelContentChangedEvent
    ) => {
      if (newValue !== undefined) {
        actions.setCurrentValue(newValue);
        onChange?.(newValue, event);
      }
    },
    [onChange, actions]
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

  // Update language when prop changes
  useEffect(() => {
    actions.setCurrentLanguage(language as SupportedLanguage);
  }, [language, actions]);

  // Update value when prop changes
  useEffect(() => {
    actions.setCurrentValue(value);
    originalValue.current = value;
    actions.setIsDirty(false);
  }, [value, actions]);

  // Get language configuration
  const languageConfig = getLanguageConfig(state.currentLanguage);

  // Prepare Monaco editor options
  const editorOptions: editor.IStandaloneEditorConstructionOptions = {
    ...DEFAULT_EDITOR_OPTIONS,
    ...options,
  };

  // Get current theme name
  const currentThemeName =
    resolvedTheme === 'dark' ? 'mino-dark' : 'mino-light';

  // Prepare container classes
  const containerClasses = getContainerClasses(
    resolvedTheme,
    showToolbar,
    showStatusBar,
    showActionButtons,
    isFullScreen,
    overrideStyles,
    className
  );

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
          currentLanguage={state.currentLanguage}
          currentTheme={theme}
          icons={icons}
          isFormatting={state.isFormatting}
          isFullScreen={isFullScreen}
          onAutoCorrectToggle={
            showAutoCorrectToggle ? handlers.handleAutoCorrectToggle : undefined
          }
          onFormat={showFormatButton ? handlers.handleFormat : undefined}
          onFullScreenToggle={
            showFullScreenButton ? handlers.handleFullScreenToggle : undefined
          }
          onLanguageChange={
            showLanguageSwitcher ? handlers.handleLanguageChange : undefined
          }
          onReset={showResetButton ? handlers.handleReset : undefined}
          onThemeChange={showThemeSwitcher ? onThemeChange : undefined}
          showAutoCorrectToggle={showAutoCorrectToggle}
          showFormatButton={showFormatButton}
          showFullScreenButton={showFullScreenButton}
          showLanguageSwitcher={showLanguageSwitcher}
          showResetButton={showResetButton}
          showResetConfirmation={showResetConfirmation}
          showThemeSwitcher={showThemeSwitcher}
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
          value={state.currentValue}
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
            isRunning={state.isRunning}
            isSubmitting={state.isSubmitting}
            onRun={onRun ? handlers.handleRun : undefined}
            onSubmit={onSubmit ? handlers.handleSubmit : undefined}
            showRunButton={!!onRun}
            showSubmitButton={!!onSubmit}
          />
        </div>
      )}

      {showStatusBar && (
        <StatusBar
          isDirty={state.isDirty}
          isReadOnly={editorOptions.readOnly}
          language={state.currentLanguage}
          position={state.cursorPosition}
          totalLines={state.totalLines}
        />
      )}
    </div>
  );
};

export default CodeEditor;
