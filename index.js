// Dados dos projetos - em um cenário real, isso seria um arquivo JSON externo
const projectsData = {
  projects: [
    {
      name: "Portifólio",
      description: "Me apresentando e mostrando minha trajetória",
      //"url": "https://apresentacaocv.netlify.app/", //Antigo
      url: "https://portifolio-daniel-eloy.netlify.app/",
      //"url": "http://localhost:3010/", //Desenvolvimento local
      icon: "fas fa-folder-open",
      type: "folder",
    },
    {
      name: "Certificados",
      description: "Meus certificados de conclusão",
      url: window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" 
       ? "http://localhost:8000" : "https://seus-certificados.netlify.app",
      //uri: "http://127.0.0.1:8000/",
      //url: "./Certificados/public/index.html",
      icon: "fas fa-certificate",
      type: "folder",
    },
    {
      name: "Projeto 01",
      description: "Desenvolvendo a primeira landing page do curso",
      /* "url": "https://dnc-desafio01-landing-page.netlify.app/", */
      url: "../Desafio01/Introducao_ao_Desenvolvimento_Web/RID183995_Desafio01/index.html",
      icon: "fas fa-code",
      type: "challenge",
    },
    {
      name: "Projeto 02",
      description:
        "Desenvolvendo site com responsividade usando CSS e Media Queries",
      url: "../Desafio02/Responsividade_CSS_com_Media_Queries/RID183995_Desafio02/index.html",
      icon: "fas fa-code",
      type: "challenge",
    },
    {
      name: "Projeto 03",
      description: "Desenvolvendo site com JavaScript",
      url: "../Desafio03/Fundamentos_de_Javascript/RID183995_Desafio03/index.html",
      icon: "fas fa-code",
      type: "challenge",
    },
    {
      name: "Projeto 04",
      description: "Desenovolvendo site com React, CSS e JavaScript",
      url: "https://dnc-desafio04.netlify.app/",
      /* "url": "http://192.168.15.17:3000/", */ //Desenovolvimento local
      icon: "fas fa-code",
      type: "challenge",
    },
    {
      name: "Projeto 05",
      description: "Desenovolvendo site com Node.js e TypeScript",
      url: "https://dnc-desafio05.netlify.app/",
      /* "url": "http://192.168.15.20:3001/", */ //Desenovolvimento local
      icon: "fas fa-code",
      type: "challenge",
    },

    {
      name: "Projeto 06",
      description:
        "Desenvolvendo com Node.js, TypeScript paniel de monitoramento de vendas" +
        "Login: daniel@dnc.com" +
        +"Password: @DNCReact178#",
      url: "https://dnc-desafio06.netlify.app/",
      //"url": "../Desafio06/introducao_ao_NPM_node_Package_manager/index.html", //Desenovolvimento local
      icon: "fas fa-code",
      type: "challenge",
    },
    {
      name: "Projeto 07",
      description:
        "NPM (node Package manager), lib para contagem de data e disponibilizando no NPM",
      url: "https://dnc-desafio07.netlify.app/",
      url: "../Desafio07/introducao_ao_NPM_node_Package_manager/index.html",
      icon: "fas fa-code",
      type: "challenge",
    },
    {
      name: "Documentação",
      description: "README do projeto",
      url: "https://github.com/DanielEloy/DNC_TechLead/blob/main/README.md",
      icon: "fas fa-book",
      type: "file",
    },
  ],
};

// Função para exibir os projetos
function renderProjects() {
  const container = document.getElementById("projects-container");
  container.innerHTML = "";

  projectsData.projects.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
                    <div class="project-icon">
                        <i class="${project.icon}"></i>
                    </div>
                    <h3 class="project-title">${project.name}</h3>
                    <p class="project-desc">${project.description}</p>
                    <a href="${project.url}" target="_blank" class="project-link">
                        Acessar <i class="fas fa-external-link-alt"></i>
                    </a>
                `;

    container.appendChild(card);
  });
}

// Atualizar a data/hora
function updateDateTime() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const formattedDate = now.toLocaleDateString("pt-BR", options);
  document.getElementById("current-time").textContent = formattedDate;
  document.getElementById("last-updated").textContent = formattedDate;
}

// Verificar atualizações
function checkForUpdates() {
  if (!document.getElementById("auto-update-toggle").checked) return;

  // Em um cenário real, aqui você faria uma requisição para verificar
  // se o arquivo JSON foi atualizado no servidor

  // Para demonstração, vamos simular uma atualização a cada 30 segundos
  const lastUpdate = new Date().toLocaleTimeString();
  console.log(`Verificando atualizações às ${lastUpdate}...`);
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  updateDateTime();

  // Atualizar a data/hora a cada minuto
  setInterval(updateDateTime, 60000);

  // Verificar atualizações a cada 30 segundos
  setInterval(checkForUpdates, 30000);

  // Configurar o toggle de atualização automática
  document
    .getElementById("auto-update-toggle")
    .addEventListener("change", function () {
      const status = this.checked ? "ativada" : "desativada";
      console.log(`Atualização automática ${status}`);
    });
});

// Função para adicionar novo projeto (para demonstração)
// Em um cenário real, você chamaria essa função quando detectasse mudanças
window.addNewProject = function (name, description, url) {
  const newProject = {
    name: name,
    description: description,
    url: url,
    icon: "fas fa-code",
    type: "challenge",
  };

  projectsData.projects.push(newProject);
  renderProjects();

  // Mostrar notificação
  const notification = document.createElement("div");
  notification.innerHTML = `<div class="highlight">Novo projeto adicionado: ${name}</div>`;
  notification.style.position = "fixed";
  notification.style.top = "20px";
  notification.style.right = "20px";
  notification.style.padding = "15px 25px";
  notification.style.background = "rgba(0, 0, 0, 0.7)";
  notification.style.borderRadius = "8px";
  notification.style.zIndex = "1000";
  notification.style.animation = "fadeInOut 3s forwards";

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
};
