// user.controllers.js
import userServices from "../service/user.services.js"
import { loginService } from "../service/auth.services.js"
import { logger } from "../utils/logger.js"

// CREATE
async function createUserController(req, res) {
    try {
        const newUser = req.body
        if (!newUser.username || !newUser.email || !newUser.password) {
            return res.status(400).send({ error: "Missing required fields" })
        }
        const user = await userServices.createUserService(newUser)
        res.status(201).json(user)
    } catch (error) {
        if (error.message.includes("already exists")) {
            // devolve a mensagem vinda do service
            res.status(409).send({ error: error.message })
        } else {
            logger.error(error)
            res.status(500).send({ error: "Internal server error" })
        }
    }
}

// LOGIN
async function loginUserController(req, res) {
    let { email, password } = req.body;
    
    // Verificar se ambos email e senha foram fornecidos
    if (!email || !password) {
        return res.status(400).send({ 
            error: "Email and password are required" 
        });
    }
    
    // Converter email para minúsculas
    const normalizedEmail = email.toLowerCase();
    
    try {
        const token = await loginService(normalizedEmail, password);
        res.status(200).send({ token });
        logger.debug(`User logged in: ${normalizedEmail}`);
    } catch (e) {
        // Mensagem de erro mais específica
        const errorMessage = e.message.includes("Invalid") 
            ? "Invalid email or password" 
            : e.message;
            
        res.status(401).send({ error: errorMessage });
        logger.warn(`Failed login attempt for email: ${normalizedEmail}, ${e.message}`);
    }
}
    
// READ
// Buscar usuário por ID
async function findUserByIdController(req, res) {
    try {
        const { id } = req.params
        const user = await userServices.getUserByIdService(id)
        if (!user) return res.status(404).send({ error: "User not found" })
        res.json(user)
    } catch (error) {
        console.error(error)
        res.status(500).send({ error: "Internal server error" })
    }
}

// UPDATE
async function updateUserController(req, res) {
    
    try {
        const { id } = req.params
        const updatedUser = req.body
        const result = await userServices.updateUserService(id, updatedUser)
        res.json(result)
    } catch (error) {
        if (error.message === "User not found") {
            res.status(404).send({ error: error.message })
        } else {
            console.error(error)
            res.status(500).send({ error: "Internal server error" })
        }
    }
}

// DELETE
async function deleteUserController(req, res) {
    try {
        const { id } = req.params
        const result = await userServices.deleteUserService(id)
        res.json(result)
    } catch (error) {
        if (error.message === "User not found") {
            res.status(404).send({ error: error.message })
        } else {
            console.error(error)
            res.status(500).send({ error: "Internal server error" })
        }
    }
}

// GET ALL USERS
// Buscar todos os usuários
async function findAllUsersController(req, res) {
  try {
    const users = await userServices.getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
}


export default {
    createUserController,
    findUserByIdController,
    updateUserController,
    deleteUserController,
    findAllUsersController,
    loginUserController
}
