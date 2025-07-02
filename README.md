# Mino Code Editor

A reusable React component library for LeetCode-style code editor using Monaco Editor. Designed for easy integration into coding interview platforms, educational tools, and practice environments.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📖 Documentation

Explore our comprehensive documentation:

- 🚀 [Getting Started Guide](https://mikr13.github.io/mino/?story=documentation--getting-started) - Quick installation and basic setup
- 🎯 [Feature Overview](https://mikr13.github.io/mino/?story=documentation--getting-started#features) - Detailed feature list and capabilities
- 📋 [API Reference](https://mikr13.github.io/mino/?story=documentation--getting-started#api-reference) - Complete props and methods documentation
- 🎨 [Styling Guide](https://mikr13.github.io/mino/?story=documentation--getting-started#styling--customization) - Theme customization and CSS variables
- 🧩 [Component Examples](https://mikr13.github.io/mino/?path=/story/code-editor--basic) - Interactive component demos
- 🛠️ [Development Guide](https://mikr13.github.io/mino/?story=documentation--getting-started#development) - Contributing and local setup

## 🚀 Quick Start

```bash
# Install the package
npm install @mikr13/mino

# Or with pnpm
pnpm add @mikr13/mino

# Or with bun
bun add @mikr13/mino
```

```jsx
import { CodeEditor } from '@mikr13/mino';
import '@mikr13/mino/style.css';

function App() {
  const [code, setCode] = useState('console.log("Hello, World!");');
  
  return (
    <CodeEditor
      language="javascript"
      value={code}
      onChange={setCode}
      showToolbar={true}
      showStatusBar={true}
    />
  );
}
```

## 🎯 Key Features

- **📝 Advanced Code Editing**
  - Monaco Editor integration with full IDE features
  - Multi-language syntax highlighting
  - IntelliSense and auto-completion
  - Error diagnostics and quick fixes

- **🎨 Rich Customization**
  - [Light/Dark themes](https://mikr13.github.io/mino/?path=/story/code-editor--theme-switcher)
  - [Custom CSS variables](https://mikr13.github.io/mino/?story=documentation--getting-started#styling--customization)
  - [Configurable toolbar](https://mikr13.github.io/mino/?path=/story/code-editor--minimal-toolbar)
  - [Custom icons support](https://mikr13.github.io/mino/?path=/story/code-editor--custom-icons)

- **🛠️ Developer Experience**
  - [TypeScript support](https://mikr13.github.io/mino/?path=/story/code-editor--basic)
  - [Readonly ranges](https://mikr13.github.io/mino/?path=/story/code-editor--with-readonly-ranges)
  - [Format on demand](https://mikr13.github.io/mino/?path=/story/code-editor--with-toolbar)
  - [Language switching](https://mikr13.github.io/mino/?path=/story/code-editor--language-comparison)

- **🎭 UI Components**
  - [Customizable toolbar](https://mikr13.github.io/mino/?path=/story/code-editor--with-toolbar)
  - [Status bar](https://mikr13.github.io/mino/?path=/story/code-editor--leetcode-style)
  - [Action buttons](https://mikr13.github.io/mino/?path=/story/code-editor--leetcode-style)
  - [Full-screen mode](https://mikr13.github.io/mino/?path=/story/code-editor--full-screen-demo)

## 🎨 Styling & Customization

Mino provides extensive styling options through CSS variables:

```css
/* Custom theme example */
:root {
  --mino-editor-bg: #fafafa;
  --mino-editor-text: #2d3748;
  --mino-toolbar-bg: #f7fafc;
  --mino-toolbar-text: #4a5568;
}
```

[View all styling options →](https://mikr13.github.io/mino/?story=documentation--getting-started#styling--customization)

## 🧩 Component Examples

- [Basic Editor](https://mikr13.github.io/mino/?path=/story/code-editor--basic) - Simple code editor setup
- [LeetCode Style](https://mikr13.github.io/mino/?path=/story/code-editor--leetcode-style) - Complete interview platform setup
- [Theme Switcher](https://mikr13.github.io/mino/?path=/story/code-editor--theme-switcher) - Dark/Light theme demo
- [Language Comparison](https://mikr13.github.io/mino/?path=/story/code-editor--language-comparison) - Multi-language support
- [All Features](https://mikr13.github.io/mino/?path=/story/code-editor--all-features) - Full feature showcase

## 🛠️ Development

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 22+

### Local Setup

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
- `bun run build:story` - Build documentation
- `bun run preview:story` - Preview documentation
- `bun run lint` - Run linter
- `bun run format` - Format code
- `bun run type-check` - Run TypeScript checks

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See our [Contributing Guide](https://mikr13.github.io/mino/?story=documentation--getting-started#contributing) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - The code editor that powers VS Code
- [Ladle](https://ladle.dev/) - Development and testing environment
- [Biome](https://biomejs.dev/) - Toolchain for web projects
- [TypeScript](https://www.typescriptlang.org/) - Type safety and developer experience
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
