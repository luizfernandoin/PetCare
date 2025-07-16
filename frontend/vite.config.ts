import path from "path"
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // root: "./src",
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: 'jsdom',         // <- ESSENCIAL para testes com DOM
    globals: true,                // permite usar `describe`, `test`, `expect` sem importar
    setupFiles: './src/setupTests.ts' // configurações globais como jest-dom
  }

})
