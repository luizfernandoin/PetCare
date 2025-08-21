import path from "path"
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // root: "./src",

  server: {
    port: 3001,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '@petcare/shared/enums': path.resolve(__dirname, '../shared/src/enums'),
      '@petcare/shared': path.resolve(__dirname, '../shared/src/validators'),
    },
  },
  test: {
    environment: 'jsdom',         // <- ESSENCIAL para testes com DOM
    globals: true,                // permite usar `describe`, `test`, `expect` sem importar
    setupFiles: './src/setupTests.ts', // configurações globais como jest-dom
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/e2e/**'
    ],
  }
})
