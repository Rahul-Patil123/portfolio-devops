import React, { useRef, useEffect } from 'react';
import './index.css';
import myImage from './assets/my-image.png';

export default function App() {
  const projects = [
    { title: "Project 1", description: "Cool stuff here" },
    { title: "Project 2", description: "More cool stuff" },
    { title: "Project 3", description: "Yet another one" },
    { title: "Project 4", description: "Impressive work" },
    { title: "Project 5", description: "Clean and elegant" },
    { title: "Project 6", description: "Sleek functionality" },
  ];

  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const scrollSpeed = 1; // px per frame

  const scroll = () => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;

    container.scrollLeft += scrollSpeed;

    // If scroll reaches the end of the first copy, reset to start
    if (container.scrollLeft >= container.scrollWidth / 2) {
      container.scrollLeft = 0;
    }

    animationRef.current = requestAnimationFrame(scroll);
  };

  const stopScroll = () => {
    cancelAnimationFrame(animationRef.current);
  };

  const startScroll = () => {
    animationRef.current = requestAnimationFrame(scroll);
  };

  useEffect(() => {
    startScroll();
    return () => stopScroll(); // cleanup
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#ff5f6d,#ffc371,#7b2ff7)] text-white transition-colors duration-500">
      <div className="md:p-6 mx-auto">
        <div className="flex flex-col md:flex-row min-h-[90vh] gap-6 md:gap-10">

          {/* Branding Panel */}
          <aside className="md:w-[30%] bg-white/30 rounded-3xl backdrop-blur-2xl p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center text-center shadow-2xl min-h-[440px]">
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <img
                src={myImage}
                alt="Profile"
                className="w-full h-full object-center object-cover block"
                style={{ aspectRatio: '1', objectFit: 'cover' }}
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-3">Hi, I'm You</h1>
            <p className="text-white/90 text-sm md:text-base leading-relaxed px-3">
              A web developer who loves creating beautiful UIs and smooth user experiences.
            </p>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 md:p-8 bg-white/10 rounded-2xl backdrop-blur-md shadow-xl">
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">Projects</h2>

              {/* Scroll area shifted right using flex spacer */}
              <div
                className="w-full max-w-[62rem] mx-auto overflow-hidden relative"
                onMouseEnter={stopScroll}
                onMouseLeave={startScroll}
              >
                <div
                  className="flex gap-6 px-2 h-56 overflow-x-scroll scrollbar-hide"
                  ref={scrollRef}
                >
                  {/* Spacer to push content right without margin/padding */}
                  <div className="w-8 shrink-0" />

                  {/* Duplicate project cards for seamless loop */}
                  {[...projects, ...projects].map((project, index) => (
                    <div
                      key={index}
                      className="project-card min-w-[18rem] snap-start bg-white/20 backdrop-blur-lg rounded-xl px-6 py-5 transition-transform hover:scale-95"
                    >
                      <h3 className="text-lg md:text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-sm md:text-base text-white/90">{project.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="text-center text-sm text-white/70 mt-8">
              Made with ❤️ by Me — 2025
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
