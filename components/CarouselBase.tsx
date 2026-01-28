import React from 'react';

const CarouselBase: React.FC = () => {
  return (
    <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-[400px] h-[200px] pointer-events-none z-10 flex items-center justify-center">
      
      {/* 3D Tilted Plane Container */}
      <div 
        className="relative w-full h-full flex items-center justify-center"
        style={{ 
          perspective: '1000px',
        }}
      >
        {/* The Base Disk - Compacted sizes */}
        <div 
           className="relative flex items-center justify-center"
           style={{
             transform: 'rotateX(78deg)', 
             transformStyle: 'preserve-3d'
           }}
        >
             {/* 1. Outer Ring - Sharper whitish border */}
             <div className="absolute w-[280px] h-[280px] rounded-full border border-white/[0.3] shadow-[0_0_15px_rgba(255,255,255,0.02)]"></div>
             
             {/* 2. Mid Ring - Clearer whitish line */}
             <div className="absolute w-[200px] h-[200px] rounded-full border border-white/[0.5]"></div>
             
             {/* 3. Inner Tech Ring - Bright dashed whitish line */}
             <div className="absolute w-[140px] h-[140px] rounded-full border border-white/[0.7] border-dashed"></div>

             {/* 4. Core Housing - Minimal dark disc with bright border */}
             <div className="absolute w-[90px] h-[90px] rounded-full bg-black shadow-[0_0_30px_rgba(0,0,0,1)] flex items-center justify-center border border-white/40">
                {/* 5. The Light Source - Clean and sharp */}
                {/* Sharp core glow */}
                <div className="absolute w-[30px] h-[30px] rounded-full bg-white blur-[6px] opacity-70"></div>
                {/* Hotspot */}
                <div className="absolute w-[12px] h-[12px] rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,1)]"></div>
             </div>
        </div>

        {/* Vertical Beam - Very subtle volumetric projector effect */}
        <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] w-[80px] h-[180px] bg-gradient-to-t from-white/[0.05] to-transparent blur-3xl pointer-events-none mix-blend-screen"
        ></div>
        
      </div>
    </div>
  );
};

export default CarouselBase;