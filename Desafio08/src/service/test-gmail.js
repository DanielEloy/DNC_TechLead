// test-gmail.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from "../utils/logger.js";
import fs from 'fs';

// Obter o diretório atual no ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega variáveis conforme NODE_ENV
const env = process.env.NODE_ENV || "development";
const envPath = path.resolve(__dirname, '..', '..', `.env.${env}`);

// Verificar se o arquivo .env existe
console.log('Procurando arquivo de configuração em:', envPath);

if (!fs.existsSync(envPath)) {
  console.error('❌ Arquivo de configuração não encontrado:', envPath);
  process.exit(1);
}

dotenv.config({ path: envPath });

// Debug: mostrar todas as variáveis de ambiente carregadas
console.log('Variáveis de ambiente carregadas:');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '*** (ocultada por segurança)' : 'undefined');

logger.info({
  message: 'Email configuration',
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS ? '******' : 'Not Set'
});

// Verificar se as variáveis necessárias estão definidas
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('❌ Variáveis EMAIL_USER ou EMAIL_PASS não estão definidas');
  process.exit(1);
}

const testTransporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

console.log('Testando credenciais para:', process.env.EMAIL_USER);
console.log('Usando arquivo de configuração:', `.env.${env}`);

testTransporter.verify(function(error, success) {
  if (error) {
    console.log('❌ Erro de autenticação:', error.message);
    console.log('Código do erro:', error.code);
  } else {
    console.log('✅ Autenticação bem-sucedida!');
    console.log('A senha é válida para a conta:', process.env.EMAIL_USER);
  }
});

// Adicione este código ao final do test-gmail.js para testar o envio
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_TESTER, // Envie para você mesmo para teste
  subject: 'Teste de Email da Biblioteca',
  html: '<h1>Email de teste funcionando!</h1><p>Se você recebeu este email, o sistema de notificações da biblioteca está funcionando corretamente.</p>'
};

testTransporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('❌ Erro ao enviar email:', error);
  } else {
    console.log('✅ Email enviado com sucesso:', info.messageId);
  }
});
//cd src\service
//node test-gmail.js