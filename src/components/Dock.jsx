import { useState, useRef, useEffect } from 'react';
import DockItem from './DockItem';
import ContactModal from './ContactModal';

import awsIcon from '../assets/icons/Aws.svg';
import dockerIcon from '../assets/icons/Docker.svg';
import gitIcon from '../assets/icons/Git.svg';
import githubIcon from '../assets/icons/Github-Circle.svg';
import jenkinsIcon from '../assets/icons/Jenkins.svg';
import k8sIcon from '../assets/icons/Kubernetes.svg';
import terraformIcon from '../assets/icons/Terraform.svg';
import phoneIcon from '../assets/icons/icons8-phone.svg';

const technologies = [
  { name: 'AWS', icon: awsIcon },
  { name: 'Docker', icon: dockerIcon },
  { name: 'Git', icon: gitIcon },
  { name: 'GitHub', icon: githubIcon },
  { name: 'Jenkins', icon: jenkinsIcon },
  { name: 'Kubernetes', icon: k8sIcon },
  { name: 'Terraform', icon: terraformIcon },
];

export default function Dock({ setSelectedSkill }) {
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
        <div className="flex items-end px-4 py-2 bg-white/30 shadow-xl rounded-3xl backdrop-blur-xs max-w-[95vw] mx-auto">
          <div
            ref={dockRef}
            className="flex items-end gap-3 overflow-x-auto sm:overflow-visible scrollbar-hide snap-x snap-mandatory max-w-[75vw] relative"
          >
            {technologies.map((tech, i) => (
              <DockItem
                key={i}
                name={tech.name}
                icon={tech.icon}
                mouseX={mouseX}
                dockRef={dockRef}
                onClick={() => setSelectedSkill(tech.name)} // ✅ call prop
              />
            ))}
          </div>
          <div className="flex items-center pl-4">
            <div className="w-[1.5px] h-10 bg-black/40 mx-3"></div>
            <DockItem
              name="Contact Me"
              icon={phoneIcon}
              onClick={() => setShowModal(true)}
              mouseX={mouseX}
              dockRef={dockRef}
            />
          </div>
        </div>
      </div>
      <ContactModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
