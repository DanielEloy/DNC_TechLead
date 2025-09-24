// index.js - VERSÃO CORRIGIDA E TESTADA

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

    container.innerHTML = projectsData.projects.map(project => `
        <div class="project-card">
            <div class="project-icon"><i class="${project.icon}"></i></div>
            <h3 class="project-title">${project.name}</h3>
            <p class="project-desc">${project.description}</p>
            <a href="${project.url_network}" target="_blank" class="project-link">
                Acessar <i class="fas fa-external-link-alt"></i>
            </a>
        </div>
    `).join("");
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
    
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');

    if (!chatToggle || !chatWindow) {
        console.error("❌ Elementos do chat não encontrados no DOM");
        return;
    }

    console.log("✅ Elementos do chat encontrados");

    // Event Listeners
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        console.log("🎯 Chat toggle clicado");
    });

    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    chatSend.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    chatToggle.classList.add('has-notification');
    console.log("🚀 Chat inicializado com sucesso!");
}

// Enviar mensagem - VERSÃO REAL COM API
async function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const message = chatInput.value.trim();

    if (!message) return;

    // Adiciona mensagem do usuário
    addMessage(message, 'user');
    chatInput.value = '';
    chatSend.disabled = true;

    // Indicador de pensamento
    const thinkingMsg = addMessage('💭 Analisando seus projetos...', 'bot thinking');

    try {
        const response = await fetch('https://dnc-tech-lead.vercel.app/', { //    http://localhost:5000/api/chat
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });

        thinkingMsg.remove();

        if (response.ok) {
            const data = await response.json();
            console.log("📩 Resposta da API:", data); // <-- LOG PARA DEBUG

            if (data.error) {
                addMessage(`❌ ${data.error}`, 'bot');
            } else {
                addMessage(data.response, 'bot');
            }

            // Salva no histórico
            chatHistory.push({
                user: message,
                bot: data.response || data.error,
                timestamp: new Date().toISOString()
            });
        } else {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
    } catch (error) {
        console.error('Erro no chat:', error);
        thinkingMsg.remove();

        let errorMessage = '❌ Erro de conexão. ';
        if (error.message.includes('Failed to fetch')) {
            errorMessage += 'Verifique se o servidor está rodando.';
        }
        addMessage(errorMessage, 'bot');
    } finally {
        chatSend.disabled = false;
    }
}

// Adicionar mensagem ao chat
function addMessage(text, type) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return messageDiv; // Retorna para remover mensagens de "thinking"
}

// ===== INICIALIZAÇÃO GERAL =====
document.addEventListener("DOMContentLoaded", function() {
    console.log("📄 DOM Carregado - Iniciando aplicação...");
    
    loadProjects();
    
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    setTimeout(initializeChat, 500);
    
    console.log("🎉 Aplicação inicializada com sucesso!");
});
