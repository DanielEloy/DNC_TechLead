# 📚 API de Gerenciamento de Biblioteca

![Node.js](https://img.shields.io/badge/Node.js-14.x-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![SQLite](https://img.shields.io/badge/SQLite-3.x-orange)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

API RESTful completa para gerenciamento de uma biblioteca digital, incluindo usuários, livros e empréstimos. Desenvolvida com **Node.js**, **Express** e **SQLite**.

---

## 🚀 Principais Recursos

* ✅ Autenticação JWT
* ✅ Validação de dados com Zod
* ✅ Logging completo com Winston
* ✅ CRUD completo para usuários, livros e empréstimos
* ✅ Sistema de permissões e autorização
* ✅ Consultas relacionais com JOINs
* ✅ Documentação completa da API

---

## 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/DanielEloy/DNC_TechLead.git
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Ajuste o ambiente no arquivo `index.js`:

```js
process.env.NODE_ENV = process.env.NODE_ENV || "development";
```

5. Execute em modo desenvolvimento:

```bash
npm run dev
```

6. Execute em produção:

```bash
npm start
```

---

## 🔧 Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
NODE_ENV=development
PORT=3000
JWT_SECRET=seu_jwt_secret_super_seguro_aqui
EMAIL_USER=seu_email@provedor.com
EMAIL_PASS=sua_senha_de_email
```

---

## 🗂 Estrutura do Projeto

```
src/
├── config/        # Configurações do banco de dados
├── controllers/   # Lógica dos endpoints
├── middlewares/   # Autenticação e validação
├── repositories/  # Acesso ao banco de dados
├── routes/        # Definição das rotas
├── schema/        # Esquemas de validação Zod
├── service/       # Lógica de negócio
└── utils/         # Utilitários (logger, helpers)
```

---

## 📊 Endpoints da API

### 👥 Gestão de Usuários

**Rotas Registradas**:

```
📨 POST    /users          → Criar novo usuário
🔐 POST    /users/login    → Login de usuário
👀 GET     /users/:id      → Buscar usuário por ID
✏️ PUT     /users/:id      → Atualizar usuário por ID
🗑️ DELETE  /users/:id      → Deletar usuário por ID
👥 GET     /users          → Buscar todos os usuários
```

**Exemplo: Criar usuário**

```bash
curl -X POST http://localhost:3000/api/users \
-H "Content-Type: application/json" \
-d '{
  "username": "joao_silva",
  "email": "joao@email.com",
  "password": "senhaSegura123"
}'
```

**Response (201 Created):**

```json
{
  "id": 1,
  "username": "joao_silva",
  "email": "joao@email.com",
  "createdAt": "2023-10-15T14:30:00.000Z"
}
```

---

### 🔐 Autenticação

**Login de usuário**

```bash
curl -X POST http://localhost:3000/api/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "joao@email.com",
  "password": "senhaSegura123"
}'
```

**Response (200 OK):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

> Inclua o token no header `Authorization: Bearer <seu_token_jwt>` para acessar endpoints protegidos.

---

### 📚 Gestão de Livros

**Rotas Registradas**:

```
👀 GET     /books          → Buscar todos os livros
👀 GET     /books/:id      → Buscar livro por ID
🔍 GET     /books/search   → Buscar livros
📨 POST    /books          → Criar livro (protegido)
✏️ PATCH   /books/:id      → Atualizar livro por ID (protegido)
🗑️ DELETE  /books/:id      → Deletar livro por ID (protegido)
```

**Exemplo: Criar livro**

```bash
curl -X POST http://localhost:3000/api/books \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <seu_token_jwt>" \
-d '{
  "title": "O Cortiço",
  "author": "Aluísio Azevedo",
  "isbn": "9788572326972"
}'
```

**Response (201 Created):**

```json
{
  "id": 2,
  "title": "O Cortiço",
  "author": "Aluísio Azevedo",
  "isbn": "9788572326972",
  "createdAt": "2023-10-16T10:15:00.000Z"
}
```

---

### 📖 Gestão de Empréstimos

**Rotas Registradas**:

```
📨 POST    /loans      → Criar empréstimo
👀 GET     /loans      → Buscar todos os empréstimos
👀 GET     /loans/:id  → Buscar empréstimo por ID
🗑️ DELETE  /loans/:id  → Deletar empréstimo
```

**Exemplo: Criar empréstimo**

```bash
curl -X POST http://localhost:3000/api/loans \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <seu_token_jwt>" \
-d '{
  "bookId": 1,
  "dueDate": "2023-11-15"
}'
```

**Response (201 Created):**

```json
{
  "id": 2,
  "userId": 1,
  "bookId": 1,
  "dueDate": "2023-11-15T00:00:00.000Z"
}
```

---

## 🛡️ Autenticação e Autorização

* JWT stateless
* Tokens devem ser incluídos no header:

```
Authorization: Bearer <seu_token_jwt>
```

---

## 📋 Códigos de Status HTTP

| Código | Descrição                                        |
| ------ | ------------------------------------------------ |
| 200    | OK – Requisição bem-sucedida                     |
| 201    | Created – Recurso criado com sucesso             |
| 400    | Bad Request – Dados inválidos                    |
| 401    | Unauthorized – Autenticação necessária           |
| 404    | Not Found – Recurso não encontrado               |
| 409    | Conflict – Conflito (ex: email já existente)     |
| 500    | Internal Server Error – Erro interno do servidor |

---

## 🛡️ Considerações de Segurança

* Senhas armazenadas com **hash bcrypt**
* Endpoints sensíveis exigem autenticação
* Validação robusta com **Zod**
* JWTs seguros e stateless
* Erros não expõem informações sensíveis em produção

---

## 📞 Suporte

Em caso de problemas ou dúvidas, entre em contato com a equipe de desenvolvimento.

---

*Documentação atualizada em: 21 de setembro de 2025*
