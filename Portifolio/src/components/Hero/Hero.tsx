import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-subtitle">Olá, eu sou</p>
            <h1 className="hero-title">Daniel Eloy</h1>
            <h2><b><span style={{ color: 'var(--accent)' }}>Desenvolvedor Full Stack</span></b></h2>
            <p className="hero-description">
              Transformo ideias em experiências digitais incríveis. Especialista em React, Vue e UI/UX Design com mais de 4 anos de experiência criando soluções web inovadoras.
            </p>
            <div className="hero-buttons">
              <a href="https://apresentacaocv.netlify.app/" className="btn btn-primary">Saber mais</a>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://media.licdn.com/dms/image/v2/C4D03AQGjqXRZtbnMWA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1620842173436?e=1757548800&v=beta&t=_o7tKLB0B1ZGHpr9Zv2pGrnZ5udV54duUrvUh61TG6A" alt="Daniel Eloy" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;