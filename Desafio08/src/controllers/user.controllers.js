import userServices from "../service/user.services.js"

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
            console.error(error)
            res.status(500).send({ error: "Internal server error" })
        }
    }
}

// READ
async function getUserByIdController(req, res) {
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
async function getAllUsersController(req, res) {
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
    getUserByIdController,
    updateUserController,
    deleteUserController,
    getAllUsersController
}
