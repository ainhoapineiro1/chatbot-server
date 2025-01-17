import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: './server.js'
        }
    },
    base: 'chatbot-test',
});
