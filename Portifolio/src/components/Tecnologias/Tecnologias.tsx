import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Tecnologias.css";

const tecnologias = {
  backend: [
    { nome: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { nome: "Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
    { nome: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" }
  ],
  frontend: [
    { nome: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { nome: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" }
  ],
  outros: [
    { nome: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" },
    { nome: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { nome: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" }
  ]
};

const Tecnologias: React.FC = () => {
  const location = useLocation();

  // Faz o scroll suave para a seção quando há hash na URL
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <section className="tecnologias-container">
      <h1 className="tecnologias-title">Tecnologias que domino</h1>

      {/* Seção About */}
      <div id="about" className="tecnologias-section">
        <h2>Sobre as Tecnologias</h2>
        <p>
          Ao longo da minha experiência, trabalhei com diversas tecnologias para desenvolvimento Full Stack, incluindo
          backend, frontend e ferramentas de integração.
        </p>
      </div>

      {/* Seção Backend */}
      <div id="backend" className="tecnologias-section">
        <h2>Backend</h2>
        <div className="tecnologias-grid">
          {tecnologias.backend.map((tec, index) => (
            <div key={index} className="tecnologia-card">
              <img src={tec.icon} alt={tec.nome} />
              <p>{tec.nome}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seção Frontend */}
      <div id="frontend" className="tecnologias-section">
        <h2>Frontend</h2>
        <div className="tecnologias-grid">
          {tecnologias.frontend.map((tec, index) => (
            <div key={index} className="tecnologia-card">
              <img src={tec.icon} alt={tec.nome} />
              <p>{tec.nome}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seção Outras */}
      <div id="others" className="tecnologias-section">
        <h2>Outras Ferramentas</h2>
        <div className="tecnologias-grid">
          {tecnologias.outros.map((tec, index) => (
            <div key={index} className="tecnologia-card">
              <img src={tec.icon} alt={tec.nome} />
              <p>{tec.nome}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tecnologias;
