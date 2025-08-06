import React, { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import iconLinkedin from '../../assets/IconLinkedin.svg';
import iconGitHub from '../../assets/IconGitHub.svg';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header id="header" className={isScrolled ? 'header-scrolled' : ''}>
      <div className="container">
        <nav className="navbar">
          <HashLink smooth to="/#" className="logo" style={{ color: '#e2e3e5ff' }}>
            Port<span style={{ color: 'var(--accent)' }}>fólio</span>
          </HashLink>
          
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="navLinks">
            <li>
              <HashLink smooth to="/#projects" onClick={closeMenu}>
                Projetos
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="/tecnologias" onClick={closeMenu}>
                Tecnologias
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="/#about" onClick={closeMenu}>
                Sobre mim
              </HashLink>
            </li>
          </ul>
          
          <div className="social-icons">
            <a href="https://github.com/DanielEloy" target="_blank" rel="noopener noreferrer">
              <img src={iconGitHub} alt="GitHub"/>
            </a>

            <a href="https://www.linkedin.com/in/daniel-eloy-6820661a5/" target="_blank" rel="noopener noreferrer">
              <img src={iconLinkedin} alt="LinkedIn" />
            </a>
          </div>

          <button className="mobile-menu-btn" id="menuBtn" onClick={toggleMenu}>
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
