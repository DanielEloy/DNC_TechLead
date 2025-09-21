// loan.repositories.js
import db from "../config/database.js";
import { logger } from '../utils/logger.js';

// =========================
// Criação da tabela de empréstimos, se não existir
// =========================
db.run(`CREATE TABLE IF NOT EXISTS loans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    bookId INTEGER,
    dueDate TEXT,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (bookId) REFERENCES books(id)
);`);

// =========================
// CREATE - Criar um novo empréstimo
// =========================
function createLoanRepository(userId, bookId, dueDate) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO loans (userId, bookId, dueDate) VALUES (?, ?, ?)`;
        const params = [userId, bookId, dueDate];
        
        logger.debug(`Executing SQL: ${sql} | Params: ${JSON.stringify(params)}`);
        
        db.run(sql, params, function(err) {
            if (err) {
                logger.error("Error creating loan:", err.message);
                return reject(err);
            }
            
            logger.info(`Loan created with ID: ${this.lastID}`);
            resolve({ id: this.lastID, userId, bookId, dueDate });
        });
    });
}

// =========================
// READ - Buscar todos os empréstimos
// =========================
function findAllLoansRepository() {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT
                loans.id, 
                loans.dueDate, 
                users.username,
                users.email, 
                books.title 
            FROM loans
            JOIN users ON loans.userId = users.id
            JOIN books ON loans.bookId = books.id
        `;
        
        db.all(sql, [], (err, rows) => {
            if (err) {
                logger.error("Error fetching loans:", err.message);
                return reject(err);
            }
            
            logger.debug(`SQL executed: ${sql}`);
            logger.info(`Fetched ${rows.length} loans`);
            resolve(rows);
        });
    });
}

// =========================
// READ - Buscar empréstimo ativo por bookId
// =========================
function findActiveLoanByBookIdRepository(bookId) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                loans.id, 
                loans.dueDate, 
                users.username,
                users.email, 
                books.title 
            FROM loans
            JOIN users ON loans.userId = users.id
            JOIN books ON loans.bookId = books.id
            WHERE loans.bookId = ?
        `;
        
        db.get(sql, [bookId], (err, row) => {
            if (err) {
                logger.error("Error fetching active loan by bookId:", err.message);
                return reject(err);
            }
            
            logger.debug(`SQL executed: ${sql} | Params: [${bookId}]`);
            resolve(row);
        });
    });
}

// =========================
// READ - Buscar um empréstimo por ID
// =========================
function findLoanByIdRepository(loanId) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                loans.id, 
                loans.dueDate, 
                users.username,
                users.email, 
                books.title 
            FROM loans
            JOIN users ON loans.userId = users.id
            JOIN books ON loans.bookId = books.id
            WHERE loans.id = ?
        `;
        
        db.get(sql, [loanId], (err, row) => {
            if (err) {
                logger.error("Error fetching loan by ID:", err.message);
                return reject(err);
            }
            
            logger.debug(`SQL executed: ${sql} | Params: [${loanId}]`);
            resolve(row);
        });
    });
}

// =========================
// UPDATE - Atualizar um empréstimo por ID
// =========================
function updateLoanRepository(updateLoan, loanId) {
    return new Promise((resolve, reject) => {
        const { userId, bookId, dueDate } = updateLoan;
        const sql = `
            UPDATE loans 
            SET userId = ?, bookId = ?, dueDate = ? 
            WHERE id = ?
        `;
        const params = [userId, bookId, dueDate, loanId];
        
        db.run(sql, params, function(err) {
            if (err) {
                logger.error("Error updating loan:", err.message);
                return reject(err);
            }   
            
            logger.debug(`SQL executed: ${sql} | Params: ${JSON.stringify(params)}`);
            resolve({ id: loanId, userId, bookId, dueDate });
        });
    });
}

// =========================
// DELETE - Deletar um empréstimo por ID
// =========================
async function deleteLoanRepository(loanId) {
    return new Promise((resolve, reject) => {
        // Primeiro busca o empréstimo completo para retornar
        findLoanByIdRepository(loanId)
            .then(loan => {
                if (!loan) {
                    logger.warn(`Loan with ID ${loanId} not found`);
                    return reject(new Error("Loan not found"));
                }
                
                // Se existe, procede com a exclusão
                const sql = `DELETE FROM loans WHERE id = ?`;
                
                db.run(sql, [loanId], function(err) {
                    if (err) {
                        logger.error("Error deleting loan:", err.message);
                        return reject(err);
                    }
                    
                    logger.info(`Loan with ID ${loanId} deleted successfully`);
                    resolve(loan); // retorna o empréstimo deletado completo
                });
            })
            .catch(err => {
                logger.error("Error finding loan for deletion:", err.message);
                reject(err);
            });
    });
}

export default {
    createLoanRepository,
    findAllLoansRepository,
    findActiveLoanByBookIdRepository,
    findLoanByIdRepository,
    updateLoanRepository,
    deleteLoanRepository
};