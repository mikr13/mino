# Mino Code Editor

A reusable React component library for LeetCode-style code editor using Monaco Editor. Designed for easy integration into coding interview platforms, educational tools, and practice environments.

[![npm version](https://badge.fury.io/js/mino.svg)](https://badge.fury.io/js/mino)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

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

## 📖 Documentation

View the interactive documentation and examples at: [https://mikr13.github.io/mino/](https://mikr13.github.io/mino/)

## 🚀 Installation

```bash
npm install mino
```

## 📦 Usage

```jsx
import { CodeEditor } from 'mino';
import 'mino/style.css';

function App() {
  return (
    <CodeEditor
      language="javascript"
      value="console.log('Hello, World!');"
      onChange={(value) => console.log(value)}
    />
  );
}
```

## 🎯 Features

- **Monaco Editor Integration**: Full-featured code editor with syntax highlighting
- **Multiple Languages**: Support for JavaScript, TypeScript, Python, Java, C++, and more
- **Customizable Themes**: Light and dark themes with custom styling options
- **Auto-formatting**: Built-in code formatting with Prettier
- **Type Safety**: Full TypeScript support
- **Responsive Design**: Mobile-friendly responsive layout
- **Accessibility**: ARIA compliant and keyboard navigation support

## 🛠️ Development

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+

### Setup

```bash
# Clone the repository
git clone https://github.com/mikr13/mino.git
cd mino

# Install dependencies
bun install

# Start development server
bun run dev
```

### Available Scripts

- `bun run dev` - Start Ladle development server
- `bun run build` - Build the library
- `bun run build-story` - Build Ladle documentation
- `bun run preview-story` - Preview built documentation
- `bun run lint` - Run linter
- `bun run format` - Format code
- `bun run type-check` - Run TypeScript checks

## 📋 API Reference

### CodeEditor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `""` | The code content |
| `language` | `string` | `"javascript"` | Programming language |
| `theme` | `"light" \| "dark"` | `"light"` | Editor theme |
| `onChange` | `(value: string) => void` | - | Callback when content changes |
| `onMount` | `(editor: monaco.editor.IStandaloneCodeEditor) => void` | - | Callback when editor mounts |
| `readOnly` | `boolean` | `false` | Whether editor is read-only |
| `height` | `string \| number` | `400` | Editor height |
| `width` | `string \| number` | `"100%"` | Editor width |

## 📦 Publishing

### NPM Publishing

The package is automatically published to NPM when you create a new release:

1. **Manual Release**: Use GitHub Actions workflow
   - Go to Actions → "Publish to NPM"
   - Click "Run workflow"
   - Select version type (patch/minor/major/prerelease)

2. **Tag-based Release**: Push a git tag

   ```bash
   git tag v1.0.1
   git push origin v1.0.1
   ```

### Prerequisites for Publishing

1. **NPM Token**: Add `NPM_TOKEN` to GitHub repository secrets
   - Generate token at [npmjs.com](https://www.npmjs.com/settings/tokens)
   - Add as repository secret in GitHub

2. **GitHub Pages**: Enable GitHub Pages in repository settings
   - Go to Settings → Pages
   - Source: GitHub Actions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - The code editor that powers VS Code
- [Ladle](https://ladle.dev/) - Fast and lightweight tool for developing and testing React components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
