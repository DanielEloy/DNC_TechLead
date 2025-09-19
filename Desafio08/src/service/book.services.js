//book.services.js

//=========================
// Service - Camada de lógica de negócio
//=========================
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
    //logger.info(`Fetched ${books.length} books`);
    return books;
}

async function findBookByIdService(bookId) {
    const book = await bookRepositories.findAllBooksRepository(bookId);
    if (!book) {
        logger.error("Error fetching book by ID in service");
        throw new Error("Error fetching book by ID");
    }
    //logger.info(`Fetched book by ID: ${bookId}`);
    return book;
}
// =========================
// UPDATE - Atualizar um livro
// =========================
async function updateBookService(updateBook ,bookId, userId) {
    const book = await bookRepositories.updateBookRepository(
        updateBook, 
        bookId
    );
    if (!book) {
        logger.error("Error updating book in service");
        throw new Error("Error updating book");
    }
    logger.info(`Book updated successfully: ${book.title}`);
    return book;
}
// =========================
// DELETE - Deletar um livro
// =========================
async function deleteBookService(bookId, user) {
  const book = await bookRepositories.deleteBookRepository(bookId);

  if (!book) {
    logger.warn(`Book with ID ${bookId}, is ${book}, not found!`);
    throw { status: 404, message: "Book not found" };
  }

  // valida se o usuário é o dono do livro
  if (String(book.userId) !== String(user.id)) {
    logger.warn(
      `User ${user.id} tried to delete book ${bookId} owned by ${book.userId}`
    );
    throw { status: 403, message: "You don't have permission to delete this book" };
  }

  logger.info(
    `Book deleted successfully -> ID: ${book.id}, Title: "${book.title}", Author: "${book.author}"`
  );
 
  return book; // retorna o livro deletado
}

// =========================
// SEARCH - Buscar livros por título ou autor
// =========================
async function searchBooksByTitleService(search) {
    if (!search || typeof search !== 'string') {
        return await bookRepositories.findAllBooksRepository();
    }
    
    const trimmedSearch = search.trim();
    if (trimmedSearch === '') {
        return await bookRepositories.findAllBooksRepository();
    }

    return await bookRepositories.searchBooksByTitleRepository(trimmedSearch);
}

export default {
    createBookService,
    findAllBooksService,
    findBookByIdService,
    updateBookService,
    deleteBookService,
    searchBooksByTitleService
}
