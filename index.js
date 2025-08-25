let projectsData = { projects: [] };

// 📌 Carregar os projetos do arquivo JSON
async function loadProjects() {
  try {
    const response = await fetch("./projects.json");
    const data = await response.json();
    projectsData.projects = data.projects;
    renderProjects();
  } catch (error) {
    console.error("Erro ao carregar projetos:", error);
    showNotification("⚠️ Não foi possível carregar os projetos.");
  }
}

// 📌 Renderizar os cards
function renderProjects() {
  const container = document.getElementById("projects-container");

  container.innerHTML = projectsData.projects
    .map(
      (project) => `
    <div class="project-card">
      <div class="project-icon">
        <i class="${project.icon}"></i>
      </div>
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

// 📌 Atualizar data/hora em tempo real
function updateDateTime() {
  const now = new Date().toLocaleString("pt-BR", {
    dateStyle: "full",
    timeStyle: "medium",
  });

  document.getElementById("current-time").textContent = now;
}

// 📌 Verificar atualizações (simulação)
async function checkForUpdates() {
  console.log("🔄 Verificando atualizações...");
  await loadProjects();
  document.getElementById("last-updated").textContent =
    new Date().toLocaleString("pt-BR");
  showNotification("✅ Projetos atualizados com sucesso!");
}

// 📌 Notificação amigável
function showNotification(message) {
  const container =
    document.getElementById("notification-container") ||
    (() => {
      const div = document.createElement("div");
      div.id = "notification-container";
      div.style.position = "fixed";
      div.style.top = "20px";
      div.style.right = "20px";
      div.style.zIndex = "1000";
      document.body.appendChild(div);
      return div;
    })();

  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;

  container.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

// 📌 Inicialização
document.addEventListener("DOMContentLoaded", () => {
  loadProjects();
  updateDateTime();
  setInterval(updateDateTime, 1000); // atualiza relógio
  setInterval(checkForUpdates, 60000); // verifica updates a cada 1min
});
