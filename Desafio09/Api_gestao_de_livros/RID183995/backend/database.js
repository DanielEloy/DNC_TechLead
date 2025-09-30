import sqlite3 from 'sqlite3';
import { logger } from './src/utils/logger.js';

// Criar conexão com o banco de dados
const db = new sqlite3.Database('./biblioteca.db', (err) => {
  if (err) {
    logger.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    logger.success('✅ Conectado ao banco de dados SQLite');
  }
});

// Tratamento de erros global do banco
db.on('error', (err) => {
  logger.error('Erro no banco de dados:', err.message);
});

export default db;