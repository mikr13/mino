/** @type {import('@ladle/react').UserConfig} */
export default {
  // Set base path for GitHub Pages deployment
  base: process.env.NODE_ENV === 'production' ? '/mino/' : '/',

  // Output directory
  outDir: 'build',

  // Title for the documentation
  title: 'Mino - Code Editor',

  // Theme configuration
  defaultStory: 'code-editor--default',

  // Enable hot reload in development
  hmr: process.env.NODE_ENV !== 'production',

  // Configure the server
  server: {
    port: 3000,
    host: true
  }
}; 
