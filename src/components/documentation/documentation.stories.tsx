import '@/index.css';
import type { Story } from '@ladle/react';

export const GettingStarted: Story = () => (
  <div className="mino-doc-container">
    <h1 className="mino-doc-heading-1">
      Mino - Code Editor Documentation
    </h1>

    <div className='mino-doc-alert mino-doc-alert-info mino-doc-mb-6'>
      <div className="mino-doc-flex">
        <div className="mino-doc-ml-3">
          <p className='mino-doc-alert-text'>
            <strong>Welcome to Mino Code Editor!</strong> This is an interactive
            documentation built with Ladle. Use the sidebar to explore different
            components and examples.
          </p>
        </div>
      </div>
    </div>

    <h2 className="mino-doc-heading-2">
      🚀 Quick Start
    </h2>

    <div className='mino-doc-code-block mino-doc-mb-6'>
      <div className="mino-doc-code-comment"># Install the package</div>
      <div className="mino-doc-code-command">npm install @mikr13/mino</div>
    </div>

    <h3 className='mino-doc-heading-3'>
      Basic Usage
    </h3>

    <div className='mino-doc-code-block mino-doc-mb-6'>
      <pre>{`import { CodeEditor } from '@mikr13/mino';
import '@mikr13/mino/style.css';

function App() {
  return (
    <CodeEditor
      language="javascript"
      value="console.log('Hello, World!');"
      onChange={(value) => console.log(value)}
    />
  );
}`}</pre>
    </div>

    <h2 className="mino-doc-heading-2">
      🎯 Features
    </h2>

    <div className="mino-doc-grid mino-doc-grid-2 mino-doc-mb-6">
      <div className='mino-doc-card'>
        <h4 className="mino-doc-card-title">
          🎨 Monaco Editor Integration
        </h4>
        <p className='mino-doc-card-text'>
          Full-featured code editor with syntax highlighting, powered by the
          same editor used in VS Code.
        </p>
      </div>

      <div className='mino-doc-card'>
        <h4 className="mino-doc-card-title">
          🌐 Multiple Languages
        </h4>
        <p className='mino-doc-card-text'>
          Support for JavaScript, TypeScript, Python, Java, C++, and many more
          programming languages.
        </p>
      </div>

      <div className='mino-doc-card'>
        <h4 className="mino-doc-card-title">
          🎭 Customizable Themes
        </h4>
        <p className='mino-doc-card-text'>
          Light and dark themes with custom styling options to match your
          application's design.
        </p>
      </div>

      <div className='mino-doc-card'>
        <h4 className="mino-doc-card-title">
          ✨ Auto-formatting
        </h4>
        <p className='mino-doc-card-text'>
          Built-in code formatting with Prettier integration for clean,
          consistent code.
        </p>
      </div>

      <div className='mino-doc-card'>
        <h4 className="mino-doc-card-title">
          🔒 Type Safety
        </h4>
        <p className='mino-doc-card-text'>
          Full TypeScript support with comprehensive type definitions for better
          development experience.
        </p>
      </div>

      <div className='mino-doc-card'>
        <h4 className="mino-doc-card-title">
          ♿ Accessibility
        </h4>
        <p className='mino-doc-card-text'>
          ARIA compliant with keyboard navigation support for inclusive user
          experiences.
        </p>
      </div>
    </div>

    <h2 className="mino-doc-heading-2">
      📋 API Reference
    </h2>

    <div className='mino-doc-table-container mino-doc-mb-6'>
      <table className="mino-doc-table mino-doc-min-w-full">
        <thead className="mino-doc-table-header">
          <tr>
            <th className='mino-doc-table-header-cell'>
              Prop
            </th>
            <th className='mino-doc-table-header-cell'>
              Type
            </th>
            <th className='mino-doc-table-header-cell'>
              Default
            </th>
            <th className='mino-doc-table-header-cell'>
              Description
            </th>
          </tr>
        </thead>
        <tbody className='mino-doc-table-body mino-doc-divide-y'>
          <tr>
            <td className='mino-doc-table-cell mino-doc-table-cell-mono mino-doc-whitespace-nowrap'>
              value
            </td>
            <td className='mino-doc-table-cell mino-doc-table-cell-mono mino-doc-table-cell-muted mino-doc-whitespace-nowrap'>
              string
            </td>
            <td className='mino-doc-table-cell mino-doc-table-cell-mono mino-doc-table-cell-muted mino-doc-whitespace-nowrap'>
              ""
            </td>
            <td className='mino-doc-table-cell'>
              The code content
            </td>
          </tr>
          <tr>
            <td className='mino-doc-table-cell mino-doc-table-cell-mono mino-doc-whitespace-nowrap'>
              language
            </td>
            <td className='mino-doc-table-cell mino-doc-table-cell-mono mino-doc-table-cell-muted mino-doc-whitespace-nowrap'>
              string
            </td>
            <td className='mino-doc-table-cell mino-doc-table-cell-mono mino-doc-table-cell-muted mino-doc-whitespace-nowrap'>
              "javascript"
            </td>
            <td className='mino-doc-table-cell'>
              Programming language
            </td>
          </tr>
          <tr>
            <td className='mino-doc-table-cell mino-doc-table-cell-mono mino-doc-whitespace-nowrap'>
              theme
            </td>
            <td className='mino-doc-table-cell mino-doc-table-cell-mono mino-doc-table-cell-muted mino-doc-whitespace-nowrap'>
              "light" | "dark"
            </td>
            <td className='mino-doc-table-cell mino-doc-table-cell-mono mino-doc-table-cell-muted mino-doc-whitespace-nowrap'>
              "light"
            </td>
            <td className='mino-doc-table-cell'>
              Editor theme
            </td>
          </tr>
          <tr>
            <td className='mino-doc-table-cell mino-doc-table-cell-mono mino-doc-whitespace-nowrap'>
              onChange
            </td>
            <td className='mino-doc-table-cell mino-doc-table-cell-mono mino-doc-table-cell-muted mino-doc-whitespace-nowrap'>
              (value: string) =&gt; void
            </td>
            <td className='mino-doc-table-cell mino-doc-table-cell-mono mino-doc-table-cell-muted mino-doc-whitespace-nowrap'>
              -
            </td>
            <td className='mino-doc-table-cell'>
              Callback when content changes
            </td>
          </tr>
          <tr>
            <td className='mino-doc-table-cell mino-doc-table-cell-mono mino-doc-whitespace-nowrap'>
              readOnly
            </td>
            <td className='mino-doc-table-cell mino-doc-table-cell-mono mino-doc-table-cell-muted mino-doc-whitespace-nowrap'>
              boolean
            </td>
            <td className='mino-doc-table-cell mino-doc-table-cell-mono mino-doc-table-cell-muted mino-doc-whitespace-nowrap'>
              false
            </td>
            <td className='mino-doc-table-cell'>
              Whether editor is read-only
            </td>
          </tr>
          <tr>
            <td className='mino-doc-table-cell mino-doc-table-cell-mono mino-doc-whitespace-nowrap'>
              height
            </td>
            <td className='mino-doc-table-cell mino-doc-table-cell-mono mino-doc-table-cell-muted mino-doc-whitespace-nowrap'>
              string | number
            </td>
            <td className='mino-doc-table-cell mino-doc-table-cell-mono mino-doc-table-cell-muted mino-doc-whitespace-nowrap'>
              400
            </td>
            <td className='mino-doc-table-cell'>
              Editor height
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 className="mino-doc-heading-2">
      🎨 Styling & Customization
    </h2>

    <h3 className='mino-doc-heading-3'>
      CSS Variables
    </h3>

    <p className="mino-doc-mb-4">
      Mino uses CSS variables for theming and customization. You can override these variables in your own CSS to customize the appearance:
    </p>

    <div className='mino-doc-code-block mino-doc-mb-6'>
      <pre>{`:root {
  /* Core Editor Variables */
  --mino-font-mono: "Your Custom Font", monospace;
  --mino-font-size: 16px;

  /* Editor Theme */
  --mino-editor-bg: #fafafa;
  --mino-editor-text: #2d3748;
  --mino-editor-border: #cbd5e0;

  /* Custom Toolbar Colors */
  --mino-toolbar-bg: #f7fafc;
  --mino-toolbar-text: #4a5568;
}`}</pre>
    </div>

    <h3 className='mino-doc-heading-3'>
      Theme Customization
    </h3>

    <p className="mino-doc-mb-4">
      Mino supports light and dark themes out of the box. You can also create your own theme by overriding the theme-specific variables:
    </p>

    <div className='mino-doc-code-block mino-doc-mb-6'>
      <pre>{`/* Custom Dark Theme */
.mino-theme-dark {
  --mino-editor-bg: #1a202c;
  --mino-editor-text: #f7fafc;
  --mino-editor-border: #4a5568;
  --mino-readonly-bg: #2d3748;
}

/* Custom Light Theme */
.mino-theme-light {
  --mino-editor-bg: #ffffff;
  --mino-editor-text: #1a202c;
  --mino-editor-border: #e2e8f0;
  --mino-readonly-bg: #f7fafc;
}`}</pre>
    </div>

    <h3 className='mino-doc-heading-3'>
      Component-Specific Styling
    </h3>

    <div className="mino-doc-grid mino-doc-grid-2 mino-doc-mb-6">
      <div className='mino-doc-card'>
        <h4 className="mino-doc-card-title">
          Toolbar Customization
        </h4>
        <div className='mino-doc-code-block'>
          <pre>{`/* Custom Toolbar */
.mino-toolbar {
  --mino-toolbar-height: 56px;
  --mino-toolbar-padding: 1rem;
  border-bottom: 2px solid #e2e8f0;
}`}</pre>
        </div>
      </div>

      <div className='mino-doc-card'>
        <h4 className="mino-doc-card-title">
          Status Bar Styling
        </h4>
        <div className='mino-doc-code-block'>
          <pre>{`/* Custom Status Bar */
.mino-status-bar {
  --mino-status-height: 40px;
  --mino-status-bg: #f8fafc;
  border-top: 2px solid #e2e8f0;
}`}</pre>
        </div>
      </div>
    </div>

    <h3 className='mino-doc-heading-3'>
      Available CSS Variables
    </h3>

    <div className='mino-doc-table-container mino-doc-mb-6'>
      <table className="mino-doc-table">
        <thead>
          <tr>
            <th className='mino-doc-table-header-cell'>Variable</th>
            <th className='mino-doc-table-header-cell'>Default Value</th>
            <th className='mino-doc-table-header-cell'>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='mino-doc-table-cell mino-doc-table-cell-mono'>--mino-font-mono</td>
            <td className='mino-doc-table-cell mino-doc-table-cell-mono'>"Fira Code", monospace</td>
            <td className='mino-doc-table-cell'>Editor font family</td>
          </tr>
          <tr>
            <td className='mino-doc-table-cell mino-doc-table-cell-mono'>--mino-font-size</td>
            <td className='mino-doc-table-cell mino-doc-table-cell-mono'>14px</td>
            <td className='mino-doc-table-cell'>Base font size</td>
          </tr>
          <tr>
            <td className='mino-doc-table-cell mino-doc-table-cell-mono'>--mino-editor-bg</td>
            <td className='mino-doc-table-cell mino-doc-table-cell-mono'>#ffffff</td>
            <td className='mino-doc-table-cell'>Editor background color</td>
          </tr>
          <tr>
            <td className='mino-doc-table-cell mino-doc-table-cell-mono'>--mino-toolbar-height</td>
            <td className='mino-doc-table-cell mino-doc-table-cell-mono'>48px</td>
            <td className='mino-doc-table-cell'>Toolbar height</td>
          </tr>
          <tr>
            <td className='mino-doc-table-cell mino-doc-table-cell-mono'>--mino-status-height</td>
            <td className='mino-doc-table-cell mino-doc-table-cell-mono'>32px</td>
            <td className='mino-doc-table-cell'>Status bar height</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 className="mino-doc-heading-2">
      🎭 Component Variations
    </h2>

    <h3 className='mino-doc-heading-3'>
      Toolbar Configurations
    </h3>

    <div className='mino-doc-code-block mino-doc-mb-6'>
      <pre>{`// Minimal Toolbar
<CodeEditor
  showToolbar={true}
  showLanguageSwitcher={true}
  showFormatButton={true}
  showAutoCorrectToggle={false}
  showFullScreenButton={false}
  showResetButton={false}
/>

// Full Featured Toolbar
<CodeEditor
  showToolbar={true}
  showLanguageSwitcher={true}
  showFormatButton={true}
  showAutoCorrectToggle={true}
  showFullScreenButton={true}
  showResetButton={true}
  showThemeSwitcher={true}
/>`}</pre>
    </div>

    <h3 className='mino-doc-heading-3'>
      Custom Icons
    </h3>

    <div className='mino-doc-code-block mino-doc-mb-6'>
      <pre>{`// Custom Icon Components
const CustomFormatIcon = () => <span>🎨</span>;
const CustomRunIcon = () => <span>▶️</span>;

<CodeEditor
  icons={{
    format: CustomFormatIcon,
    run: CustomRunIcon,
    submit: CustomSubmitIcon,
    reset: CustomResetIcon
  }}
  showActionButtons={true}
  showToolbar={true}
/>`}</pre>
    </div>

    <h3 className='mino-doc-heading-3'>
      Readonly Ranges
    </h3>

    <div className='mino-doc-code-block mino-doc-mb-6'>
      <pre>{`// Define readonly ranges
const readonlyRanges = [
  { startLine: 1, endLine: 2 }, // Header
  { startLine: 6, endLine: 8 }, // Footer
];

<CodeEditor
  readonlyRanges={readonlyRanges}
  value={code}
/>`}</pre>
    </div>

    <div className='mino-doc-alert mino-doc-alert-info mino-doc-mb-6'>
      <div className="mino-doc-flex">
        <div className="mino-doc-ml-3">
          <p className='mino-doc-alert-text'>
            <strong>Styling Tip:</strong> Readonly ranges can be customized using the
            <code className='mino-doc-inline-code'>.readonly-range</code> class and
            its pseudo-elements.
          </p>
        </div>
      </div>
    </div>

    <h2 className="mino-doc-heading-2">
      🛠️ Development
    </h2>

    <div className='mino-doc-alert mino-doc-alert-warning mino-doc-mb-6'>
      <div className="mino-doc-flex">
        <div className="mino-doc-ml-3">
          <p className="mino-doc-alert-text">
            <strong>Prerequisites:</strong> Make sure you have Bun installed for
            the best development experience.
          </p>
        </div>
      </div>
    </div>

    <div className='mino-doc-code-block mino-doc-mb-6'>
      <div className="mino-doc-code-comment"># Clone the repository</div>
      <div className="mino-doc-code-command">
        git clone https://github.com/mikr13/mino.git
      </div>
      <div className="mino-doc-code-command">cd mino</div>
      <div className="mino-doc-code-comment"># Install dependencies</div>
      <div className="mino-doc-code-command">bun install</div>
      <div className="mino-doc-code-comment"># Start development server</div>
      <div className="mino-doc-code-command">bun run dev</div>
    </div>

    <h3 className='mino-doc-heading-3'>
      Available Scripts
    </h3>

    <div className='mino-doc-card mino-doc-mb-6'>
      <ul className="mino-doc-list mino-doc-space-y-2">
        <li className="mino-doc-list-item">
          <code className='mino-doc-inline-code'>
            bun run dev
          </code>{' '}
          - Start Ladle development server
        </li>
        <li className="mino-doc-list-item">
          <code className='mino-doc-inline-code'>
            bun run build
          </code>{' '}
          - Build the library
        </li>
        <li className="mino-doc-list-item">
          <code className='mino-doc-inline-code'>
            bun run build:story
          </code>{' '}
          - Build Ladle documentation
        </li>
        <li className="mino-doc-list-item">
          <code className='mino-doc-inline-code'>
            bun run preview:story
          </code>{' '}
          - Preview built documentation
        </li>
        <li className="mino-doc-list-item">
          <code className='mino-doc-inline-code'>
            bun run lint
          </code>{' '}
          - Run linter
        </li>
        <li className="mino-doc-list-item">
          <code className='mino-doc-inline-code'>
            bun run format
          </code>{' '}
          - Format code
        </li>
      </ul>
    </div>

    <h2 className="mino-doc-heading-2">
      🔗 Links
    </h2>

    <div className="mino-doc-grid mino-doc-grid-3 mino-doc-mb-6">
      <a
        className='mino-doc-link mino-doc-link-github mino-doc-transition-colors'
        href="https://github.com/mikr13/mino"
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="mino-doc-link-title">📦 GitHub Repository</div>
        <div className='mino-doc-link-description'>
          Source code, issues, and contributions
        </div>
      </a>

      <a
        className="mino-doc-link mino-doc-link-npm mino-doc-transition-colors"
        href="https://www.npmjs.com/package/@mikr13/mino"
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="mino-doc-link-title">📦 NPM Package</div>
        <div className="mino-doc-link-description">Install and version info</div>
      </a>

      <a
        className="mino-doc-link mino-doc-link-docs mino-doc-transition-colors"
        href="https://mikr13.github.io/mino/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="mino-doc-link-title">📚 Live Documentation</div>
        <div className="mino-doc-link-description">
          Interactive examples and demos
        </div>
      </a>
    </div>

    <h2 className="mino-doc-heading-2">
      🤝 Contributing
    </h2>

    <div className='mino-doc-alert mino-doc-alert-success mino-doc-mb-6'>
      <div className="mino-doc-flex">
        <div className="mino-doc-ml-3">
          <p className='mino-doc-alert-text'>
            We welcome contributions! Please feel free to submit issues, feature
            requests, or pull requests on GitHub.
          </p>
        </div>
      </div>
    </div>

    <div className='mino-doc-footer mino-doc-mt-8 mino-doc-pt-8 mino-doc-text-center'>
      <p className="mino-doc-footer-text">
        Made with ❤️ by{' '}
        <a
          className='mino-doc-footer-link'
          href="https://github.com/mikr13"
        >
          mikr13
        </a>
      </p>
      <p className='mino-doc-footer-text-small mino-doc-mt-2'>
        Licensed under MIT • Built with Ladle & Monaco Editor
      </p>
    </div>
  </div>
);

GettingStarted.meta = {
  title: 'Welcome',
};
