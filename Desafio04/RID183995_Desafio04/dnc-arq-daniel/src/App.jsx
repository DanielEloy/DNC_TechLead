import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

//PAGES
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Projects from './pages/Projects.jsx'
import Contact from './pages/Contact.jsx'

//UTILS
import ScrollTotop from './utils/ScrollTop.jsx'

function App() {
  return (
    <Router>
      <ScrollTotop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes >
    </Router >
  )
}

export default App
