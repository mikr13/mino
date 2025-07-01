import type { CursorPosition, SupportedLanguage } from '@/types';
import { useState } from 'react';

export type EditorState = {
  currentLanguage: SupportedLanguage;
  currentValue: string;
  cursorPosition: CursorPosition;
  isDirty: boolean;
  isFormatting: boolean;
  isRunning: boolean;
  isSubmitting: boolean;
  totalLines: number;
};

export type EditorStateActions = {
  setCurrentLanguage: (lang: SupportedLanguage) => void;
  setCurrentValue: (value: string) => void;
  setCursorPosition: (position: CursorPosition) => void;
  setIsDirty: (dirty: boolean) => void;
  setIsFormatting: (formatting: boolean) => void;
  setIsRunning: (running: boolean) => void;
  setIsSubmitting: (submitting: boolean) => void;
  setTotalLines: (lines: number) => void;
};

/**
 * Hook to manage editor state
 */
export const useEditorState = (
  initialLanguage: SupportedLanguage,
  initialValue: string
): [EditorState, EditorStateActions] => {
  const [currentLanguage, setCurrentLanguage] =
    useState<SupportedLanguage>(initialLanguage);
  const [currentValue, setCurrentValue] = useState(initialValue);
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({
    lineNumber: 1,
    column: 1,
  });
  const [isDirty, setIsDirty] = useState(false);
  const [isFormatting, setIsFormatting] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalLines, setTotalLines] = useState(0);

  const state: EditorState = {
    currentLanguage,
    currentValue,
    cursorPosition,
    isDirty,
    isFormatting,
    isRunning,
    isSubmitting,
    totalLines,
  };

  const actions: EditorStateActions = {
    setCurrentLanguage,
    setCurrentValue,
    setCursorPosition,
    setIsDirty,
    setIsFormatting,
    setIsRunning,
    setIsSubmitting,
    setTotalLines,
  };

  return [state, actions];
};
