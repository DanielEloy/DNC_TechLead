// book.routes.js
import bookControllers from "../controllers/book.controllers.js"
import { Router } from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { validate } from '../middlewares/validation.middlewares.js';
import { bookSchema } from "../schema/book.schema.js";

const router = Router()


// Rota para buscar todos os livros 
router.get("/books",bookControllers.findAllBooksController)

// Middleware de autenticação para proteger as rotas abaixo
router.use(authMiddleware) 

// Rota para criar um novo livro (protegida por autenticação)
router.post("/books", validate(bookSchema), bookControllers.createBookController)


export default router