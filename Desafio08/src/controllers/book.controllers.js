// book.controllers.js
import bookServices from "../service/book.services.js"
import { logger } from "../utils/logger.js"

// Custom Error class for better error handling
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
// =========================
// CREATE - Criar um novo livro
// =========================
async function createBookController(req, res) {
    const userId = req.user.id;
    const newBook = req.body;

    try {
        const createdBook = await bookServices.createBookService(newBook, userId);
        logger.info(`Book created with ID: ${createdBook.id} by User ID: ${userId}`);
        res.status(201).json(createdBook);
    } catch (error) {
        logger.error("Error in createBookController:", error.message);

        if (error instanceof AppError) {
            logger.warn("Handled error:", error.message);
            res.status(error.statusCode).send({ error: error.message });
        } else {
            logger.error("Unexpected error:", error);
            res.status(500).send({ error: "Unexpected Internal Server Error" });
        }
    }
}

async function findAllBooksController(req, res) {
    try {
        const books = await bookServices.findAllBooksService();
        logger.info(`Books retrieved: ${books.length}`);
        res.status(200).json(books);
    } catch (error) {
        logger.error("Error in findAllBooksController:", error.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
    logger.info("findAllBooksController executed");
}


export default {
    createBookController,
    findAllBooksController
}