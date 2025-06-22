import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaReact, FaHtml5, FaCss3Alt, FaJsSquare, FaNodeJs, FaGithub } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiFramer, SiTailwindcss } from 'react-icons/si';

const skills = [
  { name: 'React JS', icon: FaReact, color: '#61DBFB' },
  { name: 'HTML', icon: FaHtml5, color: '#E34F26' },
  { name: 'CSS', icon: FaCss3Alt, color: '#1572B6' },
  { name: 'JavaScript', icon: FaJsSquare, color: '#F7DF1E' },
  { name: 'Node JS', icon: FaNodeJs, color: '#68A063' },
  { name: 'GitHub', icon: FaGithub, color: '#24292F' },
  { name: 'MongoDB', icon: SiMongodb, color: '#4DB33D' },
  { name: 'Express JS', icon: SiExpress, color: '#24292F' },
  { name: 'Framer', icon: SiFramer, color: '#EC5990' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
];

function SkillCard({ skill, IconComponent, isDarkMode }) {
  const [isHovered, setIsHovered] = useState(false);

  const getIconColor = () => {
    if (skill.name === 'GitHub' || skill.name === 'Express JS') {
      return isDarkMode ? '#FFFFFF' : skill.color;
    }
    return skill.color;
  };

  return (
    <motion.div
      className={`p-6 rounded-2xl w-32 h-32 flex flex-col items-center justify-center shadow-md transition-all duration-150 cursor-pointer ${
        isDarkMode ? 'bg-[#1a1a1d]' : 'bg-white border border-gray-200 hover:shadow-xl'
      }`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.07 }}
      transition={{ type: "tween", duration: 0.1 }}
    >
      <motion.div
        className="flex items-center justify-center"
        animate={{
          scale: isHovered ? 1.15 : 1,
          rotate: isHovered ? 15 : 0,
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <IconComponent
          size={38}
          color={getIconColor()}
        />
      </motion.div>
      <p className={`mt-4 text-sm font-semibold text-center transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        {skill.name}
      </p>
    </motion.div>
  );
}

export default function Skills({ isDarkMode }) {
  return (
    <div id="skills" className={`min-h-[60vh] border-gray-200 border-b-3 snap-start px-4 md:px-36 py-20 flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-[#0f0f14] border-gray-800 text-white' : 'bg-[#F7F7F7] text-black'}`}>
      <div className="relative w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
          className="flex justify-center mb-16"
        >
          <h1 className={`text-[40px] mb-6 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>My Skills</h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="flex flex-wrap justify-center mb-7 gap-4"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: false }}
            >
              <SkillCard skill={skill} IconComponent={skill.icon} isDarkMode={isDarkMode} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 