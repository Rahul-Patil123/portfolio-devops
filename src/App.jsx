import { useRef, useState, useEffect } from 'react';
import BrandingPanel from './components/BrandingPanel';
import ProjectsCarousel from './components/ProjectsCarousel';
import Dock from './components/Dock';
import StarCanvas from './components/StarIntro';
import myImage from './assets/my-image.png';
import './styles/index.css';
import SkyCanvas from './components/SkyCanvas';
import { fetchFilteredRepos } from './utils/githubAPI';
import SkillContentPanel from './components/SkillContentPanel';

export default function App() {
  const [projects, setProjects] = useState([]);
  const brandingRef = useRef();
  const [stage, setStage] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState(null);

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
      className="text-white font-inter transition-all duration-700 relative h-screen overflow-y-auto md:overflow-hidden"
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
        <div className="p-4 md:p-5 mx-auto pb-28 md:h-screen">
          <div className="flex flex-col md:flex-row h-full overflow-hidden gap-6 md:gap-10">
            <div className="md:h-full md:w-[30%]">
              <BrandingPanel ref={brandingRef} image={myImage} stage={stage} />
            </div>

            {stage >= 3 && (
              <main className="flex-1 h-[65vh] md:h-full rounded-2xl flex flex-col space-y-6">
                <div className="flex-1 overflow-y-auto ">
                  <SkillContentPanel selectedSkill={selectedSkill} />
                </div>
                <section className="mb-12">
                  <ProjectsCarousel projects={projects} />
                </section>
              </main>
            )}
          </div>
        </div>
      </div>
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
