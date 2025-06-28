# Mino Code Editor

A reusable React component library that provides a LeetCode-style code editor experience using Monaco Editor. Built with TypeScript, styled with TailwindCSS, and designed for easy integration into coding interview platforms, educational tools, and practice environments.

## Features

- 🚀 **Monaco Editor Integration**: Powered by the same editor engine that powers VS Code
- 🎨 **Customizable Themes**: Built-in light/dark themes with CSS variable overrides
- 🔒 **Protected Code Blocks**: Readonly ranges to prevent editing of template code
- 🌍 **Multi-Language Support**: JavaScript, Python, TypeScript, Java, C++, and C
- ⚡ **Performance Optimized**: Tree-shakable, lightweight, and fast
- 🎛️ **Flexible Configuration**: Extensive options for customization
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ♿ **Accessibility**: Built with accessibility in mind
- 🎯 **TypeScript Ready**: Full TypeScript support with comprehensive types

## Installation

```bash
npm install mino-code-editor
# or
yarn add mino-code-editor
# or
pnpm add mino-code-editor
```

### Peer Dependencies

This package requires React 18+ as a peer dependency:

```bash
npm install react react-dom
```

## Basic Usage

```tsx
import { CodeEditor } from 'mino-code-editor';
import { useState } from 'react';

function App() {
  const [code, setCode] = useState('console.log("Hello, World!");');

  return (
    <div style={{ height: '400px' }}>
      <CodeEditor
        language="javascript"
        value={code}
        onChange={setCode}
      />
    </div>
  );
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `language` | `SupportedLanguage \| string` | `'javascript'` | Programming language for syntax highlighting |
| `value` | `string` | - | Current code content |
| `onChange` | `(code: string, event?: IModelContentChangedEvent) => void` | - | Callback fired when code changes |
| `readonlyRanges` | `ReadonlyRange[]` | `[]` | Array of readonly ranges |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'auto'` | Theme preference |
| `height` | `string \| number` | `'100%'` | Editor height |
| `width` | `string \| number` | `'100%'` | Editor width |
| `className` | `string` | `''` | Additional CSS class |
| `style` | `CSSProperties` | - | Inline styles |
| `options` | `CodeEditorOptions` | `{}` | Monaco editor options |
| `overrideStyles` | `boolean` | `false` | Whether to override default styles |
| `loading` | `ReactNode` | `'Loading editor...'` | Loading placeholder |
| `onMount` | `(editor, monaco) => void` | - | Callback when editor mounts |
| `beforeMount` | `(monaco) => void` | - | Callback before editor mounts |
| `onValidate` | `(markers) => void` | - | Callback for validation |

### Types

```tsx
type SupportedLanguage = 'python' | 'javascript' | 'typescript' | 'java' | 'cpp' | 'c';

interface ReadonlyRange {
  startLine: number;
  endLine: number;
  startColumn?: number;
  endColumn?: number;
}

interface CodeEditorOptions {
  minimap?: boolean;
  lineNumbers?: boolean | 'on' | 'off' | 'relative' | 'interval';
  wordWrap?: boolean | 'on' | 'off' | 'wordWrapColumn' | 'bounded';
  readOnly?: boolean;
  fontSize?: number;
  tabSize?: number;
  // ... and more Monaco editor options
}
```

## Examples

### LeetCode-Style Template

```tsx
import { CodeEditor, ReadonlyRange } from 'mino-code-editor';
import { useState } from 'react';

function LeetCodeProblem() {
  const [code, setCode] = useState(`class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        """
        Given an array of integers nums and an integer target,
        return indices of the two numbers such that they add up to target.
        """
        # Write your solution here
        pass`);

  const readonlyRanges: ReadonlyRange[] = [
    { startLine: 1, endLine: 1 }, // Class declaration
    { startLine: 2, endLine: 6 }, // Function signature and docstring
  ];

  return (
    <CodeEditor
      language="python"
      value={code}
      onChange={setCode}
      readonlyRanges={readonlyRanges}
      height="400px"
    />
  );
}
```

### Custom Theme

```tsx
import { CodeEditor } from 'mino-code-editor';

function CustomThemeEditor() {
  return (
    <div style={{
      '--mino-editor-bg': '#2d3748',
      '--mino-editor-text': '#f7fafc',
      '--mino-font-mono': '"JetBrains Mono", monospace',
    }}>
      <CodeEditor
        language="javascript"
        value="const hello = 'world';"
        theme="dark"
        options={{
          fontSize: 16,
          minimap: false,
        }}
      />
    </div>
  );
}
```

### Multi-Language Support

```tsx
import { CodeEditor, getSupportedLanguages } from 'mino-code-editor';
import { useState } from 'react';

function MultiLanguageEditor() {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('console.log("Hello, World!");');

  return (
    <div>
      <select 
        value={language} 
        onChange={(e) => setLanguage(e.target.value)}
      >
        {getSupportedLanguages().map(lang => (
          <option key={lang.id} value={lang.id}>
            {lang.label}
          </option>
        ))}
      </select>
      
      <CodeEditor
        language={language}
        value={code}
        onChange={setCode}
      />
    </div>
  );
}
```

## Styling and Customization

### CSS Variables

You can customize the editor appearance using CSS variables:

```css
.my-editor {
  --mino-editor-bg: #ffffff;
  --mino-editor-bg-dark: #1a202c;
  --mino-editor-text: #1a202c;
  --mino-editor-text-dark: #f7fafc;
  --mino-editor-border: #e2e8f0;
  --mino-editor-border-dark: #374151;
  --mino-editor-accent: #3182ce;
  --mino-readonly-bg: #f7fafc;
  --mino-readonly-bg-dark: #2d3748;
  --mino-font-mono: "Fira Code", monospace;
  --mino-font-size: 14px;
}
```

### TailwindCSS Integration

The component uses TailwindCSS classes internally but can be styled with utility classes:

```tsx
<CodeEditor
  className="border-2 border-blue-500 rounded-lg shadow-lg"
  language="python"
  value={code}
  onChange={setCode}
/>
```

## Advanced Usage

### Readonly Ranges

Protect specific code sections from editing:

```tsx
const readonlyRanges = [
  { startLine: 1, endLine: 5 },        // Lines 1-5
  { startLine: 10, endLine: 10, startColumn: 1, endColumn: 20 }, // Partial line
];

<CodeEditor
  value={code}
  readonlyRanges={readonlyRanges}
  // ... other props
/>
```

### Monaco Editor Access

Access the underlying Monaco editor instance:

```tsx
<CodeEditor
  onMount={(editor, monaco) => {
    // Configure additional languages
    monaco.languages.register({ id: 'myCustomLanguage' });
    
    // Add custom actions
    editor.addAction({
      id: 'my-action',
      label: 'My Action',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK],
      run: (editor) => {
        console.log('Action executed!');
      }
    });
  }}
  // ... other props
/>
```

## Development

### Running Stories

```bash
npm run dev
```

This starts the Ladle development server with component stories.

### Building

```bash
npm run build
```

### Type Checking

```bash
npm run type-check
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - The code editor that powers VS Code
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Ladle](https://ladle.dev/) - Component development and testing
