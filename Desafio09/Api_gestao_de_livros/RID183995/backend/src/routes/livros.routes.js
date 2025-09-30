import express from 'express';
import db from '../../database.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// GET /api/livros - Listar todos os livros
router.get('/livros', (req, res) => {
  logger.info('📖 Recebida requisição para listar livros');
  
  const sql = 'SELECT * FROM books ORDER BY id';
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      logger.error('Erro ao buscar livros:', err.message);
      return res.status(500).json({ 
        error: 'Erro interno do servidor',
        details: err.message 
      });
    }
    
    logger.success(`✅ Retornando ${rows.length} livros`);
    res.json(rows);
  });
});

// GET /api/livros/:id - Buscar livro por ID
router.get('/livros/:id', (req, res) => {
  const { id } = req.params;
  logger.info(`🔍 Buscando livro ID: ${id}`);
  
  const sql = 'SELECT * FROM books WHERE id = ?';
  
  db.get(sql, [id], (err, row) => {
    if (err) {
      logger.error(`Erro ao buscar livro ${id}:`, err.message);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
    
    if (!row) {
      logger.warn(`❌ Livro não encontrado: ID ${id}`);
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    
    logger.success(`✅ Livro encontrado: ${row.titulo}`);
    res.json(row);
  });
});

// POST /api/livros - Criar novo livro
router.post('/livros', (req, res) => {
  const { titulo, num_paginas, isbn, editora } = req.body;
  
  logger.info('📝 Tentativa de criar novo livro:', { titulo, num_paginas, isbn, editora });
  
  // Validação básica
  if (!titulo || num_paginas === undefined || !isbn || !editora) {
    logger.warn('❌ Dados incompletos para criar livro');
    return res.status(400).json({ 
      error: 'Todos os campos são obrigatórios: titulo, num_paginas, isbn, editora' 
    });
  }
  
  const sql = 'INSERT INTO books (titulo, num_paginas, isbn, editora) VALUES (?, ?, ?, ?)';
  const params = [titulo, parseInt(num_paginas), isbn, editora];
  
  db.run(sql, params, function(err) {
    if (err) {
      logger.error('❌ Erro ao criar livro:', err.message);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
    
    const novoLivro = {
      id: this.lastID,
      titulo,
      num_paginas: parseInt(num_paginas),
      isbn,
      editora
    };
    
    logger.success(`✅ Livro criado com sucesso: ${titulo} (ID: ${this.lastID})`);
    res.status(201).json(novoLivro);
  });
});

// PUT /api/livros/:id - Atualizar livro
router.put('/livros/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, num_paginas, isbn, editora } = req.body;
  
  logger.info(`✏️ Tentativa de atualizar livro ID: ${id}`, { titulo, num_paginas, isbn, editora });
  
  if (!titulo || num_paginas === undefined || !isbn || !editora) {
    logger.warn('❌ Dados incompletos para atualizar livro');
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }
  
  const sql = 'UPDATE books SET titulo = ?, num_paginas = ?, isbn = ?, editora = ? WHERE id = ?';
  const params = [titulo, parseInt(num_paginas), isbn, editora, id];
  
  db.run(sql, params, function(err) {
    if (err) {
      logger.error(`❌ Erro ao atualizar livro ${id}:`, err.message);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
    
    if (this.changes === 0) {
      logger.warn(`❌ Livro não encontrado para atualização: ID ${id}`);
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    
    logger.success(`✅ Livro atualizado com sucesso: ID ${id}`);
    res.json({ 
      message: 'Livro atualizado com sucesso',
      livro: { id: parseInt(id), titulo, num_paginas, isbn, editora }
    });
  });
});

// DELETE /api/livros/:id - Deletar livro
router.delete('/livros/:id', (req, res) => {
  const { id } = req.params;
  logger.info(`🗑️ Tentativa de deletar livro ID: ${id}`);
  
  // Primeiro verifica se o livro existe
  db.get('SELECT id, titulo FROM books WHERE id = ?', [id], (err, row) => {
    if (err) {
      logger.error(`❌ Erro ao verificar livro ${id}:`, err.message);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
    
    if (!row) {
      logger.warn(`❌ Livro não encontrado para exclusão: ID ${id}`);
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    
    // Se existe, procede com a exclusão
    db.run('DELETE FROM books WHERE id = ?', [id], function(err) {
      if (err) {
        logger.error(`❌ Erro ao deletar livro ${id}:`, err.message);
        return res.status(500).json({ error: 'Erro interno do servidor' });
      }
      
      logger.success(`✅ Livro deletado com sucesso: ${row.titulo} (ID: ${id})`);
      res.json({ 
        message: 'Livro deletado com sucesso',
        livro: { id: parseInt(id), titulo: row.titulo }
      });
    });
  });
});

// Rota de exemplo para testar o logger
router.get('/livros-debug', (req, res) => {
  logger.debug('Esta é uma mensagem de DEBUG');
  logger.info('Esta é uma mensagem de INFO');
  logger.warn('Esta é uma mensagem de WARN');
  logger.error('Esta é uma mensagem de ERROR');
  logger.success('Esta é uma mensagem de SUCCESS');
  
  res.json({ message: 'Logs testados no console' });
});

export default router;