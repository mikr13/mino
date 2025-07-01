import '@/index.css';
import type { Story } from '@ladle/react';

export const GettingStarted: Story = () => (
  <div className="prose prose-slate mx-auto max-w-4xl p-6">
    <h1 className="mb-6 font-bold text-4xl text-gray-900 dark:text-gray-100">
      Mino - Code Editor Documentation
    </h1>

    <div className='mb-6 border-blue-400 border-l-4 bg-blue-50 p-4 dark:bg-blue-900/20'>
      <div className="flex">
        <div className="ml-3">
          <p className='text-blue-700 text-sm dark:text-blue-300'>
            <strong>Welcome to Mino Code Editor!</strong> This is an interactive
            documentation built with Ladle. Use the sidebar to explore different
            components and examples.
          </p>
        </div>
      </div>
    </div>

    <h2 className="mb-4 font-semibold text-2xl text-gray-800 dark:text-gray-200">
      🚀 Quick Start
    </h2>

    <div className='mb-6 rounded-lg bg-gray-900 p-4 font-mono text-green-400 text-sm dark:bg-gray-800'>
      <div className="mb-2"># Install the package</div>
      <div className="text-white">npm install @mikr13/mino</div>
    </div>

    <h3 className='mb-3 font-semibold text-gray-800 text-xl dark:text-gray-200'>
      Basic Usage
    </h3>

    <div className='mb-6 overflow-x-auto rounded-lg bg-gray-900 p-4 font-mono text-gray-100 text-sm dark:bg-gray-800'>
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

    <h2 className="mb-4 font-semibold text-2xl text-gray-800 dark:text-gray-200">
      🎯 Features
    </h2>

    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-800'>
        <h4 className="mb-2 font-semibold text-gray-800 dark:text-gray-200">
          🎨 Monaco Editor Integration
        </h4>
        <p className='text-gray-600 text-sm dark:text-gray-400'>
          Full-featured code editor with syntax highlighting, powered by the
          same editor used in VS Code.
        </p>
      </div>

      <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-800'>
        <h4 className="mb-2 font-semibold text-gray-800 dark:text-gray-200">
          🌐 Multiple Languages
        </h4>
        <p className='text-gray-600 text-sm dark:text-gray-400'>
          Support for JavaScript, TypeScript, Python, Java, C++, and many more
          programming languages.
        </p>
      </div>

      <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-800'>
        <h4 className="mb-2 font-semibold text-gray-800 dark:text-gray-200">
          🎭 Customizable Themes
        </h4>
        <p className='text-gray-600 text-sm dark:text-gray-400'>
          Light and dark themes with custom styling options to match your
          application's design.
        </p>
      </div>

      <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-800'>
        <h4 className="mb-2 font-semibold text-gray-800 dark:text-gray-200">
          ✨ Auto-formatting
        </h4>
        <p className='text-gray-600 text-sm dark:text-gray-400'>
          Built-in code formatting with Prettier integration for clean,
          consistent code.
        </p>
      </div>

      <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-800'>
        <h4 className="mb-2 font-semibold text-gray-800 dark:text-gray-200">
          🔒 Type Safety
        </h4>
        <p className='text-gray-600 text-sm dark:text-gray-400'>
          Full TypeScript support with comprehensive type definitions for better
          development experience.
        </p>
      </div>

      <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-800'>
        <h4 className="mb-2 font-semibold text-gray-800 dark:text-gray-200">
          ♿ Accessibility
        </h4>
        <p className='text-gray-600 text-sm dark:text-gray-400'>
          ARIA compliant with keyboard navigation support for inclusive user
          experiences.
        </p>
      </div>
    </div>

    <h2 className="mb-4 font-semibold text-2xl text-gray-800 dark:text-gray-200">
      📋 API Reference
    </h2>

    <div className='mb-6 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800'>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className='px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider dark:text-gray-300'>
              Prop
            </th>
            <th className='px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider dark:text-gray-300'>
              Type
            </th>
            <th className='px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider dark:text-gray-300'>
              Default
            </th>
            <th className='px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider dark:text-gray-300'>
              Description
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200 bg-white dark:divide-gray-600 dark:bg-gray-800'>
          <tr>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-900 text-sm dark:text-gray-100'>
              value
            </td>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-500 text-sm dark:text-gray-400'>
              string
            </td>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-500 text-sm dark:text-gray-400'>
              ""
            </td>
            <td className='px-6 py-4 text-gray-900 text-sm dark:text-gray-100'>
              The code content
            </td>
          </tr>
          <tr>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-900 text-sm dark:text-gray-100'>
              language
            </td>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-500 text-sm dark:text-gray-400'>
              string
            </td>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-500 text-sm dark:text-gray-400'>
              "javascript"
            </td>
            <td className='px-6 py-4 text-gray-900 text-sm dark:text-gray-100'>
              Programming language
            </td>
          </tr>
          <tr>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-900 text-sm dark:text-gray-100'>
              theme
            </td>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-500 text-sm dark:text-gray-400'>
              "light" | "dark"
            </td>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-500 text-sm dark:text-gray-400'>
              "light"
            </td>
            <td className='px-6 py-4 text-gray-900 text-sm dark:text-gray-100'>
              Editor theme
            </td>
          </tr>
          <tr>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-900 text-sm dark:text-gray-100'>
              onChange
            </td>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-500 text-sm dark:text-gray-400'>
              (value: string) =&gt; void
            </td>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-500 text-sm dark:text-gray-400'>
              -
            </td>
            <td className='px-6 py-4 text-gray-900 text-sm dark:text-gray-100'>
              Callback when content changes
            </td>
          </tr>
          <tr>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-900 text-sm dark:text-gray-100'>
              readOnly
            </td>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-500 text-sm dark:text-gray-400'>
              boolean
            </td>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-500 text-sm dark:text-gray-400'>
              false
            </td>
            <td className='px-6 py-4 text-gray-900 text-sm dark:text-gray-100'>
              Whether editor is read-only
            </td>
          </tr>
          <tr>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-900 text-sm dark:text-gray-100'>
              height
            </td>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-500 text-sm dark:text-gray-400'>
              string | number
            </td>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-500 text-sm dark:text-gray-400'>
              400
            </td>
            <td className='px-6 py-4 text-gray-900 text-sm dark:text-gray-100'>
              Editor height
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 className="mb-4 font-semibold text-2xl text-gray-800 dark:text-gray-200">
      🛠️ Development
    </h2>

    <div className='mb-6 border-yellow-400 border-l-4 bg-yellow-50 p-4 dark:bg-yellow-900/20'>
      <div className="flex">
        <div className="ml-3">
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            <strong>Prerequisites:</strong> Make sure you have Bun installed for
            the best development experience.
          </p>
        </div>
      </div>
    </div>

    <div className='mb-6 rounded-lg bg-gray-900 p-4 font-mono text-green-400 text-sm dark:bg-gray-800'>
      <div className="mb-1"># Clone the repository</div>
      <div className="mb-3 text-white">
        git clone https://github.com/mikr13/mino.git
      </div>
      <div className="mb-3 text-white">cd mino</div>
      <div className="mb-1"># Install dependencies</div>
      <div className="mb-3 text-white">bun install</div>
      <div className="mb-1"># Start development server</div>
      <div className="text-white">bun run dev</div>
    </div>

    <h3 className='mb-3 font-semibold text-gray-800 text-xl dark:text-gray-200'>
      Available Scripts
    </h3>

    <div className='mb-6 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-800'>
      <ul className="space-y-2 font-mono text-sm">
        <li>
          <code className='rounded bg-gray-100 px-2 py-1 dark:bg-gray-700'>
            bun run dev
          </code>{' '}
          - Start Ladle development server
        </li>
        <li>
          <code className='rounded bg-gray-100 px-2 py-1 dark:bg-gray-700'>
            bun run build
          </code>{' '}
          - Build the library
        </li>
        <li>
          <code className='rounded bg-gray-100 px-2 py-1 dark:bg-gray-700'>
            bun run build:story
          </code>{' '}
          - Build Ladle documentation
        </li>
        <li>
          <code className='rounded bg-gray-100 px-2 py-1 dark:bg-gray-700'>
            bun run preview:story
          </code>{' '}
          - Preview built documentation
        </li>
        <li>
          <code className='rounded bg-gray-100 px-2 py-1 dark:bg-gray-700'>
            bun run lint
          </code>{' '}
          - Run linter
        </li>
        <li>
          <code className='rounded bg-gray-100 px-2 py-1 dark:bg-gray-700'>
            bun run format
          </code>{' '}
          - Format code
        </li>
      </ul>
    </div>

    <h2 className="mb-4 font-semibold text-2xl text-gray-800 dark:text-gray-200">
      🔗 Links
    </h2>

    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      <a
        className='rounded-lg bg-gray-900 p-4 text-white transition-colors hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700'
        href="https://github.com/mikr13/mino"
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="mb-2 font-semibold">📦 GitHub Repository</div>
        <div className='text-gray-300 text-sm dark:text-gray-400'>
          Source code, issues, and contributions
        </div>
      </a>

      <a
        className="rounded-lg bg-red-600 p-4 text-white transition-colors hover:bg-red-500"
        href="https://www.npmjs.com/package/@mikr13/mino"
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="mb-2 font-semibold">📦 NPM Package</div>
        <div className="text-red-100 text-sm">Install and version info</div>
      </a>

      <a
        className="rounded-lg bg-blue-600 p-4 text-white transition-colors hover:bg-blue-500"
        href="https://mikr13.github.io/mino/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="mb-2 font-semibold">📚 Live Documentation</div>
        <div className="text-blue-100 text-sm">
          Interactive examples and demos
        </div>
      </a>
    </div>

    <h2 className="mb-4 font-semibold text-2xl text-gray-800 dark:text-gray-200">
      🤝 Contributing
    </h2>

    <div className='mb-6 border-green-400 border-l-4 bg-green-50 p-4 dark:bg-green-900/20'>
      <div className="flex">
        <div className="ml-3">
          <p className='text-green-700 text-sm dark:text-green-300'>
            We welcome contributions! Please feel free to submit issues, feature
            requests, or pull requests on GitHub.
          </p>
        </div>
      </div>
    </div>

    <div className='mt-8 border-gray-200 border-t pt-8 text-center dark:border-gray-600'>
      <p className="text-gray-600 dark:text-gray-400">
        Made with ❤️ by{' '}
        <a
          className='text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'
          href="https://github.com/mikr13"
        >
          mikr13
        </a>
      </p>
      <p className='mt-2 text-gray-500 text-sm dark:text-gray-400'>
        Licensed under MIT • Built with Ladle & Monaco Editor
      </p>
    </div>
  </div>
);

GettingStarted.meta = {
  title: 'Welcome',
};
