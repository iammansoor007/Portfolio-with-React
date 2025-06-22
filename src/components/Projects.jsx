import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import wizardImg from '../assets/wizard.png';
import removerImg from '../assets/remover.png';
import ochiImg from '../assets/ochi.png';
import netflixImg from '../assets/netflix 2.0.png';
import todesktopImg from '../assets/todesktop.png';
import mirandaImg from '../assets/miranda.png';

const projects = [
  {
    title: 'WizardZ App',
    description: 'Redesigned digital marketing agency portfolio with modern UI/UX. Highlights services, animations, and smooth navigation.',
    technologies: ['HTML', 'GSAP', 'Javascript', 'CSS'],
    githubLink: 'https://github.com/abdullahmaratib/WizardZ-GSAP',
    liveLink: 'https://www.linkedin.com/posts/abdullah-maratib_i-developed-a-fully-animated-website-using-activity-7233944164101443585-1qJV?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFGNNGQBzpFKq1WfKmj4BugCEmmXOhZTKQ8',
    image: wizardImg,
  },
  {
    title: 'AI Background Remover',
    description: 'AI-powered image tool with real-time background removal, secure authentication, and user-friendly interface.',
    technologies: ['React', 'Tailwind CSS', 'Clerk', 'Javascript'],
    githubLink: 'https://github.com/abdullahmaratib/AI-BgRemover',
    liveLink: 'https://www.linkedin.com/posts/abdullah-maratib_launched-an-ai-powered-background-remover-activity-7340348666911641601-xCmY?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFGNNGQBzpFKq1WfKmj4BugCEmmXOhZTKQ8',
    image: removerImg,
  },
  {
    title: 'Ochi Design',
    description: 'A creative design agency website with innovative interactions, smooth animations, and engaging transitions.',
    technologies: ['React', 'Framer Motion', 'Javascript', 'Tailwind CSS'],
    githubLink: 'https://github.com/abdullahmaratib/Ochi-Design',
    liveLink: 'https://www.linkedin.com/posts/abdullah-maratib_ochi-design-a-fusion-of-creativity-and-activity-7283841113600266240-NUlw?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFGNNGQBzpFKq1WfKmj4BugCEmmXOhZTKQ8',
    image: ochiImg,
  },
  {
    title: 'Netflix 2.0',
    description: 'A Netflix-inspired streaming platform with video playback, user authentication, and real-time data display.',
    technologies: ['React', 'Javascript', 'Tailwind CSS', 'TMDB API'],
    githubLink: 'https://github.com/abdullahmaratib/Netflix',
    liveLink: 'https://www.linkedin.com/posts/abdullah-maratib_frontenddeveloper-webdevelopment-webdesign-activity-7269667099839451136-OQA8?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFGNNGQBzpFKq1WfKmj4BugCEmmXOhZTKQ8',
    image: netflixImg,
  },
  {
    title: 'ToDesktop',
    description: 'A desktop application with modern design, intuitive user experience, and seamless navigation.',
    technologies: ['React', 'Tailwind CSS', 'Javascript'],
    githubLink: 'https://github.com/abdullahmaratib/ToDesktop-Tailwind-CSS',
    liveLink: 'https://www.linkedin.com/posts/abdullah-maratib_webdevelopment-tailwindcss-responsivedesign-activity-7278367477166723072-cHNc?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFGNNGQBzpFKq1WfKmj4BugCEmmXOhZTKQ8',
    image: todesktopImg,
  },
  {
    title: 'Miranda',
    description: 'A modern portfolio and showcase application with elegant design, rich animations, and seamless visual blending.',
    technologies: ['React', 'GSAP', 'Javascript','Tailwind CSS'],
    githubLink: 'https://github.com/abdullahmaratib/MIRANDA-GSAP',
    liveLink: 'https://www.linkedin.com/posts/abdullah-maratib_i-developed-the-official-website-for-miranda-activity-7250938045732974592-HKsM?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFGNNGQBzpFKq1WfKmj4BugCEmmXOhZTKQ8',
    image: mirandaImg,
  }
];

