// src/routes/book.routes.js
import bookControllers from "../controllers/book.controllers.js"
import { Router } from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { validate, validateBookId } from '../middlewares/validation.middlewares.js'
import { bookSchema } from "../schema/book.schema.js"
import { logger } from "../utils/logger.js"

logger.info("Book routes initialized")

const router = Router()

// Rotas PÚBLICAS (não requerem autenticação)
router.get("/books", bookControllers.findAllBooksController)
router.get("/books/:id", bookControllers.findBookByIdController)
router.get("/books/search", bookControllers.searchBooksByTitleController)

// Rotas PROTEGIDAS (requerem autenticação)
router.post("/books", authMiddleware, validate(bookSchema), bookControllers.createBookController)
router.patch("/books/:id", authMiddleware, validateBookId, bookControllers.updateBookController)
router.delete("/books/:id", authMiddleware, validateBookId, bookControllers.deleteBookController)

// Logs informativos (apenas para debugging)
logger.info("GET /books route registered for fetching all books")
logger.info("GET /books/:id route registered for fetching a book by ID")
logger.info("GET /books/search route registered for searching books")
logger.info("POST /books route registered for creating a new book (protected)")
logger.info("PATCH /books/:id route registered for updating a book by ID (protected)")
logger.info("DELETE /books/:id route registered for deleting a book by ID (protected)")

export default router