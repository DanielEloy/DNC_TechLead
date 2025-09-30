import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Configurações para desenvolvimento
  server: {
    port: 5173,
    host: true,
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
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  // Define o diretório raiz como 'frontend'
  root: '.',
  // Configura o base URL para produção
  base: './',
  // Resolver o erro __DEFINES__
  define: {
    __DEFINES__: '{}',
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }
});