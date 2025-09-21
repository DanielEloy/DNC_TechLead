// book.repositories.js
import db from "../config/database.js"
import { logger } from '../utils/logger.js';

// =========================
// Criação da tabela de livros, se não existir
// =========================
db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    userId INTEGER,
    FOREIGN KEY (userId) REFERENCES users(id)
);`);

// =========================
// CREATE - Criar um novo livro
// =========================
function createBookRepository(newBook, userId) {
    return new Promise((resolve, reject) => {
        const { title, author } = newBook;
        const sql = `INSERT INTO books (title, author, userId) VALUES (?, ?, ?)`;
        const params = [title, author, userId];

        // Loga a query e os parâmetros
        logger.debug(`Executing SQL: ${sql} | Params: ${JSON.stringify(params)}`);

        db.run(sql, params, function (err) {
            if (err) {
                reject(err);
                logger.error("Error creating book: ", err.message);
            } else {
                resolve({ id: this.lastID, title, author, userId });
                logger.info(`Book created with ID: ${this.lastID}`);
            }
        });
    });
}


// =========================
// READ - Buscar todos os usuários (tabela users)
// =========================
function findAllUsersRepository() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users`;

        db.all(sql, [], (err, rows) => {
            if (err) {
                logger.error("Error fetching users:", err.message);
                return reject(err);
            }

            logger.debug(`SQL executed: ${sql}`);
            logger.info(`Fetched ${rows.length} users`);
            resolve(rows);
        });
    });
}


// =========================
// READ - Buscar todos os livros OU por ID específico
// Obs: O parâmetro "bookId" é opcional
// =========================
function findAllBooksRepository(bookId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM books`;
        const params = [];

        // Se bookId for informado, filtra pelo ID
        if (bookId) {
            query += ` WHERE id = ?`;
            params.push(bookId);
        }

        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
                logger.error("Error fetching books: ", err.message);
            } else {
                resolve(rows);
            }
        });
        logger.debug(`Function findAllBooksRepository, executed, Query: ${query}`);
    });
}

// =========================
// UPDATE - Atualizar dados de um livro existente
// =========================
function updateBookRepository(updatedBook, bookId) {
    return new Promise((resolve, reject) => {
        const fields = ['title','author','userId'];
        let query = 'UPDATE books SET ';
        const updates = []; // <- Lista para "campo = ?"
        const values = [];  // <- Lista de valores correspondentes

        // Monta dinamicamente os campos que serão atualizados
        fields.forEach((field) => {
            if (updatedBook[field] !== undefined) {
                updates.push(`${field} = ?`); // CORREÇÃO: gerar "title = ?" etc.
                values.push(updatedBook[field]);
            }
        });

        // Se nenhum campo válido foi enviado, rejeita
        if (updates.length === 0) {
            return reject(new Error("No fields to update"));
        }

        // Junta todos os campos separados por vírgula
        query += updates.join(", ");
        query += ' WHERE id = ?';
        values.push(bookId);

        // Executa a query no SQLite
        db.run(query, values, function (err) {
            if (err) {
                reject(err);
                logger.error("Error updating book: ", err.message);
            } else {
                resolve({ id: bookId, ...updatedBook }); 
                logger.info(`Book with ID: ${bookId} updated`);
            }
        });
    });
}

// =========================
// DELETE - Deletar um livro por ID
// =========================
function dbGet(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function dbRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

async function deleteBookRepository(bookId) {
  const book = await dbGet(
    `SELECT id, title, author, userId FROM books WHERE id = ?`,
    [bookId]
  );

  if (!book) {
    return null; // não achou
  }

  await dbRun(`DELETE FROM books WHERE id = ?`, [bookId]);
     logger.info(`deleteBookRepository executed: Book with ID ${bookId} deleted`);
  return book; // retorna o livro deletado
}

// =========================
// SEARCH - Buscar livros por título ou autor (consulta com LIKE)
// =========================
// book.repositories.js
function searchBooksByTitleRepository(search) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM books WHERE title LIKE ? OR author LIKE ?`;
        // Corrige os parâmetros - agora são dois valores
        const params = [`%${search}%`, `%${search}%`];
        
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
                logger.error("Error searching books: ", err.message);
            } else {
                resolve(rows);
                logger.info(`Found ${rows.length} books matching search: ${search}`);
            }
        });
    });
}

// =========================
// READ - Buscar um livro por ID específico
// =========================
function findBookByIdRepository(bookId) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM books WHERE id = ?`;
        
        db.get(sql, [bookId], (err, row) => {
            if (err) {
                logger.error("Error fetching book by ID:", err.message);
                return reject(err);
            }
            logger.debug(`SQL executed: ${sql} | Params: [${bookId}]`);
            resolve(row);
        });
    });
}

// =========================
// Exporta os repositórios
// =========================
export default {
    createBookRepository,
    findAllUsersRepository,
    findAllBooksRepository,
    findBookByIdRepository,
    updateBookRepository,
    deleteBookRepository,
    searchBooksByTitleRepository
};
