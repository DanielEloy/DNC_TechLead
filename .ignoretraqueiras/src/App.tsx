import { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

//PAGES & COMPONETS
import Home from './pages/Home.jsx'
import AboutMe from './pages/AboutMe.jsx'
import Projects from './pages/Projects.jsx'
import Contact from './pages/Contact.jsx'
import LoadingSpinner from '../../.ignoretraqueiras/LoadingSpinner/LoadingSpinner.js'


//UTILS
import ScrollTotop from './utils/ScrollTop.jsx'
import { AppContext } from './contexts/AppContext.jsx'


function App() {
  const appContext = useContext(AppContext)

  if (appContext.loading) {
    return <LoadingSpinner />
  }

  return (
    <Router basename={import.meta.env.VITE_BASE_URL || '/'}>
      <ScrollTotop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutMe" element={<AboutMe />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes >
    </Router >
  )
}

export default App;