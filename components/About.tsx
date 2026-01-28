import React from 'react';
import SkillsCylinder from './SkillsCylinder';

const About: React.FC = () => {
  return (
    <section className="relative z-20 w-full py-32 px-8 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        
        {/* Left: Text Content */}
        <div className="flex-1 space-y-8">
           <h2 className="text-4xl md:text-5xl font-serif text-white">
             Core Competencies
           </h2>
           <div className="space-y-6 text-gray-400 font-sans leading-relaxed text-sm md:text-base tracking-wide">
             <p>
               Navigating the intersection of technology, business, and user experience. 
               My approach involves dissecting complex problems into manageable, 
               data-informed strategies that drive product growth and user satisfaction.
             </p>
             <p>
               Whether it's 0-to-1 product discovery or optimizing maturity-stage applications, 
               I bring a toolkit focused on clarity, agility, and measurable impact.
             </p>
           </div>
        </div>

        {/* Right: Cylinder Visualization */}
        <div className="flex-1 w-full h-[400px] relative flex items-center justify-center">
             {/* Subtle gradient behind cylinder */}
            <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent opacity-20 pointer-events-none" />
            <SkillsCylinder />
        </div>

      </div>
    </section>
  );
};

export default About;