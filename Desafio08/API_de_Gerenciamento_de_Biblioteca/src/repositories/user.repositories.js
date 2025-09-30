//user.repositories.js
import db from "../config/database.js";
import { logger } from '../utils/logger.js';

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        avatar TEXT 
    )
`, (err) => {
    if (err) {
        logger.error("Error creating users table: ", err.message);
    } else {
        logger.info("Table created successfully or already existing");
    }
});

// =========================
// CREATE
// =========================
function createUserRepository(newUser) {
    return new Promise((res, rej) => {
        const { username, email, password, avatar } = newUser;
        db.run(
            `INSERT INTO users (username, email, password, avatar)
             VALUES (?, ?, ?, ?)`,
            [username, email, password, avatar],
            function (err) {
                if (err) {
                    if (err.message.includes("UNIQUE constraint failed: users.username")) {
                        rej(new Error("Alert: username already exists"));
                    } else if (err.message.includes("UNIQUE constraint failed: users.email")) {
                        rej(new Error("Alert: email already exists"));
                    } else if (err.message.includes("UNIQUE constraint failed")) {
                        rej(new Error("Alert: username or email already exists"));
                    } else {
                        rej(err);
                    }
                } else {
                    res({ message: "User created", id: this.lastID, ...newUser });
                }
            }
        );
    });
}

// =========================
// READ - Buscar por email
// =========================
function findByEmailRepository(email) {
    return new Promise((res, rej) => {
        db.get(
            `SELECT * FROM users WHERE email = ?`,
            [email],
            (err, row) => {
                if (err) rej(err);
                else res(row);
            }
        );
    });
}


// =========================
// READ - Buscar por username ou email
// (retorna array para validar conflitos)
// =========================
function findUserByUsernameOrEmailRepository(username, email) {
    return new Promise((res, rej) => {
        db.all(
            `SELECT * FROM users WHERE username = ? OR email = ?`,
            [username, email],
            (err, rows) => {
                if (err) rej(err);
                else res(rows || []);
            }
        );
    });
}

// =========================
// READ - Buscar por ID
// =========================
function findUserByIdRepository(id) {
    return new Promise((res, rej) => {
        db.get(
            `SELECT * FROM users WHERE id = ?`,
            [id],
            (err, row) => {
                if (err) rej(err);
                else res(row);
            }
        );
    });
}

// =========================
// UPDATE
// =========================
function updateUserRepository(id, user) {
    return new Promise((resolve, reject) => {
        const fields = ["username", "email", "password", "avatar"];
        const updates = [];
        const values = [];
        
        fields.forEach((field) => {
            if (user[field] !== undefined) {
                updates.push(`${field} = ?`);
                values.push(user[field]);
            }
        });
        
        if (updates.length === 0) {
            reject(new Error("Nenhum campo válido para atualização"));
            return;
        }
        
        const query = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
        values.push(id);
        
        // Executa a atualização
        db.run(query, values, function(error) {
            if (error) {
                reject(error);
            } else {
                // Verifica se algum registro foi atualizado
                if (this.changes === 0) {
                    resolve(null); // Nenhum usuário encontrado
                } else {
                    // Busca o usuário atualizado para retornar
                    db.get("SELECT * FROM users WHERE id = ?", [id], (error, row) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(row); // Retorna o usuário atualizado
                        }
                    });
                }
            }
        });
    });
}

// =========================
// DELETE
// =========================
function deleteUserRepository(id) {
    return new Promise((res, rej) => {
        db.run(
            `DELETE FROM users WHERE id = ?`,
            [id],
            function (err) {
                if (err) rej(err);
                else res({ message: "User deleted", changes: this.changes });
            }
        );
    });
}

// =========================
// GET ALL USERS
// =========================
function findAllUsersRepository() {
    return new Promise((res, rej) => {
        db.all(`SELECT * FROM users`, [], (err, rows) => {
            if (err) {
                rej(err);
            } else {
                res(rows);
            }
        });
    });
}

export default {
    createUserRepository,
    findByUsernameOrEmailRepository: findUserByUsernameOrEmailRepository,
    findByEmailRepository,
    findUserByIdRepository,
    updateUserRepository,
    findAllUsersRepository,
    deleteUserRepository,
};
