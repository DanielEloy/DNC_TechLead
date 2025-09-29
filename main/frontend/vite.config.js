import { defineConfig } from 'vite';

export default defineConfig({
  // Configurações para desenvolvimento
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  // Configurações CRÍTICAS para produção
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  // Inclui todos os arquivos estáticos
  publicDir: '.',
  // Configura o base URL para produção
  base: './'
});