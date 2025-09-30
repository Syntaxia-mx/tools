import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 's.png'], // los archivos que quieres incluir
      manifest: {
        name: 'Syntaxia Tools',
        short_name: 'Syntaxia',
        description: 'Herramientas online para Base64, Hex, PDF y más',
        theme_color: '#aa0000',
        background_color: '#000000',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/logo192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/logo512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/s.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})
