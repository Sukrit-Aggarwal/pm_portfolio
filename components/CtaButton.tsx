import React from 'react';

interface CtaButtonProps {
  text: string;
}

const CtaButton: React.FC<CtaButtonProps> = ({ text }) => {
  return (
    <button className="group relative inline-block focus:outline-none">
        {/* Background Shape */}
        <div className="absolute inset-0 bg-white/5 transform skew-x-[-10deg] rounded-sm transition-transform duration-300 group-hover:scale-105 group-hover:bg-white/10"></div>
        
        {/* Border Shape */}
        <div className="relative bg-black/60 backdrop-blur-sm border border-white/20 px-8 py-3 transform skew-x-[-10deg] hover:border-white transition-colors duration-300">
             {/* Corner Accents */}
             <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/50 group-hover:border-white transition-colors"></div>
             <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/50 group-hover:border-white transition-colors"></div>

             {/* Text Content (Unskew the text) */}
            <span className="block transform skew-x-[10deg] text-gray-300 font-mono font-bold tracking-widest text-sm uppercase group-hover:text-white transition-colors duration-300">
                {text}
            </span>
        </div>
        
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-white/10 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
    </button>
  );
};

export default CtaButton;