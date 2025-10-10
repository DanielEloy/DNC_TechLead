import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 🔥 ADICIONE ESTA LINHA - resolve caminhos relativos
  build: {
    outDir: 'dist',
    sourcemap: false, // Opcional: reduz tamanho do build
    emptyOutDir: true // Limpa diretório antes do build
  },
  // Opcional: configuração para desenvolvimento
  server: {
    port: 3000
  }
})