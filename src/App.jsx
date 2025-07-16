import { useRef, useState, useEffect } from 'react';
import BrandingPanel from './components/BrandingPanel';
import ProjectsCarousel from './components/ProjectsCarousel';
import Dock from './components/Dock';
import StarIntro from './components/StarIntro';
import myImage from './assets/my-image.png';
import backgroundImage from './assets/background.png'; // ✅ Background image
import './styles/index.css';

export default function App() {
  const brandingRef = useRef();
  const [stage, setStage] = useState(0); // 0 = intro, 1 = image, 2 = branding, 3 = full

  useEffect(() => {
    if (stage === 1) {
      setTimeout(() => setStage(2), 1600);
    } else if (stage === 2) {
      setTimeout(() => setStage(3), 2500);
    }
  }, [stage]);

  const projects = [
    { title: 'Project 1', description: 'Cool stuff here' },
    { title: 'Project 2', description: 'More cool stuff' },
    { title: 'Project 3', description: 'Yet another one' },
    { title: 'Project 4', description: 'Impressive work' },
    { title: 'Project 5', description: 'Clean and elegant' },
    { title: 'Project 6', description: 'Sleek functionality' },
  ];

  return (
    <div
      className="min-h-screen text-white font-inter transition-all duration-700 relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70 z-0" />

      {/* 🌠 Star Animation Layer */}
      {stage === 0 && (
        <StarIntro brandingRef={brandingRef} onImpact={() => setStage(1)} />
      )}

      {/* Main Layout Content */}
      <div
        className={`relative z-10 transition-all duration-700 ease-out ${
          stage > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="p-4 md:p-5 mx-auto pb-28">
          <div className="flex flex-col md:flex-row min-h-[90vh] gap-6 md:gap-10">
            <BrandingPanel ref={brandingRef} image={myImage} />

            {/* Projects appear only at stage 3 */}
            {stage >= 3 && (
              <main className="flex-1 p-2 md:p-1 rounded-2xl transition-opacity duration-700">
                <section className="mb-12">
                  <ProjectsCarousel projects={projects} />
                </section>
              </main>
            )}
          </div>
        </div>
      </div>

      {/* Dock appears at stage 3 */}
      <div
        className={`fixed bottom-0 left-0 w-full z-40 transition-opacity duration-700 ${
          stage >= 3 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Dock />
      </div>
    </div>
  );
}
