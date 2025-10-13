import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: false,
  },
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
  server: {
    port: 3000,
  },
})
