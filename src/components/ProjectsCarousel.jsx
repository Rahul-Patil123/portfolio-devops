import { useRef, useEffect } from 'react';
import ProjectCard from './ProjectCard';
export default function ProjectsCarousel({ projects }) {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const scrollSpeed = 1;

  const scroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    container.scrollLeft += scrollSpeed;
    if (container.scrollLeft >= container.scrollWidth / 2) {
      container.scrollLeft = 0;
    }
    animationRef.current = requestAnimationFrame(scroll);
  };

  const stopScroll = () => cancelAnimationFrame(animationRef.current);
  const startScroll = () => {
    if (projects.length >= 3) {
      animationRef.current = requestAnimationFrame(scroll);
    }
  };

  useEffect(() => {
    startScroll();
    return () => stopScroll();
  }, [projects]);

  const renderProjects = projects.length >= 3
    ? [...projects, ...projects] // double it for smooth scroll
    : projects;

  return (
    <div
      className="w-full max-w-[62rem] mx-auto overflow-hidden relative"
      onMouseEnter={stopScroll}
      onMouseLeave={startScroll}
    >
      <div
        className="flex gap-6 px-2 h-56 overflow-x-scroll scrollbar-hide"
        ref={scrollRef}
        aria-label="Project showcase scrolling carousel"
      >
        <div className="w-8 shrink-0" />
        {renderProjects.map((project, index) => (
          <ProjectCard
            key={`${project.url}-${index}`} // safer key
            title={project.title}
            description={project.description}
            url={project.url}
            image={project.image}
          />
        ))}
      </div>
    </div>
  );
}
