import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMail, FiMapPin, FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';
import { FaLinkedinIn, FaGithub, FaTwitter } from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';

export default function Contact({ isDarkMode }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitSuccess(false), 3000);
    }
  };

  const socialLinks = [
    { icon: <FaLinkedinIn size={20} />, url: 'https://www.linkedin.com/in/themansoorshah/', color: 'text-[#0077B5]' },
    { icon: <FaGithub size={20} />, url: 'https://github.com/iammansoor007', color: 'text-gray-800 dark:text-gray-200' },
    { icon: <FaTwitter size={20} />, url: 'https://twitter.com/iammansoor007', color: 'text-[#1DA1F2]' },
    { icon: <SiUpwork size={20} />, url: 'https://www.upwork.com/freelancers/iammansoor007', color: 'text-[#6FDA44]' }
  ];

  return (
    <div id="contact" className={`min-h-screen snap-start px-6 md:px-20 lg:px-36 py-20 flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] text-white' : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex flex-col items-center mb-16"
      >
        <h1 className='text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600'>
          Get In Touch
        </h1>
        <div className={`h-1 w-24 rounded-full ${isDarkMode ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gradient-to-r from-blue-400 to-purple-500'}`}></div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto w-full">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Let's Build Something Amazing
            </h2>
            <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Whether you have a project in mind, want to collaborate, or just want to say hello, I'd love to hear from you. Fill out the form or reach out directly through one of my social profiles.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <motion.div
              className={`p-8 rounded-2xl backdrop-blur-sm ${isDarkMode ? 'bg-gray-800/30 border border-gray-700' : 'bg-white/50 border border-gray-200 shadow-lg'}`}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'} flex items-center gap-2`}>
                <div className={`p-2 rounded-full ${isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'} text-blue-500`}>
                  <FiMapPin size={20} />
                </div>
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} text-blue-500`}>
                    <FiMapPin size={18} />
                  </div>
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Karachi, Pakistan
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} text-blue-500`}>
                    <FiMail size={18} />
                  </div>
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Ammansoor007@gmail.com
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <h4 className={`text-lg font-medium mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Connect with me
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} ${link.color} transition-colors duration-300`}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className={`p-8 rounded-2xl backdrop-blur-sm ${isDarkMode ? 'bg-gray-800/30 border border-gray-700' : 'bg-white/50 border border-gray-200 shadow-lg'}`}
        >
          <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Send a Message
          </h2>

          {submitSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-xl ${isDarkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-100 border border-green-200'} text-center`}
            >
              <div className="text-green-500 text-5xl mb-4">✓</div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Message Sent Successfully!
              </h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Thank you for reaching out. I'll get back to you soon.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label htmlFor="name" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your Name
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <FiUser size={18} />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-colors duration-300 focus:outline-none focus:ring-2 ${isDarkMode
                      ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-400'
                      }`}
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email Address
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <FiMail size={18} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-colors duration-300 focus:outline-none focus:ring-2 ${isDarkMode
                      ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-400'
                      }`}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your Message
                </label>
                <div className="relative">
                  <div className={`absolute top-3 left-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <FiMessageSquare size={18} />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-colors duration-300 focus:outline-none focus:ring-2 resize-none ${isDarkMode
                      ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-400'
                      }`}
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${isSubmitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : isDarkMode
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                  }`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend size={18} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      <div className="fixed bottom-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-200/30'}`}
            initial={{
              opacity: 0,
              y: Math.random() * 100 + 50,
              x: Math.random() * 100 - 50,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              opacity: [0, 0.3, 0],
              y: [Math.random() * 100 + 50, Math.random() * -100 - 50],
              x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(40px)'
            }}
          />
        ))}
      </div>
    </div>
  );
}