import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rota simples de health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend simplificado funcionando!' });
});

// Simulando um banco de dados em memória
let livros = [
    { id: 1, titulo: 'Dom Casmurro', num_paginas: 256, isbn: '978-85-359-0275-5', editora: 'Companhia das Letras' },
    { id: 2, titulo: 'O Cortiço', num_paginas: 320, isbn: '978-85-7232-697-2', editora: 'Martin Claret' }
];
let nextId = 3;

// GET /api/livros - Listar todos os livros
app.get('/api/livros', (req, res) => {
    console.log('📖 GET /api/livros - Retornando', livros.length, 'livros');
    res.json(livros);
});

// GET /api/livros/:id - Buscar livro por ID
app.get('/api/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log('🔍 GET /api/livros/' + id);
    
    const livro = livros.find(l => l.id === id);
    if (!livro) {
        console.log('❌ Livro não encontrado ID:', id);
        return res.status(404).json({ error: 'Livro não encontrado' });
    }
    
    console.log('✅ Livro encontrado:', livro.titulo);
    res.json(livro);
});

// POST /api/livros - Criar novo livro
app.post('/api/livros', (req, res) => {
    console.log('📝 POST /api/livros - Dados recebidos:', req.body);
    
    const { titulo, num_paginas, isbn, editora } = req.body;
    
    // Validação
    if (!titulo || num_paginas === undefined || !isbn || !editora) {
        console.log('❌ Dados incompletos');
        return res.status(400).json({ 
            error: 'Todos os campos são obrigatórios: titulo, num_paginas, isbn, editora' 
        });
    }
    
    const novoLivro = {
        id: nextId++,
        titulo,
        num_paginas: parseInt(num_paginas),
        isbn,
        editora
    };
    
    livros.push(novoLivro);
    console.log('✅ Livro criado:', novoLivro);
    res.status(201).json(novoLivro);
});

// PUT /api/livros/:id - Atualizar livro
app.put('/api/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log('✏️ PUT /api/livros/' + id, '- Dados:', req.body);
    
    const { titulo, num_paginas, isbn, editora } = req.body;
    const livroIndex = livros.findIndex(l => l.id === id);
    
    if (livroIndex === -1) {
        console.log('❌ Livro não encontrado para atualização ID:', id);
        return res.status(404).json({ error: 'Livro não encontrado' });
    }
    
    if (!titulo || num_paginas === undefined || !isbn || !editora) {
        console.log('❌ Dados incompletos para atualização');
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    
    livros[livroIndex] = {
        id,
        titulo,
        num_paginas: parseInt(num_paginas),
        isbn,
        editora
    };
    
    console.log('✅ Livro atualizado:', livros[livroIndex]);
    res.json({ 
        message: 'Livro atualizado com sucesso',
        livro: livros[livroIndex]
    });
});

// DELETE /api/livros/:id - Deletar livro
app.delete('/api/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log('🗑️ DELETE /api/livros/' + id);
    
    const livroIndex = livros.findIndex(l => l.id === id);
    
    if (livroIndex === -1) {
        console.log('❌ Livro não encontrado para exclusão ID:', id);
        return res.status(404).json({ error: 'Livro não encontrado' });
    }
    
    const livroRemovido = livros.splice(livroIndex, 1)[0];
    console.log('✅ Livro removido:', livroRemovido.titulo);
    res.json({ 
        message: 'Livro deletado com sucesso',
        livro: livroRemovido
    });
});

// Rota para testar logs
app.get('/api/livros-debug', (req, res) => {
    console.log('🐛 DEBUG - Testando logs');
    console.log('📚 Livros na memória:', livros);
    res.json({ message: 'Logs testados no console', total_livros: livros.length });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor simplificado rodando na porta ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/health`);
    console.log(`📚 API Livros: http://localhost:${PORT}/api/livros`);
    console.log(`💾 Livros em memória: ${livros.length} livros carregados`);
});