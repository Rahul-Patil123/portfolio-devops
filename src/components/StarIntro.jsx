import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import cometImg from '../assets/comet.png';

const getRandomX = () => Math.random() * window.innerWidth;
const getRandomY = () => Math.random() * window.innerHeight;
const getRandomDir = () => (Math.random() < 0.5 ? 'top-down' : 'diagonal-right');

export default function StarIntro({ onImpact, brandingRef }) {
  const heroControls = useAnimation();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!brandingRef.current) return;

      const rect = brandingRef.current.getBoundingClientRect();
      const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      const finalX = rect.left + scrollX + rect.width / 2 - 60;
      const finalY = rect.top + scrollY + rect.height / 2 - 60;

      heroControls.start({
        left: finalX,
        top: finalY,
        opacity: 1,
        scale: [1, 5, 10],
        transition: { duration: 1.9, ease: 'easeIn'},
      });

      setTimeout(() => {
        onImpact?.();
      }, 1700);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div className="fixed inset-0 z-50 bg-black overflow-hidden">
      {[...Array(120)].map((_, i) => {
        const delay = Math.random() * 2;
        const dir = getRandomDir();
        const isBig = Math.random() < 0.62;
        const size = isBig ? Math.floor(Math.random() * 2000 + 300) : Math.floor(Math.random() * 280 + 32);
        const x = getRandomX();
        const y = getRandomY();

        let initial = {}, animate = {}, style = {};

        if (dir === 'top-down') {
          initial = { x, y: -150, opacity: 0 };
          animate = { x, y: window.innerHeight + 150, opacity: [0, 1, 0] };
        } else if (dir === 'diagonal-right') {
          // From top-right to bottom-left
          initial = { x: window.innerWidth + 150, y: -150, opacity: 0 };
          animate = { x: -150, y: window.innerHeight + 150, opacity: [0, 1, 0] };
        }

        style = {
          width: size,
          height: size,
          filter: isBig ? 'blur(10px) brightness(8)' : 'brightness(7)',
        };

        return (
          <motion.img
            key={i}
            src={cometImg}
            alt="comet"
            className="absolute pointer-events-none drop-shadow-[0_0_40px_white]"
            initial={initial}
            animate={animate}
            transition={{ duration: 3.5, delay }}
            style={style}
          />
        );
      })}

      {/* Hero Star */}
      <motion.img
        src={cometImg}
        alt="Hero comet"
        initial={{
          position: 'fixed',
          left: '50%',
          top: '-120px',
          opacity: 0,
          width: '120px',
          height: '120px',
          filter: 'brightness(10)',
        }}
        animate={heroControls}
        className="absolute drop-shadow-[0_0_60px_white]"
      />
    </motion.div>
  );
}
