import React from 'react';

export default function ProjectCard({ title, description }) {
  return (
    <div className="min-w-[18rem] snap-start bg-white/10 backdrop-blur-xs rounded-xl px-6 py-5 transition-transform hover:scale-95">
      <h3 className="text-lg md:text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm md:text-base text-white/90">{description}</p>
    </div>
  );
}
