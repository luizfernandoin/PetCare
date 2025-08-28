import path from "path"
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    VitePWA({
      devOptions: { 
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html',
      },
      registerType: 'autoUpdate',
      strategies: "injectManifest",
      srcDir: 'src',
      filename: 'sw.ts',
      injectManifest: {
        swDest: 'dist/sw.js',
        globPatterns: ['**/*.{js,css,html,png,svg,jpg,jpeg,woff2}'],
        rollupFormat: 'es',
      },
      manifest: {
        name: 'Teste',
        short_name: 'Teste',
        description: 'Teste',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          {
            "src": "pwa-64x64.png",
            "sizes": "64x64",
            "type": "image/png"
          },
          {
            "src": "pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "maskable-icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ],
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait',
      }
    })
  ],
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
