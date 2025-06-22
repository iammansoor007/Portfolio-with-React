import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from 'react';

export default function Home({ isDarkMode, toggleTheme, scrollToSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleMenuClick = () => setIsMenuOpen(!isMenuOpen);
  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <div
      id="home"
      className={`min-h-[60vh] flex flex-col snap-start px-4 sm:px-6 md:px-30 py-2 relative transition-colors duration-300 ${
        isDarkMode ? 'bg-[#0f0f14]' : 'bg-[#F7F7F7]'
      } ${isDarkMode ? '' : 'text-black'}`}
      style={isDarkMode ? { color: '#F7F7F7' } : {}}
    >
     
      <nav className={`flex justify-between items-center py-4 border-b transition-colors duration-300 ${isDarkMode ? 'border-gray-800' : 'border-gray-300'}`}>
      
        <div className="w-24 md:w-48 cursor-pointer font-bold text-xl flex items-center">AM</div>

      
        <div className="max-lg:hidden md:flex md:gap-6 md:mr-10 lg:gap-9 items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`${
                isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-500 hover:text-gray-700'
              } lg:text-lg md:text-md cursor-pointer font-medium transition-colors duration-300`}
            >
              {item.label}
            </button>
          ))}
        </div>

      
        <div className="flex items-center gap-4 w-26 md:w-48 justify-end">
        
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="relative cursor-pointer w-20 h-10 flex items-center rounded-full transition-colors duration-300 focus:outline-none overflow-hidden"
            style={{
              background: isDarkMode ? '#18181b' : '#f3f3f3',
              border: isDarkMode ? '2.5px solid #e5e5e5' : '2.5px solid #bbb',
              boxShadow: '0 2px 8px #0001',
              padding: 0,
            }}
          >
            {!isDarkMode && (
              <span className="absolute max-md:hidden left-4 top-1/2 -translate-y-1/2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="4" stroke="#222" strokeWidth="2" />
                  <g stroke="#222" strokeWidth="2">
                    <line x1="12" y1="2" x2="12" y2="5" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                    <line x1="2" y1="12" x2="5" y2="12" />
                    <line x1="19" y1="12" x2="22" y2="12" />
                    <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
                    <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
                    <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
                    <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
                  </g>
                </svg>
              </span>
            )}
            {isDarkMode && (
              <span className="absolute max-md:hidden right-4 top-1/2 -translate-y-1/2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  <circle cx="17" cy="8" r="1" fill="#fff" />
                  <circle cx="19" cy="10" r="0.5" fill="#fff" />
                </svg>
              </span>
            )}
            <span
              className="absolute top-1/2 -translate-y-1/2"
              style={{
                left: isDarkMode ? 2.5 : 'calc(100% - 2.5px - 32px)',
                transition: 'left 0.3s',
                boxSizing: 'border-box',
              }}
            >
              <span
                className="block"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: '#fff',
                  border: '2.5px solid #e0e0e0',
                  boxSizing: 'border-box',
                  transition: 'background 0.3s, border 0.3s',
                }}
              ></span>
            </span>
          </button>

         
          <button 
            onClick={handleMenuClick}
            className={`md:hidden flex items-center justify-center transition-colors duration-300 ${isDarkMode ? ' text-white' : ' text-gray-800'}`}
          >
            <FiMenu className='text-[26px]' />
          </button>
        </div>
      </nav>

     
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.5 }}
            className="md:hidden fixed inset-0 w-full h-full z-50 flex flex-col border border-gray-300 shadow-2xl bg-white dark:bg-[#18181b] text-gray-900 dark:text-gray-100"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0 } }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex justify-end px-8 pt-12"
            >
              <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                <FiX className= " text-3xl text-gray-300 " />
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col items-center justify-center gap-6"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-center px-8 py-4 text-[27px] font-semibold transition-colors duration-300 hover:text-blue-600`}
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

     
      {/* Main Content */}
      <div className="flex-grow flex flex-col mb-8 justify-center w-full py-6 mt-6 sm:py-13">
        <h1
          className={`text-[60px] md:text-[70px] lg:text-[80px] text-center leading-[1.01] font-medium font-[Outfit] ${
            isDarkMode ? 'text-gray-200' : 'text-gray-800'
          }`}
        >
          Frontend Developer <br />
          <span className={`mr-3 sm:mr-4 ${isDarkMode ? 'text-blue-400' : 'bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500'}`}>
            React
          </span> Specialist
        </h1>

        <p className={`text-center font-[Outfit] mt-11 leading-[1.4] text-[19px] ${
          isDarkMode ? 'text-gray-300' : 'text-gray-500'
        }`}>
          I'm a passionate Frontend developer and have crafted 20+ websites with modern <br className="max-lg:hidden" />
 UI & UX. I blend creativity with code to build seamless digital experiences.
        </p>


<div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-10">
  <button 
    className="bg-blue-600 cursor-pointer text-white text-md sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-medium hover:bg-blue-700 transition w-full sm:w-auto"
    onClick={() => scrollToSection('projects')}
  >
    View Projects
  </button>

  <button
    className={`border border-gray-400 ${
      isDarkMode
        ? 'text-gray-200 hover:bg-gray-300 hover:text-gray-900'
        : 'text-gray-700 hover:bg-gray-800 hover:text-gray-200'
    } text-md sm:text-lg cursor-pointer px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-medium transition-all duration-450 w-full sm:w-auto`}
    onClick={() => scrollToSection('contact')}
  >
    Contact Me
  </button>
</div>


      </div>
    </div>
  );
}
