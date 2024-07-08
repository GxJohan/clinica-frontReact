import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/dentalapp/', // Asegúrate de que la base esté configurada para tu ruta
  server: {
    port: 5173,
    strictPort: true,
  },
})
