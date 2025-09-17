import { Router } from "express"
import userControllers from "../controllers/user.controllers.js"
import { validate, validateUserId } from "../middlewares/validation.middlewares.js"
import { userSchema, userUpdateSchema } from "../schema/user.schema.js" 
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = Router();

// CREATE
router.post("/users", validate(userSchema) , userControllers.createUserController);

// LOGIN
router.post("/users/login", userControllers.loginUserController);

// Middleware de autenticação para proteger as rotas abaixo
router.use(authMiddleware); 

// READ
router.get("/users/:id", validateUserId,userControllers.findUserByIdController);

// UPDATE
router.put("/users/:id", validate(userUpdateSchema) , userControllers.updateUserController);

// DELETE
router.delete("/users/:id", userControllers.deleteUserController);

// GET ALL USERS
router.get("/users", userControllers.findAllUsersController);

export default router