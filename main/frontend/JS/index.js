// JS/index.js
import { logger } from "../../utils/logger";

// ===== CONFIGURAÇÃO DA API =====
const API_BASE_URL = window.location.hostname === "localhost" 
  ? "http://127.0.0.1:5000/api" 
  : "https://dnc-chat-backend.onrender.com/api";

// ===== SISTEMA PRINCIPAL =====
let projectsData = { projects: [] };

// Carregar projetos
async function loadProjects() {
  try {
    const response = await fetch("./projects.json");
    const data = await response.json();
    projectsData.projects = data.projects;
    renderProjects();
  } catch (error) {
    logger.error("❌ Erro ao carregar projetos:", error);
  }
}

// Renderizar projetos
function renderProjects() {
  const container = document.getElementById("projects-container");
  if (!container) return;

  container.innerHTML = projectsData.projects
    .map(
      (project) => `
        <div class="project-card">
            <div class="project-icon"><i class="${project.icon}"></i></div>
            <h3 class="project-title">${project.name}</h3>
            <p class="project-desc">${project.description}</p>
            <a href="${project.url_network}" target="_blank" class="project-link">
                Acessar <i class="fas fa-external-link-alt"></i>
            </a>
        </div>
    `
    )
    .join("");
}

// Atualizar data/hora
function updateDateTime() {
  const now = new Date().toLocaleString("pt-BR");
  const timeElement = document.getElementById("current-time");
  const updatedElement = document.getElementById("last-updated");

  if (timeElement) timeElement.textContent = now;
  if (updatedElement) updatedElement.textContent = now;
}

// ===== SISTEMA DE CHAT =====
let chatHistory = [];

function initializeChat() {
  logger.info("🔧 Inicializando chat...");

  const chatToggle = document.getElementById("chat-toggle");
  const chatWindow = document.getElementById("chat-window");
  const chatClose = document.getElementById("chat-close");
  const chatInput = document.getElementById("chat-input");
  const chatSend = document.getElementById("chat-send");

  if (!chatToggle || !chatWindow) {
    logger.error("❌ Elementos do chat não encontrados no DOM");
    return;
  }

  chatToggle.addEventListener("click", () => {
    const isOpening = !chatWindow.classList.contains("active");
    chatWindow.classList.toggle("active");
    
    // CORREÇÃO: Atualizar aria-hidden baseado no estado
    if (chatWindow.classList.contains("active")) {
      chatWindow.setAttribute("aria-hidden", "false");
      // Focar no input quando abrir
      setTimeout(() => chatInput.focus(), 100);
    } else {
      chatWindow.setAttribute("aria-hidden", "true");
    }
    
    // Adicionar/remover atributo inert para melhor acessibilidade
    if (isOpening) {
      chatWindow.removeAttribute("inert");
    } else {
      chatWindow.setAttribute("inert", "");
    }
  });

  chatClose.addEventListener("click", () => {
    chatWindow.classList.remove("active");
    chatWindow.setAttribute("aria-hidden", "true");
    chatWindow.setAttribute("inert", "");
  });

  chatSend.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  // Adicionar escape key para fechar o chat
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && chatWindow.classList.contains("active")) {
      chatWindow.classList.remove("active");
      chatWindow.setAttribute("aria-hidden", "true");
      chatWindow.setAttribute("inert", "");
      chatToggle.focus();
    }
  });

  chatToggle.classList.add("has-notification");
  logger.info("🚀 Chat inicializado com sucesso!");
}

// Enviar mensagem
async function sendMessage() {
  const chatInput = document.getElementById("chat-input");
  const chatSend = document.getElementById("chat-send");
  const message = chatInput.value.trim();

  if (!message) {
    logger.warn("⚠️ Tentativa de enviar mensagem vazia");
    return;
  }

  logger.info(`📤 Usuário enviou mensagem: "${message.substring(0, 50)}..."`);
  addMessage(message, "user", false);
  chatInput.value = "";
  chatSend.disabled = true;

  const thinkingMsg = addMessage("💭 Analisando seus projetos...", "bot thinking");

  try {
    logger.info(`🌐 Enviando requisição para: ${API_BASE_URL}/chat`);
    logger.debug("📦 Payload:", { message });

    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    thinkingMsg.remove();

    if (response.ok) {
      const data = await response.json();
      logger.success("✅ Resposta da API recebida com sucesso");
      logger.debug("📩 Dados da resposta:", data);

      addMessage(data.response || "Resposta recebida", "bot", true);

      chatHistory.push({
        user: message,
        bot: data.response,
        timestamp: new Date().toISOString(),
      });
      
      logger.info("💾 Mensagem salva no histórico do chat");
    } else {
      const errorText = await response.text();
      logger.error(`❌ Erro HTTP ${response.status}: ${errorText}`);
      throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
    }
  } catch (error) {
    logger.error("💥 Erro detalhado no chat:", error);
    thinkingMsg.remove();

    let errorMessage = "❌ Erro de conexão. ";
    if (error.message.includes("Failed to fetch")) {
      errorMessage += "Verifique se o servidor está rodando.";
      logger.warn("🌐 Servidor possivelmente offline");
    } else if (error.message.includes("500")) {
      errorMessage += "Erro interno do servidor.";
      logger.error("⚡ Erro interno do servidor - verifique API Key Gemini");
    } else {
      errorMessage += error.message;
    }

    addMessage(errorMessage, "bot", false);
  } finally {
    chatSend.disabled = false;
    logger.debug("🔄 Botão de enviar reativado");
  }
}

