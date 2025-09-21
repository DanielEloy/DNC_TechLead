API de Gerenciamento de Biblioteca - Documentação Completa

📋 Visão Geral
API RESTful completa para gerenciamento de uma biblioteca digital, incluindo usuários, livros e empréstimos. Desenvolvida com Node.js, Express e SQLite.

🚀 Características Principais
✅ Autenticação JWT

✅ Validação de dados com Zod

✅ Logging completo com Winston

✅ CRUD completo para usuários, livros e empréstimos

✅ Sistema de permissões e autorização

✅ Consultas relacionais com JOINs

✅ Documentação completa da API

📦 Instalação
bash
# Clone o repositório
git clone <url-do-repositorio>

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Execute em modo desenvolvimento
npm run dev

# Execute em produção
npm start
🔧 Configuração de Ambiente
Crie um arquivo .env na raiz do projeto:

env
NODE_ENV=development
PORT=3000
JWT_SECRET=seu_jwt_secret_super_seguro_aqui
EMAIL_USER=seu_email@provedor.com
EMAIL_PASS=sua_senha_de_email
🗂️ Estrutura do Projeto
text
src/
├── config/          # Configurações do banco de dados
├── controllers/     # Lógica dos endpoints
├── middlewares/    # Autenticação e validação
├── repositories/   # Acesso ao banco de dados
├── routes/         # Definição das rotas
├── schema/         # Esquemas de validação Zod
├── service/        # Lógica de negócio
└── utils/          # Utilitários (logger)
📊 Endpoints da API
👥 Gestão de Usuários
POST /api/users - Criar Usuário
Cria um novo usuário no sistema.

Request:

http
POST /api/users
Content-Type: application/json
Body:

json
{
  "username": "joao_silva",
  "email": "joao@email.com",
  "password": "senhaSegura123"
}
Response (201 Created):

json
{
  "id": 1,
  "username": "joao_silva",
  "email": "joao@email.com",
  "createdAt": "2023-10-15T14:30:00.000Z"
}
GET /api/users/:id - Buscar Usuário por ID
Retorna os detalhes de um usuário específico.

Request:

http
GET /api/users/1
Authorization: Bearer <jwt_token>
Response (200 OK):

json
{
  "id": 1,
  "username": "joao_silva",
  "email": "joao@email.com",
  "createdAt": "2023-10-15T14:30:00.000Z",
  "updatedAt": "2023-10-20T09:15:00.000Z"
}
PUT /api/users/:id - Atualizar Usuário
Atualiza as informações de um usuário existente.

Request:

http
PUT /api/users/1
Authorization: Bearer <jwt_token>
Content-Type: application/json
Body:

json
{
  "username": "joao_silva_updated",
  "email": "joao.novo@email.com"
}
Response (200 OK):

json
{
  "id": 1,
  "username": "joao_silva_updated",
  "email": "joao.novo@email.com",
  "createdAt": "2023-10-15T14:30:00.000Z",
  "updatedAt": "2023-10-25T11:45:00.000Z"
}
DELETE /api/users/:id - Deletar Usuário
Remove um usuário do sistema.

Request:

http
DELETE /api/users/1
Authorization: Bearer <jwt_token>
Response (200 OK):

json
{
  "message": "User deleted successfully",
  "deletedUser": {
    "id": 1,
    "username": "joao_silva_updated",
    "email": "joao.novo@email.com"
  }
}
🔐 Autenticação
POST /api/users/login - Login de Usuário
Autentica um usuário e retorna um token JWT.

Request:

http
POST /api/users/login
Content-Type: application/json
Body:

json
{
  "email": "joao@email.com",
  "password": "senhaSegura123"
}
Response (200 OK):

json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
📚 Gestão de Livros
GET /api/books - Listar Todos os Livros
Retorna todos os livros disponíveis.

Request:

http
GET /api/books
Response (200 OK):

