import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  ssr: {
    // CommonJS packages without proper ESM named exports get bundled into the prerender build.
    noExternal: ['react-helmet-async'],
  },
})
