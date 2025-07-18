import DockItem from './DockItem';
import ContactModal from './ContactModal';
import reactIcon from '../assets/icons/react.svg';
import nodeIcon from '../assets/icons/nodedotjs.svg';
import jsIcon from '../assets/icons/javascript.svg';
import phoneIcon from '../assets/icons/icons8-phone.svg';
import { useState, useRef, useEffect } from 'react';

const technologies = [
  { name: 'React', icon: reactIcon },
  { name: 'Node.js', icon: nodeIcon },
  { name: 'JavaScript', icon: jsIcon },
];

export default function Dock() {
  const [showModal, setShowModal] = useState(false);
  const [mouseX, setMouseX] = useState(null);
  const dockRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dockRef.current) return;

      const rect = dockRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;

      setMouseX(x);
    };

    const handleMouseLeave = () => setMouseX(null);

    const dockEl = dockRef.current;
    dockEl.addEventListener('mousemove', handleMouseMove);
    dockEl.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      dockEl.removeEventListener('mousemove', handleMouseMove);
      dockEl.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div
          ref={dockRef}
          className="flex items-end gap-3 px-4 py-2 bg-white/30 shadow-xl rounded-3xl backdrop-blur-xs max-w-[95vw] mx-auto"
        >
          {technologies.map((tech, i) => (
            <DockItem
              key={i}
              name={tech.name}
              icon={tech.icon}
              mouseX={mouseX}
              dockRef={dockRef}
            />
          ))}

          {/* 🔹 Vertical Divider */}
          <div className="w-1/180 h-11 bg-black/50 mx-1"></div>

          {/* Contact Item */}
          <DockItem
            name="Contact Me"
            icon={phoneIcon}
            onClick={() => setShowModal(true)}
            mouseX={mouseX}
            dockRef={dockRef}
          />
        </div>
      </div>

      <ContactModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
