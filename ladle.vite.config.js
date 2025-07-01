import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

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
            '@': resolve(__dirname, 'src'),
            '@/components': resolve(__dirname, 'src/components'),
            '@/config': resolve(__dirname, 'src/config'),
            '@/types': resolve(__dirname, 'src/types'),
            '@/utils': resolve(__dirname, 'src/utils'),
        },
    },

    css: {
        postcss: {
            plugins: [autoprefixer],
        },
    },

    define: {
        'process.env.NODE_ENV': JSON.stringify(
            process.env.NODE_ENV || 'development'
        ),
    },
}); 
