import { motion } from 'framer-motion';
import SnakeGame from './SnakeGame';

export default function About({ isDarkMode }) {
  return (
    <div
      id="about"
      className={`min-h-[60vh] border-gray-200 border-b-2 snap-start px-4 md:px-20 py-10 flex flex-col transition-colors duration-300 relative overflow-hidden ${isDarkMode
        ? 'bg-[#0f0f14] border-gray-800 text-white'
        : 'bg-[#F7F7F7] text-black'
        }`}
    >
      {/* Zebra Background */}
      <div className="absolute inset-0 z-0 zebra-bg pointer-events-none"></div>

      <div className="relative w-full z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mb-6"
        >
          <h1
            className={`text-[40px] mb-2 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}
          >
            About Me
          </h1>
        </motion.div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-16 max-w-8xl mx-auto">
          {/* Left Column */}
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
              <h2
                className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-600'
                  }`}
              >
                Who Am I
              </h2>

              <div className="space-y-5 xl:space-y-7">
                <p
                  className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                >
                  I'm{' '}
                  <span className="relative inline-block">
                    <span
                      className={`relative z-10 font-semibold transition-colors duration-300 name-text ${isDarkMode ? 'text-gray-200' : 'text-gray-600'
                        }`}
                    >
                      Mansoor Shah
                    </span>
                    <motion.span
                      className="absolute inset-0 opacity-70"
                      style={{
                        backgroundColor: isDarkMode ? '#3B82F6' : '#FFFF00',
                        transformOrigin: 'left',
                        lineHeight: '1',
                        top: '2px',
                        bottom: '2px',
                      }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
                    />
                  </span>
                  , a creative and passionate Frontend Developer from Pakistan with a flair for crafting aesthetic and smooth user interfaces.
                </p>

                <p
                  className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                >
                  I specialize in{' '}
                  <span className="relative inline-block">
                    <span
                      className={`relative z-10 font-semibold transition-colors duration-300 phrase-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-600'
                        }`}
                    >
                      React.js, JavaScript, Tailwind CSS
                    </span>
                    <motion.span
                      className="absolute inset-0 opacity-70"
                      style={{
                        backgroundColor: isDarkMode ? '#3B82F6' : '#FFFF00',
                        transformOrigin: 'left',
                        lineHeight: '1',
                        top: '2px',
                        bottom: '2px',
                      }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 1.6, ease: 'easeOut' }}
                    />
                  </span>
                  , and have hands-on experience building modern web apps with sleek animations using Framer Motion and other libraries.
                </p>

                <p
                  className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                >
                  I also work with{' '}
                  <span className="relative inline-block">
                    <span
                      className={`relative z-10 font-semibold transition-colors duration-300 phrase-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-600'
                        }`}
                    >
                      Shopify and WordPress
                    </span>
                    <motion.span
                      className="absolute inset-0 opacity-70"
                      style={{
                        backgroundColor: isDarkMode ? '#3B82F6' : '#FFFF00',
                        transformOrigin: 'left',
                        lineHeight: '1',
                        top: '2px',
                        bottom: '2px',
                      }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 2.4, ease: 'easeOut' }}
                    />
                  </span>
                  , helping businesses go live with responsive, fast, and SEO-optimized eCommerce websites and content-driven platforms.
                </p>
              </div>

              {/* Quote */}
              <div
                className={`border-1-2 ${isDarkMode ? 'border-white' : 'border-black'
                  } pl-6 py-4 rounded-r-lg mt-6`}
              >
                <p className={`text-lg italic font-medium relative inline-block`}>
                  <span
                    className={`relative z-10 transition-colors duration-300 quote-text ${isDarkMode ? 'text-gray-200' : 'text-gray-600'
                      }`}
                  >
                    "I don’t just build websites — I build digital vibes."
                  </span>
                  <motion.span
                    className="absolute inset-0 opacity-70"
                    style={{
                      backgroundColor: isDarkMode ? '#3B82F6' : '#FFFF00',
                      transformOrigin: 'left',
                      lineHeight: '1',
                      top: '2px',
                      bottom: '2px',
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 4.0,
                      ease: 'easeOut',
                    }}
                  />
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <div className="hidden lg:flex justify-center items-center">
            <SnakeGame isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
    </div>
  );
}
