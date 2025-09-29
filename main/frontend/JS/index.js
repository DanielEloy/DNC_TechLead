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
    console.error("Erro ao carregar projetos:", error);
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
  console.log("🔧 Inicializando chat...");

  const chatToggle = document.getElementById("chat-toggle");
  const chatWindow = document.getElementById("chat-window");
  const chatClose = document.getElementById("chat-close");
  const chatInput = document.getElementById("chat-input");
  const chatSend = document.getElementById("chat-send");

  if (!chatToggle || !chatWindow) {
    console.error("❌ Elementos do chat não encontrados no DOM");
    return;
  }

  console.log("✅ Elementos do chat encontrados");

  // Event Listeners
  chatToggle.addEventListener("click", () => {
    chatWindow.classList.toggle("active");
    console.log("🎯 Chat toggle clicado");
  });

  chatClose.addEventListener("click", () => {
    chatWindow.classList.remove("active");
  });

  chatSend.addEventListener("click", sendMessage);

  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  chatToggle.classList.add("has-notification");
  console.log("🚀 Chat inicializado com sucesso!");
}

// Enviar mensagem - CORRIGIDO
async function sendMessage() {
  const chatInput = document.getElementById("chat-input");
  const chatSend = document.getElementById("chat-send");
  const message = chatInput.value.trim();

  if (!message) return;

  addMessage(message, "user");
  chatInput.value = "";
  chatSend.disabled = true;

  const thinkingMsg = addMessage("💭 Analisando seus projetos...", "bot thinking");

  try {
    console.log(`📤 Enviando para: ${API_BASE_URL}/chat`);
    
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    thinkingMsg.remove();

    if (response.ok) {
      const data = await response.json();
      console.log("📩 Resposta da API:", data);

      addMessage(data.response || "Resposta recebida", "bot");

      chatHistory.push({
        user: message,
        bot: data.response,
        timestamp: new Date().toISOString(),
      });
    } else {
      const errorText = await response.text();
      throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
    }
  } catch (error) {
    console.error("Erro detalhado no chat:", error);
    thinkingMsg.remove();

    let errorMessage = "❌ Erro de conexão. ";
    if (error.message.includes("Failed to fetch")) {
      errorMessage += "Verifique se o servidor está rodando.";
    } else if (error.message.includes("500")) {
      errorMessage += "Erro interno do servidor. Verifique a API Key Gemini.";
    } else {
      errorMessage += error.message;
    }
    
    addMessage(errorMessage, "bot");
  } finally {
    chatSend.disabled = false;
  }
}

// Adicionar mensagem ao chat
function addMessage(text, type) {
  const chatMessages = document.getElementById("chat-messages");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = text;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return messageDiv;
}

// ===== INICIALIZAÇÃO GERAL =====
document.addEventListener("DOMContentLoaded", function () {
  console.log("📄 DOM Carregado - Iniciando aplicação...");
  console.log(`🌐 API URL: ${API_BASE_URL}`);

  loadProjects();
  updateDateTime();
  setInterval(updateDateTime, 1000);
  setTimeout(initializeChat, 500);

  console.log("🎉 Aplicação inicializada com sucesso!");
});