json
[
  {
    "id": 1,
    "title": "Dom Casmurro",
    "author": "Machado de Assis",
    "isbn": "9788544001820",
    "createdAt": "2023-10-15T14:30:00.000Z"
  }
]
GET /api/books/:id - Buscar Livro por ID
Retorna os detalhes de um livro específico.

Request:

http
GET /api/books/1
Response (200 OK):

json
{
  "id": 1,
  "title": "Dom Casmurro",
  "author": "Machado de Assis",
  "isbn": "9788544001820",
  "createdAt": "2023-10-15T14:30:00.000Z"
}
POST /api/books - Criar Livro
Adiciona um novo livro ao sistema (requer autenticação).

Request:

http
POST /api/books
Authorization: Bearer <jwt_token>
Content-Type: application/json
Body:

json
{
  "title": "O Cortiço",
  "author": "Aluísio Azevedo",
  "isbn": "9788572326972"
}
Response (201 Created):

json
{
  "id": 2,
  "title": "O Cortiço",
  "author": "Aluísio Azevedo",
  "isbn": "9788572326972",
  "createdAt": "2023-10-16T10:15:00.000Z"
}
📖 Gestão de Empréstimos
GET /api/loans - Listar Todos os Empréstimos
Retorna todos os empréstimos com informações de usuário e livro.

Request:

http
GET /api/loans
Response (200 OK):

json
[
  {
    "id": 1,
    "dueDate": "2023-11-15T14:30:00.000Z",
    "username": "joao_silva",
    "email": "joao@email.com",
    "title": "Dom Casmurro"
  }
]
POST /api/loans - Criar Empréstimo
Registra um novo empréstimo de livro (requer autenticação).

Request:

http
POST /api/loans
Authorization: Bearer <jwt_token>
Content-Type: application/json
Body:

json
{
  "bookId": 1,
  "dueDate": "2023-11-15"
}
Response (201 Created):

json
{
  "id": 2,
  "userId": 1,
  "bookId": 1,
  "dueDate": "2023-11-15T00:00:00.000Z"
}
🛡️ Autenticação e Autorização
A API utiliza autenticação baseada em tokens JWT. Para acessar endpoints protegidos:

Faça login para obter um token

Inclua o token no header das requisições:

text
Authorization: Bearer <seu_token_jwt>
Os tokens têm validade de 24 horas por padrão.

📋 Códigos de Status HTTP
Código	Status	Descrição
200	OK	Requisição bem-sucedida
201	Created	Recurso criado com sucesso
400	Bad Request	Dados de entrada inválidos
401	Unauthorized	Autenticação necessária
404	Not Found	Recurso não encontrado
409	Conflict	Conflito (email já existente)
500	Internal Server Error	Erro interno do servidor
💻 Exemplos de Uso com cURL
Criar usuário:
bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"maria","email":"maria@email.com","password":"senha123"}'
Fazer login:
bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"maria@email.com","password":"senha123"}'
Buscar usuário (com autenticação):
bash
curl -X GET http://localhost:3000/api/users/1 \
  -H "Authorization: Bearer <seu_token_jwt>"
Buscar todos os livros:
bash
curl -X GET http://localhost:3000/api/books
Criar livro (com autenticação):
bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <seu_token_jwt>" \
  -d '{"title":"O Cortiço","author":"Aluísio Azevedo","isbn":"9788572326972"}'
🛡️ Considerações de Segurança
Senhas hasheadas: Todas as senhas são armazenadas usando hash bcrypt

Autenticação obrigatória: Endpoints sensíveis requerem autenticação

Validação robusta: A API utiliza validação completa de entrada com Zod

Tokens JWT: Autenticação stateless com tokens seguros

Proteção de dados: Erros não expõem detalhes sensíveis em produção

📞 Suporte
Em caso de problemas ou dúvidas, entre em contato com a equipe de desenvolvimento.

Documentação atualizada em: 21 de setembro de 2025