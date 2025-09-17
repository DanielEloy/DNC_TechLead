// book.repositories.js
import db from "../config/database.js"
import { logger } from '../utils/logger.js';

// Criação da tabela de livros, se não existir
db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    userId INTEGER,
    FOREIGN KEY (userId) REFERENCES users(id)
);`);

function createBookRepository(newBook, userId) {
    return new Promise((resolve, reject) => {
        const { title, author } = newBook;
        db.run(
            `INSERT INTO books (title, author, userId) VALUES (?, ?, ?)`, 
            [title, author, userId], 
            function (err) {
                if (err) {
                    reject(err);
                    logger.error("Error creating book: ", err.message);
                } else {
                    resolve({ id: this.lastID, title, author, userId });
                    logger.info(`Book created with ID: ${this.lastID}`);
                }
            }
        );
    });
}

function findAllUsersRepository() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM users`, [], (err, rows) => {
            if (err) {
                reject(err);
                logger.error("Error fetching users: ", err.message);
            } else {
                resolve(rows);
                logger.info(`Fetched ${rows.length} users`);
            }
        });
    });
}

function findAllBooksRepository() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM books`, [], (err, rows) => {
            if (err) {
                reject(err);
                logger.error("Error fetching books: ", err.message);
            } else {
                resolve(rows);
                logger.info(`Fetched ${rows.length} books`);
            }
        });
    });
}

export default {
    createBookRepository,
    findAllUsersRepository,
    findAllBooksRepository
};