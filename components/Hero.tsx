import React, { useState } from 'react';
import NeuralNetwork from './NeuralNetwork';
import WorkCarousel from './WorkCarousel';

const PROJECTS = [
  {
    title: "Quantum Ledger v2.0",
    description: "A comprehensive overhaul of the enterprise asset tracking system, resulting in a 40% increase in processing speed and enhanced real-time reporting capabilities.",
    tags: ["Product Strategy", "Big Data", "Enterprise"],
    id: 0
  },
  {
    title: "Nexus Consumer App",
    description: "Redesigned the core mobile interaction model for 2M+ daily active users, improving stickiness and session length by prioritizing personalized discovery paths.",
    tags: ["UX Research", "Mobile", "B2C"],
    id: 1
  },
  {
    title: "Project Alpha",
    description: "An experimental platform for decentralized governance and real-time community voting mechanisms.",
    tags: ["Web3", "Governance", "Platform"],
    id: 2
  }
];

const Hero: React.FC = () => {
  // We use a raw rotation index to allow the carousel to rotate infinitely in one direction
  const [rotationIndex, setRotationIndex] = useState(0);

  const nextProject = () => setRotationIndex((prev) => prev + 1);
  const prevProject = () => setRotationIndex((prev) => prev - 1);

  // Derive the actual active project index using modulo
  const activeProject = ((rotationIndex % PROJECTS.length) + PROJECTS.length) % PROJECTS.length;
  const project = PROJECTS[activeProject];

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-8 md:px-16 flex flex-col justify-start pt-16 md:pt-20 relative z-20">

      {/* Content Wrapper */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full mt-12 md:mt-0">

        {/* LEFT COLUMN: TEXT */}
        <div className="flex-1 text-left space-y-8 mb-12 md:mb-0 relative z-30">
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-serif leading-[1.1]">
            <span className="block text-3xl md:text-4xl italic font-light text-gray-400 mb-2">
              Welcome to my
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Product Portfolio
            </span>
          </h1>

          <div className="max-w-md">
            <p className="text-gray-400 font-mono text-xs md:text-sm leading-relaxed tracking-wide border-l-2 border-white/30 pl-6">
              Bridging the gap between user needs and business goals through data-driven strategy and intuitive design.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: NEURAL NETWORK VISUALIZATION */}
        <div className="flex-1 flex justify-center items-center w-full h-[320px] relative z-10 overflow-hidden md:overflow-visible">
          <div className="w-full h-full md:w-[800px] max-w-none max-h-[320px] transform md:translate-x-8 md:translate-y-12">
            <NeuralNetwork />
          </div>
        </div>
      </div>

      {/* Selected Work Section Header */}
      <div className="w-full pt-24 pb-8 flex items-center justify-center group">
        <div className="h-[1px] flex-grow max-w-[400px] bg-gradient-to-r from-transparent via-white/60 to-white opacity-100 shadow-[0_0_20px_rgba(255,255,255,0.8)]"></div>
        <span className="mx-12 text-l md:text-xl font-mono text-white tracking-[0.5em] uppercase drop-shadow-[0_0_15px_rgba(255,255,255,1)]">
          Selected Work
        </span>
        <div className="h-[1px] flex-grow max-w-[400px] bg-gradient-to-r from-white via-white/60 to-transparent opacity-100 shadow-[0_0_20px_rgba(255,255,255,0.8)]"></div>
      </div>

      {/* Two-Column Carousel & Text Section */}
      <div className="w-full flex flex-col lg:flex-row items-center gap-12 pb-32">
        {/* Left: Left-aligned Carousel (linked to rotationIndex for continuous movement) */}
        <div className="flex-1 w-full lg:w-auto flex justify-start pl-0 lg:pl-8">
          <WorkCarousel activeProject={rotationIndex} />
        </div>

        {/* Right: Project Descriptions with Nav */}
        <div className="flex-1 w-full flex flex-col items-start space-y-6 lg:max-w-md">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-white/40 tracking-tighter">0{activeProject + 1} / 0{PROJECTS.length}</span>
              <div className="flex-grow h-[1px] bg-white/10"></div>
            </div>

            <h3 className="text-3xl font-serif text-white tracking-wide transition-all duration-300">
              {project.title}
            </h3>

            <p className="text-gray-400 font-mono text-xs md:text-sm leading-relaxed border-l-2 border-white/20 pl-4 min-h-[80px]">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map(tag => (
                <span key={tag} className="text-[10px] font-mono border border-white/20 px-2 py-0.5 text-white/60 rounded-full uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-6 pt-4">
            <button
              onClick={prevProject}
              className="group p-2 border border-white/20 hover:border-white transition-colors duration-300 rounded-sm"
              aria-label="Previous Project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/40 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextProject}
              className="group p-2 border border-white/20 hover:border-white transition-colors duration-300 rounded-sm"
              aria-label="Next Project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/40 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

    </main>
  );
};

export default Hero;