import React, { useEffect, useRef } from 'react';

const ParticleWave: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let count = 0;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // Configuration - High Density for "Starry" Net
    const SEPARATION = 18; 
    const AMOUNTX = 300; 
    const AMOUNTY = 100; 

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      const cx = width / 2;
      const cy = height / 2;
      
      const fov = 400; 
      const camY = -350; 

      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          
          let x = (ix * SEPARATION) - ((AMOUNTX * SEPARATION) / 2);
          let z = (iy * SEPARATION);

          // Wave Physics - Fluid & Starry
          // Main rolling wave
          let y = Math.sin((ix * 0.15) + count) * 25 + Math.sin((iy * 0.15) + count) * 25;
          
          // Secondary ripple for "shimmer/shiny" effect
          y += Math.sin((ix * 0.5) + count * 2) * 3;

          const pz = z + 100; 

          // Skip behind camera
          if (pz <= 0) continue;

          const scale = fov / pz;

          const projX = cx + x * scale;
          const projY = cy + (y + camY) * scale;

          // Optimization: Skip off-screen particles
          if (projX < -50 || projX > width + 50 || projY < -50 || projY > height + 50) continue;

          // Alpha / Brightness
          // Closer particles are "shinier" (brighter), fade out deep back
          let alpha = (scale * 2.0) * (1 - (iy / AMOUNTY) * 0.8);
          
          if (alpha > 1) alpha = 1;
          if (alpha < 0.1) continue; // Skip invisible

          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          
          // Starry effect: 
          // Use relatively small size relative to scale for "point light" look
          const size = Math.max(0.6, scale * 2.5); 
          
          // Render optimization: 
          // Rects for small "stars" (faster, sharper), Arcs for close "lights" (glowy)
          if (size < 2) {
             ctx.fillRect(projX, projY, size, size);
          } else {
             ctx.beginPath();
             ctx.arc(projX, projY, size/2, 0, Math.PI * 2);
             ctx.fill();
          }
        }
      }

      count += 0.05; 
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full block"
    />
  );
};

export default ParticleWave;