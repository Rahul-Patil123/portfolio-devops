import { useState, useEffect, forwardRef } from 'react';
import { motion } from 'framer-motion'; // ✅ import framer-motion

const BrandingPanel = forwardRef(function BrandingPanel({ image, stage }, ref) {
  const tooltips = [
    "🚀 DevOps Engineer",
    "📦 Docker Ninja",
    "⚙️ CI/CD Architect",
    "🔐 Secrets Manager (literally)",
    "📍 Based in Jaipur",
  ];

  const [nameVisible, setNameVisible] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const fullText = "From development to deployment, I try to ensure code ships faster, safer, and smarter.";
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [startedTyping, setStartedTyping] = useState(false);

  useEffect(() => {
    if (stage >= 1 && !startedTyping) {
      setDisplayedText('');
      setIndex(0);
      setStartedTyping(true);
    }
  }, [stage, startedTyping]);

  useEffect(() => {
    if (!startedTyping || index >= fullText.length) return;
    const timeout = setTimeout(() => {
      setDisplayedText(prev => prev + fullText[index]);
      setIndex(prev => prev + 1);
    }, 60);
    return () => clearTimeout(timeout);
  }, [index, startedTyping]);

  useEffect(() => {
    if (!isHovered) return;
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tooltips.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isHovered]);

  useEffect(() => {
    if (stage >= 2 && !nameVisible) {
      setNameVisible(true);
    }
  }, [stage, nameVisible]);

  return (
    <aside
      ref={ref}
      className="md:w-[30%] bg-white/20 rounded-3xl backdrop-blur-xs p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(255,255,255,0.12)] min-h-[440px]"
    >
      <div className="relative mb-6 flex flex-col items-center group">

        {/* Solid name */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={nameVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute text-[32px] md:text-[68px] font-extrabold uppercase -translate-x-[0rem] -translate-y-[1rem] md:-translate-x-0.5 md:-translate-y-9 select-none pointer-events-none whitespace-nowrap solid-text"
        >
          Rahul Patil
        </motion.h2>

        {/* Image */}
        <div
          className="relative z-10 w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden shadow-xl hover:shadow-2xl transition-transform duration-300 hover:scale-105"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          <img
            src={image}
            alt="Profile"
            className="w-full h-full object-cover aspect-square"
          />
        </div>

        {/* Outline name */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={nameVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.05}}
          className="absolute z-20 text-[32px] md:text-[68px] font-extrabold uppercase -translate-x-[1.4rem] -translate-y-[1rem] md:-translate-x-29 md:-translate-y-9 select-none pointer-events-none whitespace-nowrap outline-text"
          aria-hidden="true"
        >
          Rahul Patil
        </motion.h2>

        {/* Tooltip */}
        <div
          className={`
            absolute -top-15 md:-top-20 left-1/2 -translate-x-1/2 px-4 py-2 text-sm font-semibold text-white bg-black/80 rounded-lg shadow-lg shadow-violet-950 z-30
            transition-all duration-500 ease-out transform
            whitespace-nowrap max-w-[90vw] overflow-hidden text-ellipsis
            ${isHovered ? 'opacity-100 scale-100 translate-y-0 animate-tooltip-bounce' : 'opacity-0 scale-95 -translate-y-1'}
          `}
        >
          {tooltips[currentTip]}
          <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-black/80"></div>
        </div>
      </div>

      {/* Heading and typing text */}
      <h1 className="text-xl md:text-2xl text-white/90 font-bold mb-3">
        Born to deploy, Forced to debug 🚀
      </h1>
      <p className="text-white/70 text-sm md:text-base leading-relaxed px-3 typing-text show-cursor">
        {startedTyping ? displayedText : ''}
      </p>
    </aside>
  );
});

export default BrandingPanel;
