import React, { useState } from 'react';
import './Projects.css';
import Projeto1Img from "../../assets/Projeto1.png";
import Projeto2Img from "../../assets/Projeto2.png";
import Projeto3Img from "../../assets/Projeto3.png";
import Projeto4Img from "../../assets/Projeto4.png";
import Projeto5Img from "../../assets/Projeto5.png";
import Projeto6Img from "../../assets/Projeto6.png";

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filters: string[] = [];

  const projects = [
    {
      image: Projeto1Img,
      category: 'Projeto 1',
      title: 'Desenvolvimento Web',
      description: 'Desenvolvimento Web, Desenvolvendo a primeira landing page',
      url: 'https://dnc-desafio01-landing-page.netlify.app/'
    },
    {
      image: Projeto2Img,
      category: 'Projeto 2',
      title: 'Responsividade usando CSS e Media Queries',
      description: 'Desenvolvendo site com responsividade usando CSS e Media Queries',
      url:'https://dnc-desafio-02.netlify.app/'
    },
    {
      image: Projeto3Img,
      category: 'Projeto 3',
      title: 'Gerenciador de Tarefas',
      description: 'Desenvolvendo site com JavaScript para gerenciar tarefas',
      url:'https://dnc-desafio03.netlify.app/'
    },
    {
      image: Projeto4Img,
      category: 'Projeto 4',
      title: 'Ligando API de tradução',
      description: 'Desenovolvendo site com React, CSS e JavaScript',
      url:'https://dnc-desafio04.netlify.app/'

    },
    {
      image: Projeto5Img,
      category: 'Projeto 5',
      title: 'Gerenciador de tarefas com Node.js e TypeScript',
      description: 'Desenovolvendo site com Node.js e TypeScript',
      url:'https://dnc-desafio05.netlify.app/'
    },
    {
      image: Projeto6Img,
      category: 'Projeto 6',
      title: 'Painel de controle com autenticação',
      description: 'Aplicativo conhecimento para criar um autenticador e um painel de controle.'
    }
  ];

  const filteredProjects = activeFilter === 'Todos' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <h2 className="section-title">Projetos</h2>
        
        <div className="projects-filter">
          {filters.map(filter => (
            <button 
              key={filter}
              className={`btn btn-primary ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div className="project-card" key={index}>
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-content">
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <a href={project.url ?? '#'} className="btn btn-primary" target="_blank" >Clique aqui</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;