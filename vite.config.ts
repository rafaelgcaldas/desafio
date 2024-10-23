///<reference types="vitest" />
///<reference types="vite/client" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
