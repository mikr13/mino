import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],

    build: {
        // Ensure all dependencies are bundled for static deployment
        rollupOptions: {
            external: [],
            output: {
                // Ensure consistent chunk names
                manualChunks: undefined,
            },
        },

        // Don't externalize any dependencies for static hosting
        commonjsOptions: {
            include: [/node_modules/],
        },
    },

    // Optimize dependencies for bundling
    optimizeDeps: {
        include: ['react', 'react-dom', 'react/jsx-runtime'],
    },

    // Ensure proper resolution for static hosting
    resolve: {
        alias: {
            // Ensure React is properly resolved
            'react': 'react',
            'react-dom': 'react-dom',
        },
    },
}); 
