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

// =========================
// READ - Buscar todos os livros
// =========================
async function findAllBooksController(req, res) {
    let books = [];
    try {
        books = await bookServices.findAllBooksService();
        res.status(200).json(books);
    } catch (error) {
        logger.error("Error in findAllBooksController:", error.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
    logger.info(`Function findAllBooksController, executed, ${books.length} books found successfully!`);
}

async function findBookByIdController(req, res) {
    const  bookId  = req.params.id;
    try {
        const book = await bookServices.findBookByIdService(bookId)
        logger.info(`Book retrieved with ID: ${bookId}`);
        res.status(200).json(book);
    } catch (error) {
        logger.error("Error in findBookByIdController:", error.message);
        res.status(404).send({ error: "Book not found" });
        if (error instanceof AppError) {
            logger.warn("Handled error:", error.message);
            res.status(error.statusCode).send({ error: error.message });
        } else {
            logger.error("Unexpected error:", error);
            res.status(500).send({ error: "Unexpected Internal Server Error" });
        }
    }
    logger.info("findBookByIdController executed");
}

// =========================
// UPDATE - Atualizar um livro existente
// =========================

async function updateBookController(req, res) {
    const bookId = req.params.id;
    const userId = req.user.id;
    const updatedBook = req.body;

    try {
        const book = await bookServices.updateBookService(updatedBook, bookId, userId);
        logger.info(`Book updated with ID: ${bookId} by User ID: ${userId}`);
        res.status(200).json(book);
    } catch (error) {
        logger.error("Error in updateBookController:", error.message)
        if (error instanceof AppError) {
            logger.warn("Handled error:", error.message);
            res.status(error.statusCode).send({ error: error.message });
        } else {
            logger.error("Unexpected error:", error);
            res.status(500).send({ error: "Unexpected Internal Server Error" });
        }
    }
    logger.info("updateBookController executed", { bookId, userId, updatedBook },"Success!");
}


// =========================
// DELETE - Deletar um livro existente
// =========================
async function deleteBookController(req, res) {
  const bookId = req.params.id;
  const user = req.user;

  try {
    const deletedBook = await bookServices.deleteBookService(bookId, user);

    //logger.info(`Book with ID: ${bookId} deleted by User ID: ${user.id}`);
    return res.status(200).json({
      message: "Book deleted successfully",
      deletedBook,
    });

  } catch (error) {
    //logger.error("Error in deleteBookController:", error.message || error );
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }

    return res.status(500).json({ error: "Unexpected Internal Server Error" });
  }
}

// =========================
// SEARCH - Buscar livros por título ou autor
// =========================
async function searchBooksByTitleController(req, res) {
    const { search } = req.query; // pega só o valor da chave search
    let books = [];

    try {
        books = await bookServices.searchBooksByTitleService(search);
        logger.info(`Books retrieved with search: "${search}"`);
        res.status(200).json(books);
    } catch (error) {
        if (error instanceof AppError) {
            logger.warn("Handled error:", error.message);
            return res.status(error.statusCode).json({ error: error.message });
        } else {
            logger.error("Unexpected error in searchBooksByTitleController:", error);
            return res.status(500).json({ error: "Unexpected Internal Server Error" });
        }
    }

    logger.info(
        `searchBooksByTitleController executed${books.length ? `, ${books.length} books found successfully!` : ', no books found!'}` 
    );
}




export default {
    createBookController,
    findAllBooksController,
    findBookByIdController,
    updateBookController,
    deleteBookController,
    searchBooksByTitleController
}