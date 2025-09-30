// src/routes/user.routes.js
import { Router } from "express"
import userControllers from "../controllers/user.controllers.js"
import { validate, validateUserId } from "../middlewares/validation.middlewares.js"
import { userSchema, userUpdateSchema } from "../schema/user.schema.js" 
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { logger } from "../utils/logger.js"

logger.info("User routes initialized")

const router = Router();

// Rotas PÚBLICAS (não requerem autenticação)
router.post("/", validate(userSchema) , userControllers.createUserController);
router.post("/login", userControllers.loginUserController);

// Middleware de autenticação para proteger as rotas abaixo
router.use(authMiddleware); 
router.get("/:id", validateUserId,userControllers.findUserByIdController);
router.put("/:id", validate(userUpdateSchema) , userControllers.updateUserController);
router.delete("/:id", userControllers.deleteUserController);
router.get("/", userControllers.findAllUsersController);

// Logs informativos (apenas para debugging)
logger.debug({
  message: "👤 User Routes Registered",
  routes: [
    "📨 POST    /users          → Create new user",
    "🔐 POST    /users/login    → User login", 
    "👀 GET     /users/:id      → Fetch user by ID",
    "✏️ PUT     /users/:id      → Update user by ID",
    "🗑️ DELETE  /users/:id      → Delete user by ID",
    "👥 GET     /users          → Fetch all users"
  ]
});

export default router