import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// When building for GitHub Pages we serve from /<repo>/ — set GH_PAGES=true.
export default defineConfig({
  base: process.env.GH_PAGES ? '/Hollowpoint-brand/' : '/',
  plugins: [react()],
})
