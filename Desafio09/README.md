# 📚 API de Gestão de Biblioteca - Backend

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![SQLite](https://img.shields.io/badge/SQLite-3.x-orange)
![Deploy](https://img.shields.io/badge/Deploy-Railway-blueviolet)
![Frontend](https://img.shields.io/badge/Frontend-Netlify-00C7B7)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

API RESTful completa para gerenciamento de uma biblioteca digital, desenvolvida com **Node.js**, **Express** e **SQLite**.  
Este backend fornece todas as operações CRUD para gestão de livros com uma arquitetura robusta e escalável.

---

## 🎯 Status do Projeto - DEPLOYADO E FUNCIONANDO

### 🔗 Links de Produção

🌐 **Frontend:** [https://dnc-desafio09.netlify.app/](https://dnc-desafio09.netlify.app/)  
🔙 **Backend API:** [https://backend-biblioteca-production.up.railway.app](https://backend-biblioteca-production.up.railway.app)  
📊 **Health Check:** [https://backend-biblioteca-production.up.railway.app/health](https://backend-biblioteca-production.up.railway.app/health)  
📚 **API Livros:** [https://backend-biblioteca-production.up.railway.app/api/livros](https://backend-biblioteca-production.up.railway.app/api/livros)

💻 **Repositório:**  
📂 [Código Fonte no GitHub](https://github.com/DanielEloy/DNC_TechLead/tree/main/Desafio09)

---

## 🏗️ Plataformas

- **Frontend:** Netlify  
- **Backend:** Railway  
- **Database:** SQLite (persistente no Railway)

---

## 🚀 Principais Recursos

✅ API RESTful completa para gestão de livros  
✅ Banco de dados SQLite com persistência de dados  
✅ Sistema de logging customizado com cores e timestamps  
✅ Validação de dados robusta em todas as rotas  
✅ Tratamento de erros completo e informativo  
✅ CORS configurado para integração com frontend  
✅ Documentação completa da API  
✅ Health checks para monitoramento  
✅ Deploy automatizado no Railway  
✅ Integração contínua com GitHub

---

## 🛠 Stack Tecnológica

| Tecnologia | Versão | Finalidade |
|-------------|---------|-------------|
| Node.js | 18.x | Runtime JavaScript |
| Express.js | 4.21.x | Framework web |
| SQLite3 | 5.1.x | Banco de dados |
| CORS | 2.8.x | Integração frontend |
| Nodemon | 3.1.x | Desenvolvimento |
| Railway | - | Deploy e Hosting Backend |
| Netlify | - | Deploy Frontend |
| Vite | 4.x | Build tool Frontend |
| React | 18.x | Framework Frontend |

---

## 📦 Instalação e Configuração Local

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/DanielEloy/DNC_TechLead.git
cd DNC_TechLead/Desafio09
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

### 3️⃣ Configuração do Ambiente

Crie um arquivo `.env` na raiz do backend:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=./data/biblioteca.db
FRONTEND_URL=http://localhost:5173
```

### 4️⃣ Frontend Setup

```bash
cd ../frontend
npm install
```

### 5️⃣ Execução do Projeto

Backend (Terminal 1):

```bash
cd backend
npm run dev
```

Frontend (Terminal 2):

```bash
cd frontend
npm run dev
```

### 6️⃣ Verificação do Sistema

- Backend: [http://localhost:3000/health](http://localhost:3000/health)  
- Frontend: [http://localhost:5173](http://localhost:5173)

---

## 🌐 Deploy e Produção

### 🚀 Backend no Railway

```bash
npm install -g @railway/cli
railway login
railway init
railway up
railway domain
```

Variáveis de ambiente no Railway:

```env
NODE_ENV=production
PORT=$PORT
DATABASE_URL=/app/data/biblioteca.db
```

### 🎨 Frontend no Netlify

Build Command: `npm run build`  
Publish Directory: `dist`

Variável de ambiente:

```env
VITE_API_URL=https://backend-biblioteca-production.up.railway.app
```

---

## 📊 Endpoints da API

### 🏠 Health Check

```text
GET https://backend-biblioteca-production.up.railway.app/health
```

**Response:**

```json
{ "status": "OK", "message": "Backend da Biblioteca funcionando!" }
```

### 📚 Gestão de Livros

| Método | Endpoint | Descrição |
|---------|-----------|-----------|
| GET | /api/livros | Lista todos os livros |
| GET | /api/livros/:id | Busca um livro pelo ID |
| POST | /api/livros | Cria um novo livro |
| PUT | /api/livros/:id | Atualiza um livro existente |
| DELETE | /api/livros/:id | Remove um livro |

---

## 🗂 Estrutura do Projeto

```text
Desafio09/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   └── livros.routes.js
│   │   └── utils/
│   │       └── logger.js
│   ├── data/
│   ├── database.js
│   ├── index.js
│   ├── index-simple.js
│   └── package.json
└── frontend/
    ├── src/
    ├── package.json
    └── vite.config.js
```

---

## 📋 Códigos de Status HTTP

| Código | Descrição | Cenário |
|---------|------------|----------|
| 200 | OK | Requisição bem-sucedida |
| 201 | Created | Recurso criado com sucesso |
| 400 | Bad Request | Dados inválidos |
| 404 | Not Found | Recurso não encontrado |
| 500 | Internal Server Error | Erro interno |

---

## 🛡️ Sistema de Logging

Exemplo de logs:

```text
10/10/2025 03:31:40 [INFO] (app/index.js:69) - 🚀 Servidor rodando na porta 8080
10/10/2025 03:31:40 [SUCCESS] (app/database.js:23) - ✅ Conectado ao banco de dados SQLite
```

---

## 🗃️ Estrutura do Banco de Dados

Tabela: **books**

| Campo | Tipo | Descrição |
|--------|------|-----------|
| id | INTEGER PRIMARY KEY AUTOINCREMENT | ID do livro |
| titulo | TEXT NOT NULL | Título |
| num_paginas | INTEGER | Número de páginas |
| isbn | TEXT | Código ISBN |
| editora | TEXT | Editora |
| created_at | DATETIME | Data de criação |

---

## 🔍 Monitoramento e Debug

- **Health Check:** `GET /health`  
- **Logs:** Railway Dashboard  
- **Métricas:** Uso de CPU, memória e deploy logs

---

## 🔄 Desenvolvimento e Contribuição

```bash
git checkout -b minha-feature
git commit -m "Adiciona nova feature"
git push origin minha-feature
```

---

## 📞 Suporte

📧 **Email:** [dans_eloy@hotmail.com](mailto:dans_eloy@hotmail.com)  
🐛 **Issues:** [GitHub Issues](https://github.com/DanielEloy/DNC_TechLead/issues)  
🚀 **Railway:** [Dashboard Railway](https://railway.app)  
🌐 **Netlify:** [Dashboard Netlify](https://netlify.com)

---

## 🎯 Melhorias Planejadas

- [ ] Autenticação JWT  
- [ ] Paginação  
- [ ] Filtros avançados  
- [ ] Upload de capas  
- [ ] Sistema de empréstimos  
- [ ] Painel administrativo  
- [ ] Testes automatizados  
- [ ] Documentação Swagger

---

## 📄 Licença

Este projeto está sob a licença **MIT**.

---

## 👨‍💻 Autor

**Daniel Eloy**  
📧 [dans_eloy@hotmail.com](mailto:dans_eloy@hotmail.com)  
💼 [GitHub - DanielEloy](https://github.com/DanielEloy)  
🌐 [LinkedIn - Daniel Eloy](https://linkedin.com/in/daniel-eloy)

---

📅 **Última atualização:** 10 de Outubro de 2025  
✅ **Status:** SISTEMA COMPLETO E FUNCIONANDO EM PRODUÇÃO  
⭐ *Se este projeto foi útil, considere dar uma estrela!*  
