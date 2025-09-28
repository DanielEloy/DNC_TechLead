# 📜 Sistema de Certificados - TechLead

![Python](https://img.shields.io/badge/Python-3.9%252B-blue)
![Netlify](https://img.shields.io/badge/Deployed%2520on-Netlify-00C7B7)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Production%2520Ready-success)

Um sistema completo e automatizado para gerenciamento e exibição de certificados digitais. Oferece uma solução elegante e eficiente para organizar e compartilhar certificações profissionais.

---

## 🌐 Demo em Produção

**URL Oficial:** [https://certificadosdanieleloy.netlify.app](https://certificadosdanieleloy.netlify.app)

---

## ✨ Funcionalidades Principais

### 🚀 Gerenciamento Inteligente de Certificados

* **Detecção Automática:** Novos arquivos PDF na pasta `public` são detectados automaticamente.
* **Atualização em Tempo Real:** Sistema atualiza configurações sem intervenção manual.
* **Gestão de Metadados:** Armazena importância, datas de conclusão e informações personalizadas.

### 🎨 Interface Moderna e Responsiva

* **Design Limpo:** Interface intuitiva e profissional.
* **Sistema de Cores por Prioridade:** Visualização rápida da importância dos certificados.
* **Totalmente Responsivo:** Adaptável a dispositivos móveis e desktop.
* **Navegação Intuitiva:** Acesso direto aos PDFs em nova aba.

### ⚡ Performance e Deploy

* **Build Estático:** Geração otimizada para produção.
* **Deploy Automatizado:** Pipeline configurado para Netlify.
* **Carregamento Rápido:** Assets otimizados e eficientes.

---

## 🛠️ Stack Tecnológico

**Backend**

* Python 3.9+
* `http.server` - Servidor HTTP nativo
* `socketserver` - Gerenciamento de conexões
* JSON - Armazenamento de configurações

**Frontend**

* HTML5 - Estrutura semântica
* CSS3 - Estilos modernos e responsivos
* Design System - Cores e tipografia consistentes

**DevOps & Deploy**

* Netlify - Plataforma de deploy e hosting
* Netlify CLI - Deploy via terminal
* Git Integration - Deploy contínuo (opcional)

---

## 📁 Estrutura do Projeto

```
Certificados/
├── 📂 public/                 # Arquivos públicos e certificados
│   ├── 🎓 Graduação em Sistemas de Informacao - Universidade Anhanguera.pdf
│   ├── 📱 Pós graduação Desenvolvimento de aplicações mobile - Unopar.pdf
│   ├── 🌐 Pós graduação em Desenvolvimento Web Full Stack - Unopar.pdf
│   ├── 💻 Fundamentos de Javascript.pdf
│   ├── 🎨 Introdução ao Desenvolvimento Web.pdf
│   ├── 📱 Responsividade CSS com Media Queries.pdf
│   └── ... (outros certificados)
├── 📂 build/                  # Site estático (gerado automaticamente)
├── ⚙️ config_certificados.json # Configurações e metadados
├── 🏠 index.html              # Página principal
├── 🚀 netlify.toml            # Configuração de deploy
├── 🐍 servidor_certificados.py # Servidor backend
├── 🎨 style.css               # Estilos da aplicação
└── 📖 README.md               # Documentação
```

---

## 🚀 Começando Rápido

### Pré-requisitos

* Python 3.9 ou superior
* Navegador web moderno
* Conta no Netlify (para deploy)

### 🖥️ Execução Local

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd Certificados
```

2. Adicione seus certificados na pasta `public/`
3. Execute o servidor local:

```bash
python servidor_certificados.py
```

4. Acesse a aplicação: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## ⚙️ Configuração de Certificados

Edite `config_certificados.json` para personalizar:

```json
{
  "Nome-do-Certificado.pdf": {
    "importancia": 1,
    "data_conclusao": "01/01/2023"
  }
}
```

**Níveis de Importância:**

* 🥇 1 - Alta: Fundo amarelo (certificados principais)
* 🥈 2 - Média: Fundo verde (certificados importantes)
* 🥉 3 - Baixa: Estilo padrão (certificados complementares)

---

## 📦 Deploy em Produção

### Método 1: Deploy via Terminal (Recomendado)

```bash
# 1. Instalar Netlify CLI
npm install -g netlify-cli

# 2. Navegar para o projeto
cd "Certificados"

# 3. Gerar build estático
python servidor_certificados.py --build-static

# 4. Login na Netlify
netlify login

# 5. Deploy em produção
netlify deploy --dir=build --prod
```

### Método 2: Deploy Automático com Git

* Conecte seu repositório no Netlify
* Configure as variáveis de build:

  * **Build Command:** `python servidor_certificados.py --build-static`
  * **Publish Directory:** `build`
* Deploy automático a cada push

---

## 🔄 Fluxo de Trabalho

Para adicionar novos certificados:

```bash
# 1. Adicionar PDF na pasta public/
# 2. Gerar novo build
python servidor_certificados.py --build-static

# 3. Deploy
netlify deploy --dir=build --prod
```

Para desenvolvimento local:

```bash
# Hot reload
python servidor_certificados.py

# Teste do build estático
python servidor_certificados.py --build-static

# Servir build localmente
cd build && python -m http.server 8001
```

---

## 🎨 Personalização

**Cores e Estilos:**
Edite `style.css`:

```css
/* Cores das prioridades */
.prioridade-1 { background-color: #fff8e1; border-left-color: #f1c40f; }
.prioridade-2 { background-color: #e8f5e9; border-left-color: #2ecc71; }

/* Cores do tema */
:root {
  --primary-color: #2c3e50;
  --secondary-color: #3498db;
  --background-color: #c0ebf8;
}
```

**Metadados Avançados:**

```json
{
  "certificado.pdf": {
    "importancia": 1,
    "data_conclusao": "01/01/2023",
    "instituicao": "Universidade Exemplo",
    "carga_horaria": "40h",
    "categoria": "Desenvolvimento Web"
  }
}
```

---

## 🐛 Solução de Problemas

**Servidor não inicia:**

```bash
python --version
netstat -ano | findstr :8000
```

**Certificados não aparecem:**

* Verifique se os PDFs estão na pasta `public/`
* Confirme permissões de leitura
* Verifique logs do servidor

**Erro no deploy:**

```bash
rm -rf build/
python servidor_certificados.py --build-static
```

**Logs detalhados do servidor:**

```bash
python servidor_certificados.py
python -c "
import os
print('📁 Estrutura:')
print('Pasta public:', os.path.exists('public'))
print('PDFs:', [f for f in os.listdir('public') if f.endswith('.pdf')])
"
```

---

## 📈 Próximas Melhorias

* Sistema de busca e filtros
* Categorização automática
* Modo escuro/claro
* Estatísticas de certificações
* Exportação para PDF/JSON
* Integração com APIs de validação

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch:

```bash
git checkout -b feature/nova-feature
```

3. Commit suas mudanças:

```bash
git commit -m 'Adiciona nova feature'
```

4. Push:

```bash
git push origin feature/nova-feature
```

5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para detalhes.

---

## 👨‍💻 Autor

Daniel Jefferson Correia Eloy

* GitHub: [@danieleloy](https://github.com/danieleloy)
* LinkedIn: [Daniel Eloy](https://www.linkedin.com/in/daniel-eloy/)
* Portfolio: [certificadosdanieleloy.netlify.app](https://certificadosdanieleloy.netlify.app)

---

## 🙏 Agradecimentos

* Comunidade Python por recursos incríveis
* Netlify por oferecer uma plataforma fantástica

⭐️ Se este projeto foi útil, deixe uma estrela no repositório!

**Última atualização:** Setembro 2025
Projeto ativo e em desenvolvimento contínuo
