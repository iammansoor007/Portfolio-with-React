import { motion } from 'framer-motion';
import SnakeGame from './SnakeGame';

export default function About({ isDarkMode }) {
  return (
    <div id="about" className={`min-h-[60vh] border-gray-200 border-b-2 snap-start px-4 md:px-20 py-10 flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-[#0f0f14] border-gray-800 text-white' : 'bg-[#F7F7F7] text-black'}`}>
      <div className="relative w-full">
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mb-6"
        >
          <h1 className={`text-[40px] mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>About Me</h1>
        </motion.div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-16 max-w-8xl mx-auto">
          
          {/* Left Column - Who Am I */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="p-8"
            >
              <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>Who Am I</h2>
              
              <div className="space-y-5 xl:space-y-7">
                <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  I'm{' '}
                  <span className="relative inline-block">
                    <span className={`relative z-10 font-semibold transition-colors duration-300 name-text ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>Abdullah Maratib</span>
                    <motion.span
                      className="absolute inset-0 opacity-70"
                      style={{ 
                        backgroundColor: isDarkMode ? '#3B82F6' : '#FFFF00',
                        transformOrigin: "left", 
                        lineHeight: "1", 
                        top: "2px", 
                        bottom: "2px" 
                      }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                    />
                  </span>
                  , a passionate Frontend Developer from Pakistan who loves crafting clean, responsive, and interactive UIs — blending logic with creativity to build seamless digital experiences.
                </p>

                <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  I specialize in{' '}
                  <span className="relative inline-block">
                    <span className={`relative z-10 font-semibold transition-colors duration-300 phrase-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>React.js and JavaScript</span>
                    <motion.span
                      className="absolute inset-0 opacity-70"
                      style={{ 
                        backgroundColor: isDarkMode ? '#3B82F6' : '#FFFF00',
                        transformOrigin: "left", 
                        lineHeight: "1", 
                        top: "2px", 
                        bottom: "2px" 
                      }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }}
                    />
                  </span>
                  , and have built 20+ high-performance websites with pixel-perfect design and smooth animations using Framer Motion.
                </p>

                <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  I enjoy{' '}
                  <span className="relative inline-block">
                    <span className={`relative z-10 font-semibold transition-colors duration-300 phrase-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>solving problems</span>
                    <motion.span
                      className="absolute inset-0 opacity-70"
                      style={{ 
                        backgroundColor: isDarkMode ? '#3B82F6' : '#FFFF00',
                        transformOrigin: "left", 
                        lineHeight: "1", 
                        top: "2px", 
                        bottom: "2px" 
                      }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 2.4, ease: "easeOut" }}
                    />
                  </span>
                  , exploring new tools, and turning ideas into fast, scalable, and intuitive web experiences that not only work great — but feel great to use.
                </p>
              </div>

              {/* Quote */}
              <div className={`border-1-2 ${isDarkMode ? 'border-white' : 'border-black'} pl-6 py-4 rounded-r-lg mt-6`}>
                <p className={`text-lg italic font-medium relative inline-block`}>
                  <span className={`relative z-10 transition-colors duration-300 quote-text ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>"Every challenge is an opportunity to grow."</span>
                  <motion.span
                    className="absolute inset-0 opacity-70"
                    style={{ 
                      backgroundColor: isDarkMode ? '#3B82F6' : '#FFFF00',
                      transformOrigin: "left", 
                      lineHeight: "1", 
                      top: "2px", 
                      bottom: "2px" 
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 4.0, ease: "easeOut" }}
                  />
                </p>
              </div>
            </motion.div>
          </motion.div>

<div className='hidden lg:flex justify-center items-center'>
     {/* Right Column - Empty for now */}
          <SnakeGame isDarkMode={isDarkMode} />
</div>
     
        </div>
      </div>
    </div>
  );
} 