
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
  
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // during dev forward API calls to backend running on port 5000
    proxy: {
      '/api': 'http://localhost:5000',
      '/health': 'http://localhost:5000'
    }
  }
})