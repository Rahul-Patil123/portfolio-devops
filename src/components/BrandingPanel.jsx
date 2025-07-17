import { useState, useEffect, forwardRef } from 'react';

const BrandingPanel = forwardRef(function BrandingPanel({ image, stage }, ref) {
  const tooltips = ["Rahul Patil", "UI/UX Developer", "React Enthusiast", "Based in Earth 🌍"];
  const [currentTip, setCurrentTip] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const fullText = "A web developer who loves creating beautiful UIs and smooth user experiences.";
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [startedTyping, setStartedTyping] = useState(false);

  // ✅ Start typing ONCE when stage reaches 2
  useEffect(() => {
    if (stage >= 1 && !startedTyping) {
      setDisplayedText('');
      setIndex(0);
      setStartedTyping(true);
    }
  }, [stage, startedTyping]);

  // ✅ Typing animation
  useEffect(() => {
    if (!startedTyping || index >= fullText.length) return;

    const timeout = setTimeout(() => {
      setDisplayedText(prev => prev + fullText[index]);
      setIndex(prev => prev + 1);
    }, 60);

    return () => clearTimeout(timeout);
  }, [index, startedTyping]);

  // ✅ Tooltip rotation
  useEffect(() => {
    if (!isHovered) return;
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tooltips.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <aside
      ref={ref}
      className="md:w-[30%] bg-white/20 rounded-3xl backdrop-blur-xs p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(255,255,255,0.12)] min-h-[440px]"
    >
      <div className="relative mb-6 flex flex-col items-center group">
        <div
          className={`
            absolute -top-20 left-1/2 -translate-x-1/2 px-4 py-2 text-sm font-semibold text-white bg-black/80 rounded-lg shadow-md z-20
            transition-all duration-500 ease-out transform
            ${isHovered ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-1'}
          `}
        >
          {tooltips[currentTip]}
          <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-black/80"></div>
        </div>

        <div
          className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
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
      </div>

      <h1 className="text-2xl md:text-3xl font-bold mb-3">Hi, I'm You</h1>

      <p className="text-black/90 text-sm md:text-base leading-relaxed px-3 typing-text show-cursor">
        {startedTyping ? displayedText : ''}
      </p>
    </aside>
  );
});

export default BrandingPanel;
