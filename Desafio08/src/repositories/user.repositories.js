import db from "../config/database.js";

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
        console.error("Error creating users table: ", err.message);
    } else {
        console.log("Table created successfully or already existing");
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
function updateUserRepository(id, updatedUser) {
    return new Promise((res, rej) => {
        const { username, email, password, avatar } = updatedUser;
        db.run(
            `UPDATE users 
             SET username = ?, email = ?, password = ?, avatar = ?
             WHERE id = ?`,
            [username, email, password, avatar, id],
            function (err) {
                if (err) {
                    if (err.message.includes("UNIQUE constraint failed: users.username")) {
                        rej(new Error("Alert: username already exists"));
                    } else if (err.message.includes("UNIQUE constraint failed: users.email")) {
                        rej(new Error("Alert: email already exists"));
                    } else {
                        rej(err);
                    }
                } else {
                    res({ message: "User updated", changes: this.changes });
                }
            }
        );
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
    findUserByIdRepository,
    updateUserRepository,
    findAllUsersRepository,
    deleteUserRepository,
};
