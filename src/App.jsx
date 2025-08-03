import { useState } from 'react';
import Home from './components/Home';
import Skills from './components/Skills';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ServicesSection from './components/Services';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="overflow-x-hidden scroll-smooth">
      <Home isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      {/* Divider */}
      <div className={`w-full h-[3px] ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`} />

      <Skills isDarkMode={isDarkMode} />

      {/* Divider */}
      <div className={`w-full h-[3px] ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`} />

      <ServicesSection isDarkMode={isDarkMode} />

      {/* Divider */}
      <div className={`w-full h-[3px] ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`} />


      <Projects isDarkMode={isDarkMode} />

      {/* Divider */}
      <div className={`w-full h-[3px] ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`} />

      <About isDarkMode={isDarkMode} />

      {/* Divider */}
      <div className={`w-full h-[3px] ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`} />

      <Contact isDarkMode={isDarkMode} />

      {/* Divider */}
      <div className={`w-full h-[3px] ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`} />

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
