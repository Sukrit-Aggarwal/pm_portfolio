import React, { useEffect, useRef } from 'react';

const NeuralNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    // -------------------------------------------------------------------------
    // CONFIGURATION
    // -------------------------------------------------------------------------
    const PERSPECTIVE = 800;
    const ROTATION_X = 0.4;  // Tilt down to see tops of cubes
    const ROTATION_Y = -0.5; // Rotate to side
    
    // Monochrome Theme
    const COLOR_LINE = 'rgba(180, 180, 180, 0.35)'; // Whiter, more visible lines
    const COLOR_ACCENT = 'rgba(255, 255, 255, 0.95)'; // Brighter white for outlines
    const COLOR_FILL = 'rgba(0, 0, 0, 0.95)'; // Deep black fill to occlude background

    // -------------------------------------------------------------------------
    // DATA
    // -------------------------------------------------------------------------
    interface Cube {
        id: number;
        x: number;
        y: number;
        z: number;
        size: number;
        phase: number; // For independent floating
    }

    // Distanced Cubes horizontally - Adjusted to prevent overlap and follow direction
    const cubes: Cube[] = [
        { id: 0, x: 0, y: 0, z: 0, size: 45, phase: 0 },         // Center
        { id: 1, x: 280, y: 0, z: 60, size: 35, phase: 2 },      // Right
        { id: 2, x: -300, y: 100, z: 80, size: 40, phase: 1 },   // Left (Pushed down to separate from Top Left)
        { id: 3, x: 180, y: -90, z: -40, size: 30, phase: 4 },   // Right Top
        { id: 4, x: -220, y: -70, z: -30, size: 35, phase: 3 },  // Left Top
        { id: 5, x: 160, y: 80, z: -10, size: 25, phase: 5 },    // Right Bottom (Shifted Up to 80)
    ];

    const connections = [
        [0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [2, 4], [1, 3]
    ];

    interface Signal {
        from: number;
        to: number;
        progress: number;
        speed: number;
    }
    const signals: Signal[] = [];

    // Pre-calculate cube vertices template
    const getCubeVertices = (s: number) => [
        {x:-s, y:-s, z:-s}, {x: s, y:-s, z:-s}, {x: s, y: s, z:-s}, {x:-s, y: s, z:-s}, // Front (z = -s)
        {x:-s, y:-s, z: s}, {x: s, y:-s, z: s}, {x: s, y: s, z: s}, {x:-s, y: s, z: s}  // Back (z = s)
    ];

    // Pre-calculate random "network" surface lines for each cube to give it texture
    // Each cube gets a few random internal lines
    const cubeDetails = cubes.map(() => {
        const lines = [];
        for(let i=0; i<4; i++) {
             lines.push({
                 s: Math.floor(Math.random() * 8),
                 e: Math.floor(Math.random() * 8)
             });
        }
        return lines;
    });

    // -------------------------------------------------------------------------
    // 3D MATH
    // -------------------------------------------------------------------------
    const project = (x: number, y: number, z: number) => {
        // Rotation Y
        let cy = Math.cos(ROTATION_Y);
        let sy = Math.sin(ROTATION_Y);
        let x1 = x * cy - z * sy;
        let z1 = x * sy + z * cy;

        // Rotation X
        let cx = Math.cos(ROTATION_X);
        let sx = Math.sin(ROTATION_X);
        let y2 = y * cx - z1 * sx;
        let z2 = y * sx + z1 * cx;

        // Perspective
        const scale = PERSPECTIVE / (PERSPECTIVE + z2 + 400);
        return {
            x: width / 2 + x1 * scale,
            y: height / 2 + y2 * scale,
            scale: scale,
            z: z2 // for sorting
        };
    };

    // -------------------------------------------------------------------------
    // RENDER
    // -------------------------------------------------------------------------
    let time = 0;
    let animationId: number;

    const render = () => {
        // Clear
        ctx.clearRect(0, 0, width, height);
        time += 0.015;

        // Sort cubes by Z depth to draw back-to-front (simple painter's alg)
        const sortedCubes = cubes.map((cube, idx) => {
            // Apply floating animation
            const floatY = Math.sin(time + cube.phase) * 10;
            const p = project(cube.x, cube.y + floatY, cube.z);
            return { ...cube, projected: p, actualY: cube.y + floatY, idx };
        }).sort((a, b) => b.projected.z - a.projected.z);

        // 1. Draw Network Connections (Lines between cubes)
        connections.forEach(([i1, i2]) => {
            const c1 = cubes[i1];
            const c2 = cubes[i2];
            
            const y1 = c1.y + Math.sin(time + c1.phase) * 10;
            const y2 = c2.y + Math.sin(time + c2.phase) * 10;

            const p1 = project(c1.x, y1, c1.z);
            const p2 = project(c2.x, y2, c2.z);

            ctx.strokeStyle = COLOR_LINE;
            ctx.lineWidth = 1; 
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
        });

        // 2. Draw Signals
        if (Math.random() < 0.05) { 
            const pair = connections[Math.floor(Math.random() * connections.length)];
            // Random direction
            if(Math.random() > 0.5) signals.push({ from: pair[0], to: pair[1], progress: 0, speed: 0.02 });
            else signals.push({ from: pair[1], to: pair[0], progress: 0, speed: 0.02 });
        }

        for (let i = signals.length - 1; i >= 0; i--) {
            const s = signals[i];
            s.progress += s.speed;
            
            if (s.progress >= 1) {
                signals.splice(i, 1);
                continue;
            }

            const c1 = cubes[s.from];
            const c2 = cubes[s.to];
            const y1 = c1.y + Math.sin(time + c1.phase) * 10;
            const y2 = c2.y + Math.sin(time + c2.phase) * 10;
            
            const p1 = project(c1.x, y1, c1.z);
            const p2 = project(c2.x, y2, c2.z);

            const sx = p1.x + (p2.x - p1.x) * s.progress;
            const sy = p1.y + (p2.y - p1.y) * s.progress;

            // Glowing Effect
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(sx, sy, 2, 0, Math.PI*2);
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        // 3. Draw Cubes
        ctx.lineJoin = 'round'; // Smooth corners
        ctx.lineCap = 'round';
        
        sortedCubes.forEach(cube => {
            const { projected, size, idx } = cube;
            
            // Get Vertices in 2D
            const verts = getCubeVertices(cube.size).map(v => 
                project(cube.x + v.x, cube.actualY + v.y, cube.z + v.z)
            );

            // Cube Faces (Indices for quads)
            const rawFaces = [
                [0, 1, 2, 3], // Front
                [1, 5, 6, 2], // Right
                [5, 4, 7, 6], // Back
                [4, 0, 3, 7], // Left
                [3, 2, 6, 7], // Top
                [4, 5, 1, 0]  // Bottom
            ];

            // Sort faces by Z-depth (Painters Algorithm)
            const facesWithDepth = rawFaces.map(indices => {
                const zDepth = (verts[indices[0]].z + verts[indices[1]].z + verts[indices[2]].z + verts[indices[3]].z) / 4;
                return { indices, zDepth };
            });

            // Draw furthest faces first
            facesWithDepth.sort((a, b) => b.zDepth - a.zDepth);

            ctx.strokeStyle = COLOR_ACCENT;
            ctx.fillStyle = COLOR_FILL;
            ctx.lineWidth = 1.5; // Thicker lines for visibility
            
            // Draw Edges & Fill
            facesWithDepth.forEach(faceObj => {
                const face = faceObj.indices;
                ctx.beginPath();
                ctx.moveTo(verts[face[0]].x, verts[face[0]].y);
                ctx.lineTo(verts[face[1]].x, verts[face[1]].y);
                ctx.lineTo(verts[face[2]].x, verts[face[2]].y);
                ctx.lineTo(verts[face[3]].x, verts[face[3]].y);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            });

            // Draw "Texture" (Internal random lines on surface)
            ctx.strokeStyle = 'rgba(255,255,255,0.25)';
            ctx.lineWidth = 0.5;
            const details = cubeDetails[idx];
            ctx.beginPath();
            details.forEach(line => {
                ctx.moveTo(verts[line.s].x, verts[line.s].y);
                ctx.lineTo(verts[line.e].x, verts[line.e].y);
            });
            ctx.stroke();

            // Glow dots on vertices
            ctx.fillStyle = '#ffffff';
            verts.forEach(v => {
                ctx.fillRect(v.x - 1.5, v.y - 1.5, 3, 3);
            });
        });

        animationId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
        if (!canvas) return;
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block"
      />
    </div>
  );
};

export default NeuralNetwork;