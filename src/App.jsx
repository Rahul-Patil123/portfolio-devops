import React from 'react';
import './styles/index.css';
import myImage from './assets/my-image.png';
import BrandingPanel from './components/BrandingPanel';
import ProjectsCarousel from './components/ProjectsCarousel';

export default function App() {
  const projects = [
    { title: "Project 1", description: "Cool stuff here" },
    { title: "Project 2", description: "More cool stuff" },
    { title: "Project 3", description: "Yet another one" },
    { title: "Project 4", description: "Impressive work" },
    { title: "Project 5", description: "Clean and elegant" },
    { title: "Project 6", description: "Sleek functionality" },
  ];

  return (
    <div className="min-h-screen bg-gradient text-black font-inter transition-colors duration-500">
      <div className="p-4 md:p-6 mx-auto">
        <div className="flex flex-col md:flex-row min-h-[90vh] gap-6 md:gap-10">
          <BrandingPanel image={myImage} />
          <main className="flex-1 p-2 md:p-1 rounded-2xl">
            <section className="mb-12">
              <ProjectsCarousel projects={projects} />
            </section>
            <footer className="text-center text-sm text-white/70 mt-8">
              Made with ❤️ by Me — 2025
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
