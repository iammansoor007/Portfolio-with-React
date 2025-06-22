import { useState } from 'react';
import Home from './components/Home';
import Skills from './components/Skills';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [skillsAnimated, setSkillsAnimated] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="snap-y snap-mandatory overflow-x-hidden h-screen overflow-y-scroll">
      <Home 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        scrollToSection={scrollToSection} 
      />

      {/* Divider */}
      <div className={`w-full h-[3px] ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>

      <Skills isDarkMode={isDarkMode} animate={!skillsAnimated} onAnimated={() => setSkillsAnimated(true)} />

      {/* Divider */}
      <div className={`w-full h-[3px] ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>

      <Projects isDarkMode={isDarkMode} />

      {/* Divider */}
      <div className={`w-full h-[3px] ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>

      <About isDarkMode={isDarkMode} />

      {/* Divider */}
      <div className={`w-full h-[3px] ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>

      <Contact isDarkMode={isDarkMode} />

      {/* Divider */}
      <div className={`w-full h-[3px] ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}></div>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
