import sqlite3 from 'sqlite3'
import { logger } from '../utils/logger.js';

const db = new sqlite3.Database('./data_base/library_db.sqlite', (err) => {
    if (err) {
        logger.error('Error connecting to database: ', err.message);
    } else {
        logger.info('Connected to SQLite database.');
    }
})

export default db;