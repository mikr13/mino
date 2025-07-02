/** @type {import('@ladle/react').UserConfig} */
export default {
  // Set base path for GitHub Pages deployment
  base: process.env.DEPLOYMENT_ENV === 'production' ? '/mino/' : '/',

  // Output directory
  outDir: 'build',

  // Title for the documentation
  title: 'Mino - Code Editor',

  // Theme configuration
  defaultStory: 'documentation--getting-started',

  // Enable hot reload in development
  hmr: process.env.DEPLOYMENT_ENV !== 'production',

  // Vite configuration for proper bundling
  viteConfig: `${process.cwd()}/ladle.vite.config.js`,

  storyOrder: ["documentation--getting-started", "code-editor--basic", "code-editor--light-theme", "code-editor--dark-theme", "code-editor--theme-switcher", "code-editor--with-readonly-ranges", "code-editor--with-toolbar", "code-editor--language-comparison", "code-editor--leetcode-style", "code-editor--minimal-toolbar", "code-editor--full-screen-demo", "code-editor--custom-icons", "code-editor--all-features"],
};
