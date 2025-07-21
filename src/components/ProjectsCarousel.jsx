import { useRef, useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import ReadmeModal from './ReadmeModal';

export default function ProjectsCarousel({ projects }) {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const scrollSpeed = 1;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [readmeContent, setReadmeContent] = useState("");

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

  const handleCardClick = async (project) => {
    const match = project.url.match(/github\.com\/([^/]+)\/([^/]+)/);
    const githubRawReadmeUrl = match
      ? `https://raw.githubusercontent.com/${match[1]}/${match[2]}/main/README.md`
      : null;

    if (!githubRawReadmeUrl) {
      setReadmeContent("README not found.");
    } else {
      try {
        const res = await fetch(githubRawReadmeUrl);
        if (!res.ok) throw new Error("Fetch failed");
        const text = await res.text();
        setReadmeContent(text);
      } catch {
        setReadmeContent("Failed to load README.md");
      }
    }

    setSelectedProject({
      title: project.title,
      githubUrl: project.url,
    });
    setIsModalOpen(true);
  };

  const renderProjects = projects.length >= 3 ? [...projects, ...projects] : projects;

  return (
    <>
      <div
        className="w-full max-w-[62rem] mx-auto overflow-hidden relative"
        onMouseEnter={stopScroll}
        onMouseLeave={startScroll}
      >
        <div
          className="flex gap-6 px-2 h-56 overflow-x-scroll scrollbar-hide"
          ref={scrollRef}
        >
          <div className="w-8 shrink-0" />
          {renderProjects.map((project, index) => (
            <ProjectCard
              key={`${project.url}-${index}`}
              title={project.title}
              image={project.image}
              onClick={() => handleCardClick(project)}
            />
          ))}
        </div>
      </div>

      <ReadmeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={readmeContent}
        githubUrl={selectedProject?.githubUrl}
      />
    </>
  );
}
