import sqlite3 from 'sqlite3';
import { logger } from './src/utils/logger.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Usa path absoluto e diretório data para persistência
const dbPath = process.env.DATABASE_URL || path.join(__dirname, 'data', 'biblioteca.db');

// Garante que o diretório data existe
import fs from 'fs';
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    logger.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    logger.success('✅ Conectado ao banco de dados SQLite em:', dbPath);
  }
});

db.on('error', (err) => {
  logger.error('Erro no banco de dados:', err.message);
});

export default db;