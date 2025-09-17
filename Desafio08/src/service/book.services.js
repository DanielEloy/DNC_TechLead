import bookRepositories from "../repositories/book.repositories.js";
import { logger } from "../utils/logger.js";

// =========================
// CREATE - Criar um novo livro
// =========================
async function createBookService(newBook, userId) {
    const createdBook = await bookRepositories.createBookRepository(
        newBook, 
        userId
    );
    if (!createdBook) {
        logger.error("Error creating book in service");
        throw new Error("Error creating book");
    }
    logger.info(`Book created successfully: ${createdBook.title}`);
    return createdBook;
}
// =========================
// READ - Buscar todos os livros
// =========================
async function findAllBooksService() {
    const books = await bookRepositories.findAllBooksRepository();
    if (!books) {
        logger.error("Error fetching books in service");
        throw new Error("Error fetching books");
    }
    logger.info(`Fetched ${books.length} books`);
    return books;
}

export default {
    createBookService,
    findAllBooksService
}
