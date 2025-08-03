import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect, useRef } from 'react';
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiGraphql } from "react-icons/si";

export default function Home({ isDarkMode, toggleTheme, scrollToSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const canvasRef = useRef(null);
  const sidebarRef = useRef(null);
  const particles = useRef([]);
  const floatingIcons = useRef([]);

  const techIcons = [
    { icon: <FaReact className="w-full h-full text-[#61DAFB]" />, name: 'React' },
    { icon: <SiTypescript className="w-full h-full text-[#3178C6]" />, name: 'TypeScript' },
    { icon: <SiNextdotjs className="w-full h-full" />, name: 'Next.js' },
    { icon: <SiTailwindcss className="w-full h-full text-[#06B6D4]" />, name: 'Tailwind' },
    { icon: <FaNodeJs className="w-full h-full text-[#339933]" />, name: 'Node.js' },
    { icon: <SiGraphql className="w-full h-full text-[#E10098]" />, name: 'GraphQL' }
  ];

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Combined particle and floating icons effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles
    particles.current = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: Math.random() * 2 - 1,
      speedY: Math.random() * 2 - 1,
      color: isDarkMode
        ? `hsla(${Math.random() * 60 + 200}, 80%, 70%, ${Math.random() * 0.4})`
        : `hsla(${Math.random() * 60 + 200}, 80%, 50%, ${Math.random() * 0.2})`
    }));

    // Create floating tech icons
    floatingIcons.current = techIcons.map((tech, i) => ({
      ...tech,
      x: Math.random() * (canvas.width - 100) + 50, // Prevent icons from spawning too close to edges
      y: Math.random() * (canvas.height - 100) + 50,
      size: Math.random() * 20 + 40,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 2 - 1,
      opacity: Math.random() * 0.5 + 0.3
    }));

    let animationFrameId;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.current.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Boundary check
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        // Draw particle
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and draw floating icons
      floatingIcons.current.forEach(icon => {
        icon.x += icon.speedX;
        icon.y += icon.speedY;
        icon.rotation += icon.rotationSpeed;

        // Boundary check
        if (icon.x < -50) icon.x = canvas.width;
        if (icon.x > canvas.width + 50) icon.x = 0;
        if (icon.y < -50) icon.y = canvas.height;
        if (icon.y > canvas.height + 50) icon.y = 0;
      });

      // Draw connections
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const p1 = particles.current[i];
          const p2 = particles.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.strokeStyle = isDarkMode
              ? `hsla(200, 80%, 70%, ${0.3 - distance / 400})`
              : `hsla(200, 80%, 50%, ${0.2 - distance / 500})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <div
      id="home"
      className={`min-h-screen flex flex-col snap-start px-4 sm:px-6 md:px-30 py-2 relative overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-[#0f0f14]' : 'bg-[#F7F7F7]'
        }`}
    >
      {/* Combined Particle and Floating Icons Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 w-full h-full pointer-events-none"
      />

      {/* Floating Tech Icons with bubble style */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none overflow-hidden">
        {floatingIcons.current.map((icon, index) => (
          <motion.div
            key={index}
            className="absolute flex items-center justify-center"
            initial={{
              x: icon.x,
              y: icon.y,
              rotate: icon.rotation,
              opacity: icon.opacity
            }}
            animate={{
              x: [icon.x, icon.x + (Math.random() * 100 - 50), icon.x],
              y: [icon.y, icon.y + (Math.random() * 100 - 50), icon.y],
              rotate: icon.rotation + 360,
              transition: {
                duration: Math.random() * 30 + 30,
                repeat: Infinity,
                ease: "linear"
              }
            }}
            style={{
              width: `${icon.size}px`,
              height: `${icon.size}px`,
              filter: isDarkMode
                ? 'drop-shadow(0 0 8px rgba(96, 165, 250, 0.3))'
                : 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.2))'
            }}
          >
            <div className={`relative w-3/4 h-3/4 flex items-center justify-center rounded-full 
              ${isDarkMode ? 'bg-[#1e1e24]' : 'bg-white'} 
              shadow-lg ${isDarkMode ? 'shadow-blue-500/20' : 'shadow-blue-500/10'}`}>
              {/* Bubble shine effect */}
              <div className={`absolute top-1/4 left-1/4 w-1/3 h-1/3 rounded-full 
                ${isDarkMode ? 'bg-blue-500/30' : 'bg-white/80'} 
                blur-[6px]`} />

              {/* Icon container */}
              <div className="relative z-10 w-1/2 h-1/2">
                {icon.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Blur overlay when sidebar is open */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className={`flex justify-between items-center py-4 z-50 sticky top-0 ${isMenuOpen ? 'backdrop-blur-sm' : 'backdrop-blur-md'} ${isDarkMode ? 'bg-[#0f0f14]/90' : 'bg-[#F7F7F7]/90'
        }`}>
        <div className={`w-24 md:w-48 cursor-pointer font-bold text-xl flex items-center ${isMenuOpen ? 'filter blur-sm' : ''}`}>
          <span className="shiny-text">MANSOOR</span>
        </div>

        <div className="max-lg:hidden md:flex md:gap-6 md:mr-10 lg:gap-9 items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-2 py-1 overflow-hidden ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'
                } lg:text-lg md:text-md cursor-pointer font-medium transition-colors duration-300 ${isMenuOpen ? 'filter blur-sm' : ''}`}
            >
              {item.label}
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"
                initial={{ scaleX: 0, originX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          ))}
        </div>

        <div className={`flex items-center gap-4 w-26 md:w-48 justify-end ${isMenuOpen ? 'filter blur-sm' : ''}`}>
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="relative cursor-pointer w-16 sm:w-20 h-9 sm:h-10 flex items-center rounded-full transition-colors duration-300 focus:outline-none overflow-hidden"
            style={{
              background: isDarkMode ? '#18181b' : '#f3f3f3',
              border: isDarkMode ? '2px solid #e5e5e5' : '2px solid #bbb',
              boxShadow: '0 2px 8px #0001',
              padding: 0,
            }}
          >
            <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-10">
              <FiSun
                className={`transition-opacity duration-300 ${isDarkMode ? 'opacity-0' : 'opacity-100 text-gray-700'
                  }`}
                size={16}
              />
            </span>

            <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10">
              <FiMoon
                className={`transition-opacity duration-300 ${isDarkMode ? 'opacity-100 text-gray-300' : 'opacity-0'
                  }`}
                size={16}
              />
            </span>

            <span
              className="absolute top-1/2 -translate-y-1/2 z-20"
              style={{
                left: isDarkMode ? '2px' : 'calc(100% - 2px - 28px)',
                transition: 'left 0.3s ease-in-out',
              }}
            >
              <span
                className="block"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: '#fff',
                  border: '2px solid #e0e0e0',
                }}
              ></span>
            </span>
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-800'
              }`}
          >
            {isMenuOpen ? <FiX className='text-[26px]' /> : <FiMenu className='text-[26px]' />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu with slide-in animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={sidebarRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
            className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs ${isDarkMode ? 'bg-[#18181b]' : 'bg-white'} shadow-xl`}
          >
            <div className="flex justify-end p-6">
              <button
                onClick={() => setIsMenuOpen(false)}
                className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
              >
                <FiX className="text-2xl" />
              </button>
            </div>

            <nav className="px-6 py-4">
              <ul className="space-y-4">
                {navItems.map((item) => (
                  <motion.li
                    key={item.id}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * navItems.indexOf(item) }}
                  >
                    <button
                      onClick={() => {
                        scrollToSection(item.id);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-lg font-medium transition-colors ${isDarkMode
                        ? 'hover:bg-gray-800 text-gray-200'
                        : 'hover:bg-gray-100 text-gray-700'}`}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <button
                onClick={toggleTheme}
                className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg ${isDarkMode
                  ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {isDarkMode ? (
                  <>
                    <FiSun className="text-xl" />
                    <span>Switch to Light Mode</span>
                  </>
                ) : (
                  <>
                    <FiMoon className="text-xl" />
                    <span>Switch to Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - Apply blur when sidebar is open */}
      <div className={`flex-grow flex flex-col mb-8 justify-center w-full py-6 mt-6 sm:py-13 relative z-10 px-4 sm:px-8 ${isMenuOpen ? 'filter blur-sm' : ''}`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`relative inline-flex items-center justify-center px-5 py-2 mb-8 rounded-full text-xs font-semibold tracking-widest uppercase ${isDarkMode
              ? 'text-blue-100/90 bg-gray-900/20'
              : 'text-blue-800/90 bg-white/80'
              } backdrop-blur-lg border ${isDarkMode
                ? 'border-blue-400/20 shadow-[0_0_20px_-5px_rgba(96,165,250,0.3)]'
                : 'border-blue-200/60 shadow-[0_0_20px_-8px_rgba(59,130,246,0.4)]'
              } overflow-hidden group`}
          >
            <div className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-blue-900/10' : 'bg-blue-100/20'
              } backdrop-blur-md`} />

            <motion.div
              className="absolute inset-0 rounded-full p-[1px] pointer-events-none"
              animate={{
                background: isDarkMode
                  ? 'linear-gradient(135deg, rgba(96,165,250,0.3) 0%, rgba(129,140,248,0.2) 50%, rgba(96,165,250,0.3) 100%)'
                  : 'linear-gradient(135deg, rgba(59,130,246,0.4) 0%, rgba(99,102,241,0.3) 50%, rgba(59,130,246,0.4) 100%)',
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <div className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-gray-900/70' : 'bg-white/70'
                } backdrop-blur-[1px]`} />
            </motion.div>

            <div className="relative z-10 flex items-center gap-2">
              <motion.span
                className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
                  }`}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className="relative overflow-hidden">
                <span className="block">FRONTEND DEVELOPER</span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: -100 }}
                  whileHover={{
                    x: 150,
                    transition: {
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1]
                    }
                  }}
                />
              </span>
            </div>

            {[...Array(3)].map((_, i) => (
              <motion.span
                key={i}
                className={`absolute rounded-full ${isDarkMode ? 'bg-blue-400/30' : 'bg-blue-500/30'
                  }`}
                initial={{
                  scale: 0,
                  opacity: 0,
                  x: Math.random() * 40 - 20,
                  y: Math.random() * 40 - 20
                }}
                animate={{
                  scale: [0, Math.random() * 0.8 + 0.4, 0],
                  opacity: [0, 0.4, 0],
                  x: [
                    Math.random() * 40 - 20,
                    Math.random() * 60 - 30,
                    Math.random() * 40 - 20
                  ],
                  y: [
                    Math.random() * 40 - 20,
                    Math.random() * 60 - 30,
                    Math.random() * 40 - 20
                  ]
                }}
                transition={{
                  duration: Math.random() * 6 + 4,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
                style={{
                  width: `${Math.random() * 6 + 4}px`,
                  height: `${Math.random() * 6 + 4}px`
                }}
              />
            ))}
          </motion.div>

          <h1
            className={`text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}
          >
            Crafting <span className="shiny-text">Digital Experiences</span><br />
            That Drive Results
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className={`text-lg sm:text-xl max-w-2xl mx-auto mb-10 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
          >
            I build performant, accessible web applications with modern React ecosystems,
            delivering pixel-perfect UIs and seamless user experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white text-md sm:text-lg px-8 py-3.5 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
              onClick={() => scrollToSection('projects')}
            >
              View My Projects
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`border-2 text-md sm:text-lg px-8 py-3.5 rounded-xl font-medium transition-all duration-300 ${isDarkMode
                ? 'border-gray-600 text-gray-200 hover:bg-gray-800 hover:border-gray-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                }`}
              onClick={() => scrollToSection('contact')}
            >
              Contact Me
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};