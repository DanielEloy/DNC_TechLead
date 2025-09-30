import express from 'express';
import cors from 'cors';
import { logger } from './src/utils/logger.js';
import db from './database.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
import livrosRouter from './src/routes/livros.routes.js';
app.use('/api', livrosRouter);

// Rota de saúde
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend da Biblioteca funcionando!' });
});

// Inicializar banco de dados
db.serialize(() => {
  // Criar tabela de livros se não existir
  db.run(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      num_paginas INTEGER,
      isbn TEXT,
      editora TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      logger.error('Erro ao criar tabela books:', err.message);
    } else {
      logger.info('Tabela books verificada/criada com sucesso');
      
      // Inserir alguns livros de exemplo se a tabela estiver vazia
      db.get("SELECT COUNT(*) as count FROM books", (err, row) => {
        if (err) {
          logger.error('Erro ao verificar contagem de livros:', err.message);
        } else if (row.count === 0) {
          const livrosExemplo = [
            ['Dom Casmurro', 256, '978-85-359-0275-5', 'Companhia das Letras'],
            ['O Cortiço', 320, '978-85-7232-697-2', 'Martin Claret'],
            ['Memórias Póstumas de Brás Cubas', 288, '978-85-7232-144-1', 'Ática']
          ];
          
          const stmt = db.prepare("INSERT INTO books (titulo, num_paginas, isbn, editora) VALUES (?, ?, ?, ?)");
          livrosExemplo.forEach(livro => {
            stmt.run(livro, (err) => {
              if (err) {
                logger.error('Erro ao inserir livro exemplo:', err.message);
              }
            });
          });
          stmt.finalize();
          logger.info('Livros de exemplo inseridos');
        }
      });
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  logger.info(`🚀 Servidor rodando na porta ${PORT}`);
  logger.info(`📍 Health check: http://localhost:${PORT}/health`);
  logger.info(`📚 API Livros: http://localhost:${PORT}/api/livros`);
});

export default app;