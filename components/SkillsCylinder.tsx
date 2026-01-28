import React, { useEffect, useRef } from 'react';

const SkillsCylinder: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const skills = [
      "Product Strategy", "User Research", "Agile & Scrum", 
      "Data Analysis", "Roadmapping", "UX/UI Design", 
      "A/B Testing", "Go-to-Market", "Stakeholder Mgmt", 
      "SQL", "Python", "Figma", "Jira", "KPI Tracking",
      "Growth Hacking", "Wireframing"
    ];

    // Cylinder setup
    const tags: { x: number; y: number; z: number; text: string }[] = [];
    const radius = 180;
    
    // Distribute tags in a spiral/helix pattern
    const len = skills.length;
    skills.forEach((skill, i) => {
        const phi = Math.acos(-1 + (2 * i) / len);
        const theta = Math.sqrt(len * Math.PI) * phi;
        
        // Map to cylinder surface
        // y goes from top to bottom
        const y = -160 + (320 * i) / (len - 1); 
        // x and z on circle
        const angle = (i / len) * Math.PI * 2 * 2; // 2 loops
        
        tags.push({
            x: radius * Math.cos(angle),
            y: y,
            z: radius * Math.sin(angle),
            text: skill
        });
    });

    let rotation = 0;
    let animationFrameId: number;

    const render = () => {
       ctx.clearRect(0, 0, width, height);
       const cx = width / 2;
       const cy = height / 2;

       rotation += 0.003; 

       // Calculate positions
       const renderList = tags.map(tag => {
           // Rotate around Y axis
           const cos = Math.cos(rotation);
           const sin = Math.sin(rotation);
           
           const x = tag.x * cos - tag.z * sin;
           const z = tag.x * sin + tag.z * cos;
           
           // Simple perspective
           const fov = 350;
           const scale = fov / (fov + z + radius); 
           
           return {
               text: tag.text,
               x2d: cx + x * scale,
               y2d: cy + tag.y * scale,
               scale: scale,
               z: z,
               opacity: Math.max(0.1, Math.min(1, (scale - 0.5) * 2.5)) 
           };
       });

       // Draw back to front
       renderList.sort((a, b) => b.z - a.z);

       ctx.textAlign = 'center';
       ctx.textBaseline = 'middle';
       
       renderList.forEach(item => {
           // Font size based on depth
           const fontSize = Math.max(10, 16 * item.scale);
           ctx.font = `${fontSize}px "Space Mono", monospace`;
           
           // Color/Opacity based on depth
           // Front items white, back items fade to grey/transparent
           ctx.fillStyle = `rgba(255, 255, 255, ${item.opacity})`;
           ctx.fillText(item.text, item.x2d, item.y2d);
       });

       animationFrameId = requestAnimationFrame(render);
    };
    
    render();

    const handleResize = () => {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default SkillsCylinder;