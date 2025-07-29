// Desafio04/React_com_JavaScript/RID183995_Desafio04/vercel-build.js
const { execSync } = require('child_process');

console.log('Iniciando build customizado para Vercel...');

try {
  // Instala dependências
  console.log('Instalando dependências...');
  execSync('npm install', { stdio: 'inherit' });
  
  // Executa o build
  console.log('Executando build...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('Build concluído com sucesso!');
} catch (error) {
  console.error('Erro durante o build:', error);
  process.exit(1);
}