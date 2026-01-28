import React from 'react';
import CarouselBase from './CarouselBase';

// ---------------------------------------------------------------------------
// CONFIGURATION
// ---------------------------------------------------------------------------
const SCREENS_COUNT = 3; // Updated to 3 projects

// Geometry: Adjusted for 3 screens
const FACES_PER_GROUP = 8; // 8 faces per project to keep total faces at 24 (high fidelity)
const ACTIVE_FACES = 7; 
const TOTAL_FACES = SCREENS_COUNT * FACES_PER_GROUP; // 24
const DEGREES_PER_FACE = 360 / TOTAL_FACES; // 15 degrees

/**
 * !!! CHANGE IMAGE SIZE HERE !!!
 * Increase this value to expand the images horizontally. 
 * Current value 46 is ~10% larger than previous 42.
 */
const FACE_WIDTH = 46; 

// Radius Calculation: r = w / (2 * tan(pi/n))
const RADIUS = Math.round(FACE_WIDTH / (2 * Math.tan(Math.PI / TOTAL_FACES))) - 2; 

const IMG_1 = 'https://i.imgur.com/aEiUdXG.png';
const IMG_3 = 'https://miro.medium.com/v2/resize:fit:1100/format:webp/0*ZPkgCJdxlbd-7TuH.jpg';
const IMG_4 = 'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*PLHpPHlrfbGFWgh_nCgLWg.png';

const screens = [
  { id: 'overview', title: 'OVERVIEW', image: IMG_1 },
  { id: 'allocation', title: 'ALLOCATION', image: IMG_3 },
  { id: 'assets', title: 'ASSETS', image: IMG_4 },
];

interface WorkCarouselProps {
  activeProject?: number;
}

const WorkCarousel: React.FC<WorkCarouselProps> = ({ activeProject = 0 }) => {
  const faces = Array.from({ length: TOTAL_FACES }, (_, i) => {
    const groupIndex = Math.floor(i / FACES_PER_GROUP);
    const indexInGroup = i % FACES_PER_GROUP;
    const isSpacer = indexInGroup >= ACTIVE_FACES;

    return {
      globalIndex: i,
      screen: screens[groupIndex],
      segmentIndex: indexInGroup,
      isSpacer
    };
  });

  // -------------------------------------------------------------------------
  // STARTING POINT CONTROL
  // -------------------------------------------------------------------------
  // The line below controls the rotation. 
  // We subtract an offset to center the "ACTIVE_FACES" group.
  // Offset = (Middle index of the active group) * (Degrees per face)
  const centerOffset = ((ACTIVE_FACES - 1) / 2) * DEGREES_PER_FACE;
  const rotationAngle = (activeProject * -(360 / SCREENS_COUNT)) - centerOffset;

  return (
    <div className="w-full h-[360px] flex justify-start items-center relative md:overflow-visible">
      <style>{`
        .cylinder-stage {
          perspective: 1200px;
          perspective-origin: 50% 40%;
        }
        .cylinder-rotor {
          transform-style: preserve-3d;
          width: ${FACE_WIDTH}px; 
          height: 132px; 
          position: relative;
          z-index: 20;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cylinder-segment {
           backface-visibility: hidden;
           -webkit-backface-visibility: hidden;
        }
      `}</style>

      {/* 3D CYLINDER STAGE */}
      <div className="cylinder-stage relative w-[320px] flex justify-center h-full items-center">
          
          {/* LENS MASK / SIDE VIGNETTE */}
          <div className="absolute top-0 left-[-80px] right-[-80px] bottom-0 z-[60] pointer-events-none"
               style={{
                 background: 'linear-gradient(90deg, #050505 0%, transparent 20%, transparent 80%, #050505 100%)'
               }}
          ></div>

          {/* CYLINDER OBJECT - Manual rotation via state */}
          <div 
            className="cylinder-rotor mb-16"
            style={{ transform: `rotateY(${rotationAngle}deg)` }}
          >
            {faces.map((face) => {
              const rotation = face.globalIndex * DEGREES_PER_FACE;
              if (face.isSpacer) return null;

              return (
                <div
                  key={face.globalIndex}
                  className="absolute top-0 left-0 w-full h-full cylinder-segment"
                  style={{
                    transform: `rotateY(${rotation}deg) translateZ(${RADIUS}px)`,
                    width: `${FACE_WIDTH + 0.5}px`, 
                    marginLeft: '-0.2px',
                  }}
                >
                  <CylinderSegment 
                    screen={face.screen} 
                    segmentIndex={face.segmentIndex}
                    totalSegments={ACTIVE_FACES}
                    segmentWidth={FACE_WIDTH}
                  />
                </div>
              );
            })}
          </div>

          {/* ASTRO BASE COMPONENT */}
          <CarouselBase />
      </div>
    </div>
  );
};

interface SegmentProps {
  screen: any;
  segmentIndex: number;
  totalSegments: number;
  segmentWidth: number;
}

const CylinderSegment: React.FC<SegmentProps> = ({ screen, segmentIndex, totalSegments, segmentWidth }) => {
  const xOffset = -(segmentIndex * segmentWidth);
  const totalWidth = totalSegments * segmentWidth;

  return (
    <div className="w-full h-full relative overflow-hidden bg-black/90 border-t border-b border-white/20">
        <div 
          className="absolute top-0 h-full flex items-center"
          style={{
            width: `${totalWidth}px`,
            left: `${xOffset}px`,
          }}
        >
          <div className="relative w-full h-full">
            <img 
               src={screen.image} 
               alt={screen.title} 
               className="w-full h-full object-cover opacity-80"
            />
            {/* Vignette on image itself */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20"></div>
          </div>
        </div>
        
        {/* Surface reflection */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent opacity-30"></div>
    </div>
  );
};

export default WorkCarousel;