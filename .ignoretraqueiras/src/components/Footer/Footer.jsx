import { useContext } from "react"
import { Link } from "react-router-dom"

// ASSETS
import "./Footer.css"
import BrazilIcon from "../../assets/brazil-icon.svg"
import UsaIcon from "../../assets/usa-icon.svg"
import GitHubIcon from "../../assets/iconGitHub.svg"
import LinkedinIcon from "../../assets/iconLinkedin.svg"

// COMPONENT
import Button from "../Button/Button"

// CONTEXT
import { AppContext } from "../../contexts/AppContext"

function Footer() {
    const appContext = useContext(AppContext)
    const changeLanguage = (country) => {
        appContext.setLanguage(country)
    }
    return (
        <footer>
            <div className="container">
                <div className="d-flex jc-space-between mobile-fd-column">
                    <div className="footer-logo-col">
                        <img src={Logo} className="footer-logo" />
                        <p className="grey-1-color">{appContext.languages[appContext.language].general.footerLogoText}</p>
                        <div className="d-flex social-links">
                            
                            <a href="https://github.com/DanielEloy/" target="_blank">
                                <img src={GitHubIcon} />
                            </a>
                            <a href="https://www.linkedin.com/in/daniel-eloy-6820661a5/" target="_blank">
                                <img src={LinkedinIcon} />
                            </a>
                        
                        </div>
                    </div>
                    <div className="d-flex mobile-fd-column">
                        <div className="footer-col">
                            <h3>{appContext.languages[appContext.language].general.pages}</h3>
                            <ul>
                                <li><Link to="/">{appContext.languages[appContext.language].menu.home}</Link></li>
                                <li><Link to="/about">{appContext.languages[appContext.language].menu.about}</Link></li>
                                <li><Link to="/projects">{appContext.languages[appContext.language].menu.projects}</Link></li>
                                <li><Link to="/contact">{appContext.languages[appContext.language].menu.contact}</Link></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h3>{appContext.languages[appContext.language].general.contact}</h3>
                            <p className="gray-1-color">dans_eloy@hotmail.com</p>
                            <p className="gray-1-color">(11) 99187-9192</p>
                        </div>
                    </div>
                </div>
                <div className="d-flex jc-space-between footer-copy">
                    <p className="gray-1-color">Copyright © DNC - 2024</p>
                    <div className="langs-area d-flex">
                        <Button buttonStyle="unstyled" onClick={() => changeLanguage('br')}>
                            <img src={BrazilIcon} height="29px" />
                        </Button>
                        <Button buttonStyle="unstyled" onClick={() => changeLanguage('en')}>
                            <img src={UsaIcon} height="29px" />
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer