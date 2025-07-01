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
  viteConfig: process.cwd() + '/ladle.vite.config.js',
};
