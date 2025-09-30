# 🌐 Portfólio Pessoal - React + TypeScript + Vite

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.0-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38B2AC?logo=tailwindcss)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![License](https://img.shields.io/badge/License-MIT-green)

Um portfólio moderno, responsivo e otimizado para apresentar projetos, habilidades e formas de contato.  
Desenvolvido com **React, TypeScript, Vite e TailwindCSS**, seguindo boas práticas de arquitetura e organização de componentes.

---

## 🌐 Demo em Produção

**URL Oficial:** [https://meuportifolio.netlify.app](https://meuportifolio.netlify.app)  
*(substitua pelo link real do deploy)*

---

## ✨ Funcionalidades Principais

### 🖥️ Estrutura do Portfólio
* **Seções dedicadas**: Hero, Skills, Projetos, Contato e Footer.
* **Navegação suave** com `react-router-hash-link`.
* **Design responsivo** (desktop e mobile first).

### 🎨 Interface Moderna
* Estilização com **TailwindCSS**.
* Ícones interativos via **React Icons**.
* Layout clean e profissional.

### ⚡ Performance
* Vite para builds rápidos e HMR.
* TypeScript para tipagem forte e manutenção.
* Componentes isolados e reutilizáveis.

---

## 🛠️ Stack Tecnológico

**Frontend**
- React 19.1
- TypeScript 5.8
- Vite 7.0
- TailwindCSS 4.1
- React Router DOM 7.7

**Ferramentas de Desenvolvimento**
- ESLint + TypeScript-ESLint
- PostCSS + Autoprefixer
- React Refresh + Hooks Linting

---

## 📁 Estrutura do Projeto

```
src/
├── assets/                  # Imagens, ícones e recursos estáticos
├── components/              # Componentes principais
│   ├── Header/              # Cabeçalho e navegação
│   ├── Hero/                # Seção inicial de destaque
│   ├── Skills/              # Habilidades técnicas
│   ├── Projects/            # Lista de projetos
│   ├── Contact/             # Formulário de contato
│   └── Footer/              # Rodapé
├── App.tsx                  # Estrutura principal
├── App.css                  # Estilos globais
├── index.css                # Configuração Tailwind
├── main.tsx                 # Ponto de entrada
└── vite-env.d.ts            # Tipagem do Vite
```

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
* Node.js 20+
* NPM ou Yarn

### Passos
```bash
# 1. Clonar o repositório
git clone <url-do-repositorio>
cd portifolio

# 2. Instalar dependências
npm install

# 3. Rodar ambiente de desenvolvimento
npm run dev

# 4. Gerar build de produção
npm run build

# 5. Pré-visualizar build
npm run preview
```

---

## 📦 Scripts Disponíveis

```bash
npm run dev       # Rodar ambiente de desenvolvimento
npm run build     # Gerar build para produção
npm run preview   # Visualizar build localmente
npm run lint      # Rodar linter
npm run build:css # Gerar saída CSS com Tailwind
```

---

## 🎨 Personalização

- **Cores e estilos** podem ser ajustados em `index.css` e `tailwind.config.js`.
- **Seções e componentes** podem ser adicionados/modificados na pasta `components/`.
- **Ícones extras** disponíveis via `react-icons`.

---

## 📈 Melhorias Futuras

- Adicionar animações com Framer Motion.
- Criar modo **dark/light**.
- Painel de admin para gerenciar projetos.
- Integração com API de envio de mensagens no contato.

---

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch:  
   ```bash
   git checkout -b feature/nova-feature
   ```
3. Commit suas alterações:  
   ```bash
   git commit -m "Adiciona nova feature"
   ```
4. Push para o branch:  
   ```bash
   git push origin feature/nova-feature
   ```
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

## 👨‍💻 Autor

Daniel Jefferson Correia Eloy

- GitHub: [@danieleloy](https://github.com/danieleloy)  
- LinkedIn: [Daniel Eloy](https://www.linkedin.com/in/daniel-eloy/)  

---

⭐ Se este projeto te inspirou, não esqueça de deixar uma estrela no repositório!
