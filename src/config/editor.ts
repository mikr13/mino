import type { editor } from 'monaco-editor';

/**
 * Default editor options
 */
export const DEFAULT_EDITOR_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
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
}; 
