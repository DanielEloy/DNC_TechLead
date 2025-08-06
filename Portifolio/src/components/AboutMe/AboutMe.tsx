import React from 'react';
import './AboutMe.css';

interface TimelineItem {
  year: string;
  content: string;
}

const AboutMe: React.FC = () => {
 const timelineData: TimelineItem[] = [
  {
    year: "2018",
    content: "Início da trajetória na área de TI, atuando com suporte técnico e infraestrutura em empresas de médio porte, adquirindo experiência em sistemas corporativos e resolução de incidentes."
  },
  {
    year: "2020 á 2021",
    content: "Atuação como Consultor de Sistemas na Hexa IT, prestando serviços para grandes clientes (Banco do Brasil, Itaú, TIVIT), com foco em integração de sistemas, automação de processos e sustentação."
  },
  {
    year: "2021 á 2022",
    content: "Desenvolvedor Java Pleno na SIS Consultoria, atuando com Java, Spring Boot, integrações REST/SOAP, testes com Postman e SoapUI e correção de vulnerabilidades com Fortify."
  },
  {
    year: "2023 á 2024",
    content: "Analista Funcional no CCB Brasil, responsável por levantamento de requisitos, análise de sistemas, homologação (UAT) e suporte a incidentes críticos, garantindo conformidade com LGPD."
  },
  {
    year: "2024 á 2025",
    content: "Analista Funcional e Desenvolvedor Full Stack no Bank of China, com foco em APIs, automação de processos, integração de sistemas legados via AUTBANK e mitigação de incidentes operacionais."
  }
];

  return (
    <div id="about" className="container">
      <h1 className="section-title">Sobre mim</h1>
      
      <div className="timeline-container">
        <div className="timeline-line"></div>
        
        <div className="timeline-items">
  {timelineData.map((item, index) => (
    <div key={index} className="timeline-item">
      {/* Ano primeiro */}
      <div className="year-header">
        <h2 className="year-title">{item.year}</h2>
      </div>

      {/* Bolinha da timeline (a linha passa atrás) */}
      <div className="timeline-point"></div>

      {/* Texto descritivo depois */}
      <p className="content">{item.content}</p>
    </div>
  ))}
</div>

      </div>
    </div>
  );
};

export default AboutMe;