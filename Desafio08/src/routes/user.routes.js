import { Router } from "express"
import userControllers from "../controllers/user.controllers.js"
import { validate } from "../middlewares/validation.middlewares.js"
import { userSchema } from "../schema/user.schema.js" 

const router = Router();

// CREATE
router.post("/users", validate(userSchema) , userControllers.createUserController);

// READ
router.get("/users/:id", userControllers.getUserByIdController);

// UPDATE
router.put("/users/:id", userControllers.updateUserController);

// DELETE
router.delete("/users/:id", userControllers.deleteUserController);

// GET ALL USERS
router.get("/users", userControllers.getAllUsersController);

export default router