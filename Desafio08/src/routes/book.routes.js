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
router.get("/books/search", bookControllers.searchBooksByTitleController)
router.get("/books/:id", bookControllers.findBookByIdController)

// Rotas PROTEGIDAS (requerem autenticação)
router.post("/books", authMiddleware, validate(bookSchema), bookControllers.createBookController)
router.patch("/books/:id", authMiddleware, validateBookId, bookControllers.updateBookController)
router.delete("/books/:id", authMiddleware, validateBookId, bookControllers.deleteBookController)

// Logs informativos (apenas para debugging)
logger.debug({
  message: "📚 Book Routes Registered", 
  routes: [
    "👀 GET     /books          → Fetch all books",
    "👀 GET     /books/:id      → Fetch book by ID",
    "🔍 GET     /books/search   → Search books",
    "📨 POST    /books          → Create new book (protected)",
    "✏️ PATCH   /books/:id      → Update book by ID (protected)",
    "🗑️ DELETE  /books/:id      → Delete book by ID (protected)"
  ]
});

export default router