// auth.services.js
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import userRepositories from '../repositories/user.repositories.js';
import bcrypt from 'bcrypt';

// Carrega as variáveis do arquivo .env
dotenv.config();

function generateTokenJWT(id) {
    return jwt.sign({ id}, process.env.JWT_SECRET, { expiresIn: '24h' })
}

async function loginService(email, password) {
    // Converter email para minúsculas para corresponder ao banco de dados
    email = email.toLowerCase();
    
    const user = await userRepositories.findByEmailRepository(email);
    if (!user) throw new Error("Email or password invalid!");

    // Verificar se a senha do usuário existe no banco de dados
    if (!user.password) {
        throw new Error("User has no password set. Please reset your password.");
    }

    // Verificar se a senha foi fornecida no login
    if (!password) {
        throw new Error(" Password is required.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Email or password invalid!");
    return generateTokenJWT(user.id);
}


export { generateTokenJWT, loginService };