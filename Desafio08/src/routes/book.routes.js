// book.routes.js
import bookControllers from "../controllers/book.controllers.js"
import { Router } from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { validate, validateBookId } from '../middlewares/validation.middlewares.js';
import { bookSchema } from "../schema/book.schema.js";

const router = Router()


// Rota para buscar todos os livros 
router.get("/books",bookControllers.findAllBooksController)

// Rota para buscar livros por título ou autor
router.get("/books/search", bookControllers.searchBooksByTitleController)

// Middleware de autenticação para proteger as rotas abaixo
router.use(authMiddleware) 

// Rota para criar um novo livro (protegida por autenticação)
router.post("/books", validate(bookSchema), bookControllers.createBookController)

// Rota para buscar um livro por ID (protegida por autenticação)
router.get("/books/:id", validateBookId, bookControllers.findBookByIdController)

// Rota para atualizar um livro por ID (protegida por autenticação)
router.patch("/books/:id", validateBookId, bookControllers.updateBookController)

// Rota para deletar um livro por ID (protegida por autenticação)
router.delete("/books/:id", validateBookId, bookControllers.deleteBookController)

export default router