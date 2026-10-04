import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Semasa binaan untuk GitHub Pages, laman disajikan di bawah /asas-tahun-1/.
  // Semasa pembangunan (dev), kekalkan di root '/'.
  base: command === 'build' ? '/asas-tahun-1/' : '/',
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
  },
}))
