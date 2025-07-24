import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { techDetails } from '../Constants';
export default function SkillContentPanel({ selectedSkill }) {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!selectedSkill || !techDetails[selectedSkill]) return;

    const fullText = techDetails[selectedSkill].description;
    setTypedText('');
    setCurrentIndex(0);

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex > fullText.length) {
          clearInterval(interval);
          return prev;
        }
        setTypedText(fullText.slice(0, nextIndex));
        return nextIndex;
      });
    }, 18);

    return () => clearInterval(interval);
  }, [selectedSkill]);

  if (!selectedSkill || !techDetails[selectedSkill]) {
    return (
      <div className="mt-16 mb-4 text-center text-lg text-white/50 font-medium tracking-wide">
        👆 Select any skill icon from the dock below
      </div>
    );
  }

  const { icon } = techDetails[selectedSkill];

  return (
    <motion.div
      key={selectedSkill}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[200px] md:min-h-[240px] w-full px-4 py-6 sm:px-8 flex flex-col bg-white/5 rounded-xl border border-white/10 shadow-xl backdrop-blur-md"
    >
      <div className="flex items-center gap-3 mb-4">
      <img src={icon} alt={selectedSkill} className="w-10 h-10 drop-shadow" />
      <h3 className="text-xl font-bold text-white">{selectedSkill}</h3>
    </div>
      <p className="text-white text-base leading-relaxed show-cursor">
        {typedText}
      </p>
    </motion.div>
  );
}
