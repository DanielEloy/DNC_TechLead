import userServices from "../service/user.services.js";
// import { hashPassword } from "../utils/hashPassword.js";

async function createUserController(req, res) {
  try {
    const newUser = req.body;

    // Validação simples
    if (!newUser.username || !newUser.email || !newUser.password) {
      return res.status(400).send({ error: "Campos obrigatórios faltando" });
    }

    // Hash de senha (opcional)
    // newUser.password = await hashPassword(newUser.password);

    const user = await userServices.createUserService(newUser);
    res.status(201).json(user);
  } catch (error) {
    if (error.message.includes("UNIQUE constraint failed")) {
      res.status(409).send({ error: "Username ou email já existe" });
    } else {
      console.error(error);
      res.status(500).send({ error: "Internal server error" });
    }
  }
}

export default {
  createUserController,
};
