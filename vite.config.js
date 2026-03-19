import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/FundamentalComputerSkills/',
  // base: './',
  server: {
    proxy: {
      '/api': {
        target: 'https://fundamentalcomputerskills.duckdns.org/',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
})
