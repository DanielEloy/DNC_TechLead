import React from 'react';
import './Contact.css';
import iconLinkedin from '../../assets/iconLinkedinG.svg'
import iconGitHub from '../../assets/IconGitHubG.svg'
import iconFigma from '../../assets/IconFigmaG.svg'

const Contact: React.FC = () => {
  return (
    <section className="container">
      <div className="contact-info">
        <div>
          <h1 className="contact-item">Meu contato</h1>
          <h1> +55 (11) 99187-9192</h1>
        </div>

        <div>
          <h1 className="contact-item" id="email" >E-mail</h1>
          <h1> dans_eloy@hotmail.com</h1>
        </div>

        <div className="social-icons-contact">
          <a href="https://github.com/DanielEloy" target="_blank" rel="noopener noreferrer">
              <img src={iconGitHub} alt="GitHub"/>
            </a>

          <a href="https://www.linkedin.com/in/daniel-eloy-6820661a5/" target="_blank" rel="noopener noreferrer" className="linkedin-icon">
              <img src={iconLinkedin} alt="LinkedIn" />
            </a>

            <a href="https://www.figma.com/design/O2j7uVVhXUnV6dadZc2MMw/Desafio-03--Desenvolva-um-portf%C3%B3lio-com-React-hooks?node-id=1-190&t=ozxxise5mOReHWDm-0" target="_blank" rel="noopener noreferrer">
              <img src={iconFigma} alt="Figma" />
            </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;