function ProjectCard({ project, isDarkMode }) {
  return (
    <motion.div
      className={`p-6 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer ${
        isDarkMode ? 'bg-[#1a1a1d]' : 'bg-white border border-gray-200 hover:shadow-2xl'
      }`}
      whileHover={{ 
        y: -8,
        scale: 1.02
      }}
      transition={{ type: "tween", duration: 0.15 }}
    >
      {/* Project Image */}
      <div className="w-full h-56 rounded-lg mb-4 overflow-hidden">
        <motion.img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-contain rounded-lg"
          whileHover={{ 
            scale: 1.02,
            transition: { type: "spring", stiffness: 300, damping: 20 }
          }}
        />
      </div>

      {/* Project Title */}
      <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        {project.title}
      </h3>

      {/* Project Description */}
      <p className={`text-sm mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {project.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech, techIndex) => (
          <span
            key={techIndex}
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-blue-100 text-blue-800'
            }`}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-3">
        <motion.a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
            isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaGithub size={16} />
          GitHub
        </motion.a>
        <motion.a
          href={project.liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
            isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaExternalLinkAlt size={14} />
          LinkedIn
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function Projects({ isDarkMode }) {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, 4);

  const handleHideProjects = () => {
    setIsHiding(true);
    // Wait for animation to complete before hiding
    setTimeout(() => {
      setShowAllProjects(false);
      setIsHiding(false);
    }, 300);
  };

  return (
    <div id="projects" className={`min-h-screen border-gray-200 border-b-3 snap-start px-4 md:px-14 lg:px-36 py-12 flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-[#0f0f14] border-gray-800 text-white' : 'bg-[#F7F7F7] text-black'}`}>
      <div className="relative w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mb-14"
        >
          <h1 className={`text-[40px] font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>My Projects</h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className={`grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-10 max-w-6xl mx-auto ${!showAllProjects ? 'mb-12' : ''}`}
        >
          {displayedProjects.map((project, index) => {
            const lastIndex = displayedProjects.length - 1;
            const isFirst = index === 0;
            const isSecond = index === 1;
            const isSecondLast = index === lastIndex - 1;
            const isLast = index === lastIndex;
            let initial, whileInView, delay = index * 0.08;
            if (isFirst || isSecondLast) {
              initial = { opacity: 0, x: -60 };
              whileInView = { opacity: 1, x: 0 };
              delay = 0;
            } else if (isSecond || isLast) {
              initial = { opacity: 0, x: 60 };
              whileInView = { opacity: 1, x: 0 };
              delay = 0;
            } else {
              initial = { opacity: 0, y: 40 };
              whileInView = { opacity: 1, y: 0 };
            }
            return (
              <motion.div
                key={index}
                initial={initial}
                whileInView={whileInView}
                transition={{
                  duration: 0.5,
                  delay,
                  ease: 'easeInOut'
                }}
                viewport={{ once: true }}
              >
                <ProjectCard project={project} isDarkMode={isDarkMode} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Show More Projects Button */}
        {!showAllProjects && (
          <>
            <div className="mt-8" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <motion.button
                onClick={() => setShowAllProjects(true)}
                className={`px-8 py-4 mt-8 cursor-pointer rounded-2xl font-medium transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Show More Projects
              </motion.button>
            </motion.div>
          </>
        )}

        {/* Hide Projects Button */}
        {showAllProjects && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <motion.button
              onClick={handleHideProjects}
              disabled={isHiding}
              className={`px-8 py-4 cursor-pointer rounded-2xl font-medium transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-gray-500 text-white hover:bg-gray-600'
              } ${isHiding ? 'opacity-50 cursor-not-allowed' : ''}`}
              whileHover={{ scale: isHiding ? 1 : 1.05 }}
              whileTap={{ scale: isHiding ? 1 : 0.95 }}
            >
              {isHiding ? 'Hiding...' : 'Hide Projects'}
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
} 