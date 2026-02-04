import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host: true,      // Necesario para Docker
    strictPort: true,
    port: 5173,
    watch: {
      usePolling: true // Ayuda a detectar cambios en algunos sistemas
    }
  }
})