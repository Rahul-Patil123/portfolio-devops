import { useRef, useState, useEffect } from 'react';
import BrandingPanel from './components/BrandingPanel';
import ProjectsCarousel from './components/ProjectsCarousel';
import Dock from './components/Dock';
import StarCanvas from './components/StarIntro';
import myImage from './assets/my-image.png';
import './styles/index.css';
import SkyCanvas from './components/SkyCanvas';
import { fetchFilteredRepos } from './utils/githubAPI';
import SkillContentPanel from './components/SkillContentPanel'; // ✅ Import here

export default function App() {
  const [projects, setProjects] = useState([]);
  const brandingRef = useRef();
  const [stage, setStage] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState(null); // ✅ Moved here

  useEffect(() => {
    if (stage === 1) {
      setTimeout(() => setStage(2), 1600);
    } else if (stage === 2) {
      setTimeout(() => setStage(3), 2500);
    }
  }, [stage]);

  useEffect(() => {
    async function loadProjects() {
      const repos = await fetchFilteredRepos();
      setProjects(repos);
    }
    loadProjects();
  }, []);

  return (
    <div
      className="min-h-screen text-white font-inter transition-all duration-700 relative"
      style={{ backgroundColor: 'black' }}
    >
      <div className="absolute inset-0 bg-black opacity-70 z-0" />
      <SkyCanvas />
      {stage === 0 && (
        <StarCanvas onImpact={() => setStage(1)} brandingRef={brandingRef} />
      )}

      <div
        className={`relative z-10 transition-all duration-700 ease-out ${
          stage > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="p-4 md:p-5 mx-auto pb-28">
          <div className="flex flex-col md:flex-row min-h-[90vh] gap-6 md:gap-10">
            <BrandingPanel ref={brandingRef} image={myImage} stage={stage} />

            {/* Projects and Skill Panel at stage 3 */}
            {stage >= 3 && (
              <main className="flex-1 p-2 md:p-1 rounded-2xl transition-opacity duration-700 space-y-6">
                <SkillContentPanel selectedSkill={selectedSkill} /> {/* ✅ Here */}
                <section className="mb-12">
                  {/* <ProjectsCarousel projects={projects} /> */}
                </section>
              </main>
            )}
          </div>
        </div>
      </div>

      {/* Dock with setter passed as prop */}
      <div
        className={`fixed bottom-0 left-0 w-full z-40 transition-opacity duration-700 ${
          stage >= 3 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Dock setSelectedSkill={setSelectedSkill} />
      </div>
    </div>
  );
}
