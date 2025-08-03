import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Palette, Zap, Users, MessageSquare, Lightbulb, Clock, Heart, GitBranch, ShoppingCart, Cpu, Database, GitCommit, Terminal, Server, Layers, Type, Globe, Mail, Shield, Cloud, Wifi, Battery, Settings, Monitor, Camera, Headphones, Figma } from "lucide-react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function SkillsSection({ isDarkMode }) {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <section id="skills" className={`lg:h-[100vh] min-h-screen relative py-16 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-[#0f0f14]' : 'bg-[#F7F7F7]'} w-full overflow-hidden transition-colors duration-300`}>
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fpsLimit: 60,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 100,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: isDarkMode ? "#a78bfa" : "#7c3aed",
              },
              links: {
                color: isDarkMode ? "#a78bfa" : "#7c3aed",
                distance: 150,
                enable: true,
                opacity: 0.3,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 60,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },
            detectRetina: true,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12 md:mb-16 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1
            className={`shiny-text text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}
          >
            MY SKILLS
          </h1>
        </motion.h2>

        <TabSwitcher isDarkMode={isDarkMode} />
      </div>
    </section>
  );
}

function TabSwitcher({ isDarkMode }) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Technical", "Soft", "Tools"];
  const tabRefs = useRef([]);
  const [indicator, setIndicator] = useState({ width: 0, left: 0 });

  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      const { offsetWidth, offsetLeft } = tabRefs.current[activeTab];
      setIndicator({ width: offsetWidth, left: offsetLeft });
    }
  }, [activeTab]);

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="relative flex justify-center mb-8 sm:mb-12">
        <div className={`flex ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-full p-1 relative`}>
          <motion.div
            className={`absolute top-1 h-[calc(100%-8px)] rounded-full bg-gradient-to-r from-purple-500 to-blue-600 z-0`}
            initial={false}
            animate={{
              left: indicator.left,
              width: indicator.width,
            }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          />

          {tabs.map((tab, index) => (
            <button
              key={tab}
              ref={(el) => (tabRefs.current[index] = el)}
              onClick={() => setActiveTab(index)}
              className={`relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${activeTab === index
                ? 'text-white'
                : isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              {tab} Skills
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 0 && <TechnicalSkills isDarkMode={isDarkMode} />}
            {activeTab === 1 && <SoftSkills isDarkMode={isDarkMode} />}
            {activeTab === 2 && <ToolsSkills isDarkMode={isDarkMode} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function TechnicalSkills({ isDarkMode }) {
  const categories = [
    {
      icon: Code,
      title: "Frontend",
      description: "Building responsive and interactive user interfaces",
      skills: [
        { name: "React", level: 90, color: "from-blue-400 to-blue-600", icon: Layers },
        { name: "Next.js", level: 85, color: "from-gray-400 to-gray-600", icon: Globe },
        { name: "JavaScript", level: 95, color: "from-yellow-400 to-yellow-600", icon: Terminal },
        { name: "CSS/Tailwind", level: 95, color: "from-teal-400 to-blue-600", icon: Palette }
      ]
    },
    {
      icon: ShoppingCart,
      title: "E-Commerce",
      description: "Building online stores and shopping experiences",
      skills: [
        { name: "Shopify", level: 85, color: "from-green-400 to-green-600", icon: ShoppingCart },
        { name: "WordPress", level: 80, color: "from-blue-400 to-blue-700", icon: Type },
        { name: "WooCommerce", level: 75, color: "from-purple-400 to-purple-600", icon: Database }
      ]
    },
    {
      icon: Palette,
      title: "Design",
      description: "Creating beautiful and functional designs",
      skills: [
        { name: "Figma", level: 85, color: "from-purple-400 to-pink-600", icon: Figma },
        { name: "UI/UX", level: 80, color: "from-pink-400 to-red-600", icon: Figma },
        { name: "Animation", level: 75, color: "from-indigo-400 to-purple-600", icon: Zap }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {categories.map((category, index) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
          className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-900/80' : 'bg-white'} shadow-sm backdrop-blur-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
        >
          <div className="flex items-start gap-4 mb-4">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-purple-900/50' : 'bg-purple-100'}`}>
              <category.icon className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {category.title}
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {category.description}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {category.skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    {skill.icon && <skill.icon className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />}
                    <span className={isDarkMode ? 'text-gray-200' : 'text-gray-800'}>{skill.name}</span>
                  </div>
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{skill.level}%</span>
                </div>
                <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden`}>
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color} relative`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    <motion.div
                      className="absolute top-0 right-0 h-full w-1 bg-white opacity-70"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 0.7, 0],
                        x: [-10, 0, 10]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function SoftSkills({ isDarkMode }) {
  const skills = [
    {
      name: "Communication",
      level: 90,
      icon: MessageSquare,
      description: "Clear and effective in team settings",
      color: "from-blue-400 to-blue-600"
    },
    {
      name: "Problem Solving",
      level: 85,
      icon: Lightbulb,
      description: "Analytical and creative solutions",
      color: "from-yellow-400 to-yellow-600"
    },
    {
      name: "Teamwork",
      level: 95,
      icon: Users,
      description: "Collaborative and supportive",
      color: "from-green-400 to-green-600"
    },
    {
      name: "Adaptability",
      level: 90,
      icon: Zap,
      description: "Quick to learn new technologies",
      color: "from-purple-400 to-purple-600"
    },
    {
      name: "Time Management",
      level: 80,
      icon: Clock,
      description: "Efficient and deadline-oriented",
      color: "from-orange-400 to-orange-600"
    },
    {
      name: "Empathy",
      level: 85,
      icon: Heart,
      description: "Understanding user needs",
      color: "from-pink-400 to-pink-600"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          viewport={{ once: true }}
          className={`rounded-xl p-5 ${isDarkMode ? 'bg-gray-900/80' : 'bg-white'} shadow-sm backdrop-blur-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${skill.color}`}>
              <skill.icon className="text-white" size={20} />
            </div>
            <div>
              <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {skill.name}
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {skill.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`flex-1 h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${skill.color} relative`}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <motion.div
                  className="absolute top-0 right-0 h-full w-1 bg-white opacity-70"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.7, 0],
                    x: [-10, 0, 10]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </div>
            <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {skill.level}%
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ToolsSkills({ isDarkMode }) {
  const toolCategories = [
    {
      name: "Development",
      items: [
        { name: "VS Code", icon: Code },
        { name: "Git", icon: GitCommit },
        { name: "GitHub", icon: GitBranch },
        { name: "Shopify CLI", icon: Terminal },
        { name: "Postman", icon: Mail }
      ],
      icon: Code,
      color: "from-blue-400 to-blue-600"
    },
    {
      name: "Design",
      items: [
        { name: "Figma", icon: Figma },
        { name: "Photoshop", icon: Camera },
        { name: "Illustrator", icon: Palette },
        { name: "Framer", icon: Figma }
      ],
      icon: Palette,
      color: "from-purple-400 to-purple-600"
    },
    {
      name: "Collaboration",
      items: [
        { name: "Slack", icon: MessageSquare },
        { name: "Trello", icon: Layers },
        { name: "Notion", icon: Type },
        { name: "Jira", icon: Shield }
      ],
      icon: GitBranch,
      color: "from-green-400 to-green-600"
    },
    {
      name: "Productivity",
      items: [
        { name: "Raycast", icon: Zap },
        { name: "Alfred", icon: Terminal },
        { name: "Obsidian", icon: Database },
        { name: "Shopify Theme Kit", icon: ShoppingCart }
      ],
      icon: Zap,
      color: "from-yellow-400 to-yellow-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      {toolCategories.map((category, index) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          viewport={{ once: true }}
          className={`rounded-xl p-5 ${isDarkMode ? 'bg-gray-900/80' : 'bg-white'} shadow-sm backdrop-blur-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color}`}>
              <category.icon className="text-white" size={20} />
            </div>
            <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {category.name}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {category.items.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                viewport={{ once: true }}
                className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg ${isDarkMode
                  ? 'bg-gray-800 text-gray-200'
                  : 'bg-gray-100 text-gray-800'
                  }`}
              >
                {tool.icon && <tool.icon className="w-4 h-4" />}
                {tool.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}