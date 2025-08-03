import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import {
  Code,
  PenTool,
  Bot,
  ShoppingCart,
  BrainCircuit,
  Layout,
  MessageSquare,
  Cloud,
  Server,
  Globe,
  ShoppingBag,
  Type,
  Palette,
  Zap,
} from "lucide-react";

const services = {
  Web: [
    {
      icon: <Code className="w-5 h-5" />,
      title: "WEB DEVELOPMENT",
      description: "Custom websites and full-stack web apps using React & Node. Fast, scalable, and mobile-first builds.",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "LANDING PAGES",
      description: "SEO-optimized, high-converting pages. Built for speed, leads, and smooth animations.",
      color: "from-green-400 to-green-600",
    },
    {
      icon: <ShoppingBag className="w-5 h-5" />,
      title: "SHOPIFY STORES",
      description: "Custom Shopify themes with fast checkout. Clean UX and app integrations that convert.",
      color: "from-emerald-400 to-emerald-600",
    },
    {
      icon: <Type className="w-5 h-5" />,
      title: "WORDPRESS SITES",
      description: "Custom themes and plugins with ACF and Elementor. Fully editable and blazing fast.",
      color: "from-sky-400 to-sky-600",
    },
    {
      icon: <Bot className="w-5 h-5" />,
      title: "CUSTOM CHAT BOT",
      description: "AI-powered bots using GPT & Dialogflow. Handles leads, FAQs, and boosts conversions 24/7.",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: <ShoppingCart className="w-5 h-5" />,
      title: "E-COMMERCE",
      description: "Scalable full-stack e-com with secure payments, inventory management & user auth.",
      color: "from-orange-400 to-orange-600",
    },
  ],
  Design: [
    {
      icon: <PenTool className="w-5 h-5" />,
      title: "UI/UX DESIGN",
      description: "Modern, clean UI built in Figma. Every screen designed to engage and convert.",
      color: "from-pink-400 to-pink-600",
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: "DESIGN SYSTEMS",
      description: "Reusable components and token systems that scale with your brand. Built for devs too.",
      color: "from-fuchsia-400 to-fuchsia-600",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "ANIMATED INTERFACES",
      description: "Using Framer Motion + Tailwind for buttery-smooth transitions that feel alive.",
      color: "from-yellow-400 to-yellow-600",
    },
  ],
};


export default function ServicesSection({ isDarkMode }) {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <section className={`relative py-16 px-4 sm:px-6 lg:px-8 min-h-screen overflow-hidden ${isDarkMode ? "bg-[#0f0f14]" : "bg-[#F7F7F7]"}`}>
      <Particles
        className="absolute inset-0 -z-10"
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: {
            color: isDarkMode ? "#0f0f14" : "#F7F7F7",
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
            },
          },
          particles: {
            color: { value: "#ffffff" },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            collisions: { enable: false },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              random: true,
              speed: 0.5,
              straight: false,
            },
            number: {
              density: { enable: true, area: 800 },
              value: 60,
            },
            opacity: {
              value: 0.2,
            },
            shape: {
              type: ["circle", "square", "polygon"],
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1 className={`shiny-text text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            SERVICES I OFFERED
          </h1>
        </motion.div>

        <TabSwitcher isDarkMode={isDarkMode} />
      </div>
    </section>
  );
}

function TabSwitcher({ isDarkMode }) {
  const [activeTab, setActiveTab] = useState("Web");
  const tabRefs = useRef([]);
  const [indicator, setIndicator] = useState({ width: 0, left: 0 });

  useEffect(() => {
    const index = Object.keys(services).indexOf(activeTab);
    const tab = tabRefs.current[index];
    if (tab) {
      setIndicator({ width: tab.offsetWidth, left: tab.offsetLeft });
    }
  }, [activeTab]);

  return (
    <div className="w-full">
      <div className="relative flex justify-center mb-8 sm:mb-12 overflow-x-auto scrollbar-hide">
        <div className={`flex ${isDarkMode ? "bg-gray-800" : "bg-gray-100"} rounded-full p-1 relative w-max`}>
          <div
            className="absolute top-1 h-[calc(100%-8px)] rounded-full bg-gradient-to-r from-purple-500 to-blue-600 z-0 transition-all duration-300"
            style={{ width: `${indicator.width}px`, left: `${indicator.left}px` }}
          />
          {Object.keys(services).map((tab, index) => (
            <button
              key={tab}
              ref={(el) => (tabRefs.current[index] = el)}
              onClick={() => setActiveTab(tab)}
              className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${activeTab === tab
                ? "text-white"
                : isDarkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 min-h-[160px]">
        {services[activeTab].map((service, index) => (
          <div
            key={`${activeTab}-${index}`}
            className={`rounded-xl p-6 ${isDarkMode ? "bg-gray-900/80" : "bg-white"
              } shadow-sm border ${isDarkMode ? "border-gray-700" : "border-gray-200"
              } transition-all duration-300 hover:scale-[1.02] hover:shadow-lg backdrop-blur-md`}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${service.color} transition-transform duration-300 hover:scale-110`}>
                {service.icon}
              </div>
              <div>
                <h3 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {service.title}
                </h3>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
