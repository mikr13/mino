import '@/index.css';
import type { Story } from '@ladle/react';

export const GettingStarted: Story = () => (
  <div className='prose prose-slate mx-auto max-w-4xl p-6'>
    <h1 className='mb-6 font-bold text-4xl text-gray-900'>
      🥄 Mino Code Editor Documentation
    </h1>

    <div className='mb-6 border-blue-400 border-l-4 bg-blue-50 p-4'>
      <div className="flex">
        <div className="ml-3">
          <p className='text-blue-700 text-sm'>
            <strong>Welcome to Mino Code Editor!</strong> This is an interactive
            documentation built with Ladle. Use the sidebar to explore different
            components and examples.
          </p>
        </div>
      </div>
    </div>

    <h2 className='mb-4 font-semibold text-2xl text-gray-800'>
      🚀 Quick Start
    </h2>

    <div className='mb-6 rounded-lg bg-gray-900 p-4 font-mono text-green-400 text-sm'>
      <div className="mb-2"># Install the package</div>
      <div className="text-white">npm install @mikr13/mino</div>
    </div>

    <h3 className='mb-3 font-semibold text-gray-800 text-xl'>Basic Usage</h3>

    <div className='mb-6 overflow-x-auto rounded-lg bg-gray-900 p-4 font-mono text-gray-100 text-sm'>
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

    <h2 className='mb-4 font-semibold text-2xl text-gray-800'>🎯 Features</h2>

    <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
      <div className='rounded-lg border border-gray-200 bg-white p-4'>
        <h4 className='mb-2 font-semibold text-gray-800'>
          🎨 Monaco Editor Integration
        </h4>
        <p className="text-gray-600 text-sm">
          Full-featured code editor with syntax highlighting, powered by the
          same editor used in VS Code.
        </p>
      </div>

      <div className='rounded-lg border border-gray-200 bg-white p-4'>
        <h4 className='mb-2 font-semibold text-gray-800'>
          🌐 Multiple Languages
        </h4>
        <p className="text-gray-600 text-sm">
          Support for JavaScript, TypeScript, Python, Java, C++, and many more
          programming languages.
        </p>
      </div>

      <div className='rounded-lg border border-gray-200 bg-white p-4'>
        <h4 className='mb-2 font-semibold text-gray-800'>
          🎭 Customizable Themes
        </h4>
        <p className="text-gray-600 text-sm">
          Light and dark themes with custom styling options to match your
          application's design.
        </p>
      </div>

      <div className='rounded-lg border border-gray-200 bg-white p-4'>
        <h4 className='mb-2 font-semibold text-gray-800'>✨ Auto-formatting</h4>
        <p className="text-gray-600 text-sm">
          Built-in code formatting with Prettier integration for clean,
          consistent code.
        </p>
      </div>

      <div className='rounded-lg border border-gray-200 bg-white p-4'>
        <h4 className='mb-2 font-semibold text-gray-800'>🔒 Type Safety</h4>
        <p className="text-gray-600 text-sm">
          Full TypeScript support with comprehensive type definitions for better
          development experience.
        </p>
      </div>

      <div className='rounded-lg border border-gray-200 bg-white p-4'>
        <h4 className='mb-2 font-semibold text-gray-800'>♿ Accessibility</h4>
        <p className="text-gray-600 text-sm">
          ARIA compliant with keyboard navigation support for inclusive user
          experiences.
        </p>
      </div>
    </div>

    <h2 className='mb-4 font-semibold text-2xl text-gray-800'>
      📋 API Reference
    </h2>

    <div className='mb-6 overflow-hidden rounded-lg border border-gray-200 bg-white'>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className='px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider'>
              Prop
            </th>
            <th className='px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider'>
              Type
            </th>
            <th className='px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider'>
              Default
            </th>
            <th className='px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider'>
              Description
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200 bg-white'>
          <tr>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-900 text-sm'>
              value
            </td>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-500 text-sm'>
              string
            </td>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-500 text-sm'>
              ""
            </td>
            <td className='px-6 py-4 text-gray-900 text-sm'>
              The code content
            </td>
          </tr>
          <tr>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-900 text-sm'>
              language
            </td>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-500 text-sm'>
              string
            </td>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-500 text-sm'>
              "javascript"
            </td>
            <td className='px-6 py-4 text-gray-900 text-sm'>
              Programming language
            </td>
          </tr>
          <tr>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-900 text-sm'>
              theme
            </td>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-500 text-sm'>
              "light" | "dark"
            </td>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-500 text-sm'>
              "light"
            </td>
            <td className='px-6 py-4 text-gray-900 text-sm'>Editor theme</td>
          </tr>
          <tr>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-900 text-sm'>
              onChange
            </td>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-500 text-sm'>
              (value: string) =&gt; void
            </td>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-500 text-sm'>
              -
            </td>
            <td className='px-6 py-4 text-gray-900 text-sm'>
              Callback when content changes
            </td>
          </tr>
          <tr>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-900 text-sm'>
              readOnly
            </td>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-500 text-sm'>
              boolean
            </td>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-500 text-sm'>
              false
            </td>
            <td className='px-6 py-4 text-gray-900 text-sm'>
              Whether editor is read-only
            </td>
          </tr>
          <tr>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-900 text-sm'>
              height
            </td>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-500 text-sm'>
              string | number
            </td>
            <td className='whitespace-nowrap px-6 py-4 font-mono text-gray-500 text-sm'>
              400
            </td>
            <td className='px-6 py-4 text-gray-900 text-sm'>Editor height</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 className='mb-4 font-semibold text-2xl text-gray-800'>🛠️ Development</h2>

    <div className='mb-6 border-yellow-400 border-l-4 bg-yellow-50 p-4'>
      <div className="flex">
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            <strong>Prerequisites:</strong> Make sure you have Bun installed for
            the best development experience.
          </p>
        </div>
      </div>
    </div>

    <div className='mb-6 rounded-lg bg-gray-900 p-4 font-mono text-green-400 text-sm'>
      <div className="mb-1"># Clone the repository</div>
      <div className='mb-3 text-white'>
        git clone https://github.com/mikr13/mino.git
      </div>
      <div className='mb-3 text-white'>cd mino</div>
      <div className="mb-1"># Install dependencies</div>
      <div className='mb-3 text-white'>bun install</div>
      <div className="mb-1"># Start development server</div>
      <div className="text-white">bun run dev</div>
    </div>

    <h3 className='mb-3 font-semibold text-gray-800 text-xl'>
      Available Scripts
    </h3>

    <div className='mb-6 rounded-lg border border-gray-200 bg-white p-4'>
      <ul className="space-y-2 font-mono text-sm">
        <li>
          <code className='rounded bg-gray-100 px-2 py-1'>bun run dev</code> -
          Start Ladle development server
        </li>
        <li>
          <code className='rounded bg-gray-100 px-2 py-1'>bun run build</code> -
          Build the library
        </li>
        <li>
          <code className='rounded bg-gray-100 px-2 py-1'>
            bun run build:story
          </code>{' '}
          - Build Ladle documentation
        </li>
        <li>
          <code className='rounded bg-gray-100 px-2 py-1'>
            bun run preview:story
          </code>{' '}
          - Preview built documentation
        </li>
        <li>
          <code className='rounded bg-gray-100 px-2 py-1'>bun run lint</code> -
          Run linter
        </li>
        <li>
          <code className='rounded bg-gray-100 px-2 py-1'>bun run format</code>{' '}
          - Format code
        </li>
      </ul>
    </div>

    <h2 className='mb-4 font-semibold text-2xl text-gray-800'>🔗 Links</h2>

    <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-3'>
      <a
        className='rounded-lg bg-gray-900 p-4 text-white transition-colors hover:bg-gray-800'
        href="https://github.com/mikr13/mino"
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className='mb-2 font-semibold'>📦 GitHub Repository</div>
        <div className='text-gray-300 text-sm'>
          Source code, issues, and contributions
        </div>
      </a>

      <a
        className='rounded-lg bg-red-600 p-4 text-white transition-colors hover:bg-red-500'
        href="https://www.npmjs.com/package/@mikr13/mino"
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className='mb-2 font-semibold'>📦 NPM Package</div>
        <div className='text-red-100 text-sm'>Install and version info</div>
      </a>

      <a
        className='rounded-lg bg-blue-600 p-4 text-white transition-colors hover:bg-blue-500'
        href="https://mikr13.github.io/mino/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className='mb-2 font-semibold'>📚 Live Documentation</div>
        <div className='text-blue-100 text-sm'>
          Interactive examples and demos
        </div>
      </a>
    </div>

    <h2 className='mb-4 font-semibold text-2xl text-gray-800'>
      🤝 Contributing
    </h2>

    <div className='mb-6 border-green-400 border-l-4 bg-green-50 p-4'>
      <div className="flex">
        <div className="ml-3">
          <p className='text-green-700 text-sm'>
            We welcome contributions! Please feel free to submit issues, feature
            requests, or pull requests on GitHub.
          </p>
        </div>
      </div>
    </div>

    <div className='mt-8 border-gray-200 border-t pt-8 text-center'>
      <p className="text-gray-600">
        Made with ❤️ by{' '}
        <a
          className="text-blue-600 hover:text-blue-800"
          href="https://github.com/mikr13"
        >
          mikr13
        </a>
      </p>
      <p className='mt-2 text-gray-500 text-sm'>
        Licensed under MIT • Built with Ladle & Monaco Editor
      </p>
    </div>
  </div>
);

GettingStarted.meta = {
  title: 'Welcome',
};
