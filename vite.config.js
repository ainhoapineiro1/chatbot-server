import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.js'
    }
  },
  resolve: {
    alias: {
      routes: path.resolve(__dirname, 'src/routes'),
      controllers: path.resolve(__dirname, 'src/controllers'),
      utils: path.resolve(__dirname, 'src/utils')
    }
  },
  base: 'chatbot-test'
})
