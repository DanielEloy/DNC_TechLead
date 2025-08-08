import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Projects from "./components/Projects/Projects";
import AboutMe from "./components/AboutMe/AboutMe";
import Contact from "./components/Contact/Contact";
import Tecnologias from "./components/Tecnologias/Tecnologias";

// 1. Criando o tipo do contexto
type AppContextType = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

// 2. Criando o contexto
const AppContext = createContext<AppContextType | undefined>(undefined);

// 3. Criando um hook para usar o contexto
const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext deve ser usado dentro do AppProvider");
  }
  return context;
};

// 4. Criando o Provider
const AppProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppContext.Provider value={{ loading, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};

// 5. Componente principal
function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

// 6. Conteúdo da aplicação
const AppContent = () => {
  const { loading } = useAppContext();

  return (
    <div className="App">
      {loading && <LoadingSpinner />}
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Projects />
                <AboutMe />
                <Contact />
              </>
            }
          />
          <Route path="/tecnologias" element={<Tecnologias />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
