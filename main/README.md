# 🌐 Projeto Principal – Portfólio de Desafios DNC

Este repositório é o **projeto principal (main)** que organiza e apresenta todos os **desafios desenvolvidos durante o curso TechLead da DNC**.  
Ele combina um **frontend interativo** para navegação entre os projetos e um **backend com chatbot inteligente** (Deloy Bot), capaz de responder dúvidas técnicas sobre os desafios.

🔗 [Repositório no GitHub](https://github.com/DanielEloy/DNC_TechLead/tree/main/main)

---

## ✨ Funcionalidades

- 📋 **Listagem dos projetos** organizados em grade, carregados dinamicamente a partir de `projects.json`.
- 🖥️ **Frontend** leve em HTML, CSS e JavaScript.
- 🤖 **Deloy Bot** – Chatbot integrado para responder dúvidas sobre os projetos.
- 🔌 **Backend Node.js + Express** com integração à API Gemini para geração de respostas.
- 🔄 **Atualização automática de datas** de última modificação e geração da página.

---

## 📂 Estrutura do Projeto


```
main/
├── backend/
│ ├── server.js # Servidor Node.js + API do chatbot
│ ├── projects.json # Contexto com a lista dos projetos
│ ├── package.json # Dependências do backend
│ └── ...
├── index.html # Página principal (frontend)
├── style.css # Estilo da página
├── JS/
│ └── index.js # Scripts de interação frontend
└── README.md
```

## ⚙️ Como Rodar o Projeto

# 🔹 Backend (Chatbot + API)

1. Clone o repositório:

```bash
git clone https://github.com/DanielEloy/DNC_TechLead.git
cd DNC_TechLead/main/backend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

***Crie um arquivo .env com sua chave da API Gemini:***

```bash
GEMINI_API_KEY=your_api_key_here
```

4. Inicie o servidor:

```bash
npm run dev
```

***O backend rodará em:***

```arduino
http://localhost:5000
```

# 🔹 Frontend

1. Navegue até a pasta main:

```bash
cd ../
```

2. Abra o arquivo index.html no navegador ou use uma extensão como Live Server no VS Code.
O frontend irá carregar os projetos listados no projects.json e permitirá interação com o Deloy Bot.

## 💬 Uso do Deloy Bot

***Clique no ícone 🤖 no canto da página para abrir o chat.***

```
Digite sua pergunta, por exemplo:

"Qual projeto usou React?"
"Me fale sobre o Desafio 5"
"Quais projetos utilizam TypeScript?"
```

O bot responde com base no contexto dos projetos carregados no backend.

## 🛠️ Tecnologias Utilizadas

```
Frontend → HTML, CSS, JavaScript (Vanilla)
Backend → Node.js, Express, Axios, Dotenv, CORS
Chatbot → Integração com API Gemini
Infraestrutura → Netlify (Frontend) + Node (Backend)
```

## 🚀 Próximos Passos

```
 Adicionar autenticação para acesso restrito
 Dashboard para gerenciar projetos
 Suporte a mais modelos de IA no chatbot
 Hospedar backend em Render/Heroku para integração contínua
```

### 📜 Licença

***Projeto desenvolvido por Daniel Eloy como parte do curso DNC TechLead.***
***Uso livre para fins de estudo e portfólio.***