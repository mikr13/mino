import { DEFAULT_CODE_TEMPLATES } from '@/config/languages';
import type { CodeEditorProps, SupportedLanguage } from '@/types';
import { formatCode, supportsFormatting } from '@/utils/formatter';
import type { editor } from 'monaco-editor';
import { useCallback } from 'react';
import type { EditorStateActions } from './use-editor-state';

type UseEditorHandlersProps = {
  currentLanguage: SupportedLanguage;
  currentValue: string;
  onChange?: CodeEditorProps['onChange'];
  onFormat?: CodeEditorProps['onFormat'];
  onReset?: CodeEditorProps['onReset'];
  onRun?: CodeEditorProps['onRun'];
  onSubmit?: CodeEditorProps['onSubmit'];
  onLanguageChange?: CodeEditorProps['onLanguageChange'];
  onAutoCorrectToggle?: CodeEditorProps['onAutoCorrectToggle'];
  onFullScreenToggle?: CodeEditorProps['onFullScreenToggle'];
  defaultCode?: CodeEditorProps['defaultCode'];
  editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;
  originalValue: React.MutableRefObject<string | undefined>;
  actions: EditorStateActions;
};

/**
 * Hook to manage editor event handlers
 */
export const useEditorHandlers = ({
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
  actions,
}: UseEditorHandlersProps) => {
  const {
    setCurrentValue,
    setCurrentLanguage,
    setIsDirty,
    setIsFormatting,
    setIsRunning,
    setIsSubmitting,
  } = actions;

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
