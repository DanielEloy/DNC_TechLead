import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3010,
  },
  build: {
    outDir: 'dist',  
    emptyOutDir: true,
    sourcemap: false  
  },
  base: '/',  
})