import type { EditorIcons } from '@/types';
import {
    ChevronDown,
    Code,
    Languages,
    Maximize,
    Minimize,
    Play,
    RotateCcw,
    Send,
    Zap,
} from 'lucide-react';

/**
 * Default icon set for the enhanced code editor
 */
export const defaultIcons: Required<EditorIcons> = {
    format: Code,
    reset: RotateCcw,
    fullScreen: Maximize,
    exitFullScreen: Minimize,
    run: Play,
    submit: Send,
    autoCorrect: Zap,
    language: Languages,
    chevronDown: ChevronDown,
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
