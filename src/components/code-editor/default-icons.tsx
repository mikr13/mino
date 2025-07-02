import type { EditorIcons } from '@/types';
import {
  ChevronDownIcon,
  CodeIcon,
  LanguagesIcon,
  MaximizeIcon,
  MinimizeIcon,
  MoonIcon,
  PlayIcon,
  RotateCcwIcon,
  SendIcon,
  ZapIcon,
} from 'lucide-react';

/**
 * Default icon set for the enhanced code editor
 */
export const defaultIcons: Required<EditorIcons> = {
  format: CodeIcon,
  reset: RotateCcwIcon,
  fullScreen: MaximizeIcon,
  exitFullScreen: MinimizeIcon,
  run: PlayIcon,
  submit: SendIcon,
  autoCorrect: ZapIcon,
  language: LanguagesIcon,
  chevronDown: ChevronDownIcon,
  theme: MoonIcon,
};

/**
 * Get merged icons with user overrides
 */
export const getIcons = (userIcons?: EditorIcons): Required<EditorIcons> => {
  return {
    ...defaultIcons,
    ...userIcons,
  };
};
