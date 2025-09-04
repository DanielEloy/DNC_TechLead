import userRepositories from "../repositories/user.repositories.js"
import bcrypt from 'bcrypt'

// =========================
// CREATE - Criar um novo usuário
// =========================
async function createUserService(newUser) {
    const { username, email } = newUser

    // Verifica se já existe usuário com o mesmo username ou email
    const existingUsers = await userRepositories.findByUsernameOrEmailRepository(username, email)
    if (existingUsers.length > 0) {
        const conflicts = []
        if (existingUsers.some(u => u.username === username)) {
            conflicts.push("username")
        }
        if (existingUsers.some(u => u.email === email)) {
            conflicts.push("email")
        }
        throw new Error(`Alert: ${conflicts.join(" and ")} already exists`)
    }

    // Criptografa a senha antes de armazenar
    const hashedPassword = await bcrypt.hash(newUser.password, 10)

    // Cria o usuário com a senha criptografada
    const user = await userRepositories.createUserRepository({
        ...newUser,
        password: hashedPassword,
    })
    if (!user) throw new Error("Error creating user")

    // Remove a senha antes de retornar
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
}

// =========================
// READ - Obter usuário por ID
// =========================
async function getUserByIdService(id) {
    const user = await userRepositories.findUserByIdRepository(id)
    if (!user) throw new Error("User not found")

    // Remove a senha antes de retornar
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
}

// =========================
// UPDATE - Atualizar usuário
// =========================
async function updateUserService(id, updatedUser) {
    const existingUser = await userRepositories.findUserByIdRepository(id)
    if (!existingUser) throw new Error("User not found")

    // Verifica se já existe outro usuário com mesmo username/email
    if (updatedUser.username || updatedUser.email) {
        const conflicts = await userRepositories.findByUsernameOrEmailRepository(
            updatedUser.username || "",
            updatedUser.email || ""
        )

        const hasConflict = conflicts.some(u => u.id !== id) // ignora o próprio usuário
        if (hasConflict) {
            throw new Error("Alert: username or email already exists")
        }
    }

    // Se a senha for atualizada, criptografa antes
    if (updatedUser.password) {
        updatedUser.password = await bcrypt.hash(updatedUser.password, 10)
    }

    const user = await userRepositories.updateUserRepository(id, updatedUser)

    // Remove a senha antes de retornar
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
}

// =========================
// DELETE - Excluir usuário
// =========================
async function deleteUserService(id) {
    const existingUser = await userRepositories.findUserByIdRepository(id)
    if (!existingUser) throw new Error("User not found")

    return userRepositories.deleteUserRepository(id)
}

// =========================
// GET ALL USERS - Obter todos os usuários
// =========================
async function getAllUsersService() {
    const users = await userRepositories.findAllUsersRepository()

    // Remove a senha de todos os usuários antes de retornar
    return users.map(u => {
        const { password, ...userWithoutPassword } = u
        return userWithoutPassword
    })
}

// =========================
// Exporta os serviços
// =========================
export default {
    createUserService,
    getUserByIdService,
    updateUserService,
    deleteUserService,
    getAllUsersService
}