// Adicionar mensagem ao chat (com suporte a Markdown)
function addMessage(text, type, isMarkdown = false) {
  const chatMessages = document.getElementById("chat-messages");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${type}`;

  logger.info(`🔧 Processando mensagem: type=${type}, isMarkdown=${isMarkdown}, length=${text.length}`);

  if (isMarkdown && window.marked) {
    try {
      logger.info("🎯 Iniciando processamento Markdown...");
      
      // Configurações do marked para melhor renderização
      marked.setOptions({
        breaks: true,
        gfm: true,
        sanitize: false
      });

      // Processar o Markdown
      const htmlContent = marked.parse(text);
      logger.success("✅ Markdown processado com sucesso");
      logger.debug("📝 HTML gerado:", htmlContent.substring(0, 200) + "...");
      
      messageDiv.innerHTML = htmlContent;

      // Adicionar target="_blank" para todos os links
      const links = messageDiv.querySelectorAll('a');
      links.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      });
      
      logger.info(`🔗 ${links.length} links processados`);

    } catch (error) {
      logger.error('❌ Erro ao processar Markdown:', error);
      // Fallback: mostrar texto simples
      messageDiv.textContent = text;
    }
  } else if (isMarkdown && !window.marked) {
    logger.warn("⚠️ Marked.js não disponível, usando fallback simples");
    messageDiv.innerHTML = simpleMarkdownFallback(text);
  } else {
    logger.debug("📝 Mostrando como texto simples");
    messageDiv.textContent = text;
  }

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return messageDiv;
}

// Fallback para Markdown básico se marked não estiver disponível
function simpleMarkdownFallback(text) {
  logger.debug("🔄 Usando fallback Markdown simples");
  return text
    // Negrito
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Itálico  
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Quebras de linha
    .replace(/\n/g, '<br>')
    // Títulos
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>');
}

// ===== INICIALIZAÇÃO GERAL =====
document.addEventListener("DOMContentLoaded", function () {
  logger.info("📄 DOM Carregado - Iniciando aplicação...");
  logger.info(`🌐 API URL: ${API_BASE_URL}`);

  loadProjects();
  updateDateTime();
  setInterval(updateDateTime, 1000);
  setTimeout(initializeChat, 500);

  logger.success("🎉 Aplicação inicializada com sucesso!");

// Debug da inicialização
function checkDependencies() {
  logger.info("🔍 Verificando dependências do sistema:");
  logger.info(`🌐 API URL: ${API_BASE_URL}`);
  logger.success("✅ Font Awesome carregado:", !!document.querySelector('.fa-robot'));
  logger.success("✅ Marked carregado:", !!window.marked);
  
  // Teste do Marked se estiver disponível
  if (window.marked) {
    const testResult = marked.parse("**Teste** de *Markdown*");
    logger.success("✅ Marked.js funcionando:", testResult.includes('<strong>'));
  } else {
    logger.error("❌ Marked.js não carregado");
  }
  
  const chatElements = {
    toggle: !!document.getElementById('chat-toggle'),
    window: !!document.getElementById('chat-window'),
    messages: !!document.getElementById('chat-messages'),
    input: !!document.getElementById('chat-input')
  };
  
  logger.debug("🎯 Elementos do chat:", chatElements);
  
  const allElementsLoaded = Object.values(chatElements).every(Boolean);
  if (allElementsLoaded) {
    logger.success("✅ Todos os elementos do chat carregados");
  } else {
    logger.error("❌ Alguns elementos do chat não foram encontrados");
  }
}

// Chame esta função no final do DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  logger.info("📄 DOM Carregado - Iniciando aplicação...");
  
  loadProjects();
  updateDateTime();
  setInterval(updateDateTime, 1000);
  setTimeout(initializeChat, 500);
  
  // Debug
  setTimeout(checkDependencies, 1000);
  
  logger.success("🎉 Aplicação inicializada com sucesso!");
});
});
