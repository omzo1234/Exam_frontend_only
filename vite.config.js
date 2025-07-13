// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true // Ouvre le navigateur automatiquement
  },
  css: {
    postcss: './postcss.config.js',
    modules: {
      localsConvention: 'camelCase' // Permet les noms de classe en camelCase
    }
  },
  resolve: {
    alias: {
      '@': '/src' // Alias pour les imports
    }
  }
})