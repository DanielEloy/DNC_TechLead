import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('./data_base/library_db.sqlite', (err) => {
    if (err) {
        console.error('Error connecting to database: ', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
})

export default db;