import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ParticleWave from './components/ParticleWave';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-x-hidden">
      {/* Background Layer - Absolute positioning ensures it stays at the top of the document and scrolls away */}
      <div className="absolute top-0 left-0 w-full h-screen z-0">
        <ParticleWave />
      </div>
      
      {/* Vignette Overlay - Fixed to maintain cinematic atmosphere throughout the scroll */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-radial-gradient" 
           style={{
             background: 'radial-gradient(circle at center, transparent 0%, #000000 90%)',
             opacity: 0.4
           }}
      />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col">
        {/* First Screen */}
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <Hero />
        </div>
      </div>
    </div>
  );
};

export default App;