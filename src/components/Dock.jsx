// Dock.jsx
import DockItem from './DockItem';
import ContactModal from './ContactModal';
import reactIcon from '../assets/icons/react.svg';
import nodeIcon from '../assets/icons/nodedotjs.svg';
import jsIcon from '../assets/icons/javascript.svg';
import phoneIcon from '../assets/icons/icons8-phone.svg';
import { useState } from 'react';

const technologies = [
  { name: 'React', icon: reactIcon },
  { name: 'Node.js', icon: nodeIcon },
  { name: 'JavaScript', icon: jsIcon },
];

export default function Dock() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Dock container */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        {/* Background bar */}
        <div className="flex items-end gap-4 px-6 py-3 bg-white/30 shadow-xl rounded-3xl backdrop-blur-xs max-w-[95vw] mx-auto overflow-x-auto">
          {technologies.map((tech, i) => (
            <DockItem key={i} name={tech.name} icon={tech.icon} />
          ))}

          <DockItem
            name="Contact Me"
            icon={phoneIcon}
            onClick={() => setShowModal(true)}
            isCall
          />
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
