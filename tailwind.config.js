/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                // CSS variables for theme customization
                'editor-bg': 'var(--mino-editor-bg, #ffffff)',
                'editor-bg-dark': 'var(--mino-editor-bg-dark, #1e1e1e)',
                'editor-border': 'var(--mino-editor-border, #e2e8f0)',
                'editor-border-dark': 'var(--mino-editor-border-dark, #374151)',
                'editor-text': 'var(--mino-editor-text, #1a202c)',
                'editor-text-dark': 'var(--mino-editor-text-dark, #f7fafc)',
                'editor-accent': 'var(--mino-editor-accent, #3182ce)',
                'editor-accent-dark': 'var(--mino-editor-accent-dark, #63b3ed)',
                'readonly-bg': 'var(--mino-readonly-bg, #f7fafc)',
                'readonly-bg-dark': 'var(--mino-readonly-bg-dark, #2d3748)',
            },
            fontFamily: {
                'mono': 'var(--mino-font-mono, "Fira Code", "Monaco", "Cascadia Code", "Roboto Mono", monospace)',
            },
            fontSize: {
                'editor': 'var(--mino-font-size, 14px)',
            },
        },
    },
    plugins: [],
    darkMode: 'class',
}; 
