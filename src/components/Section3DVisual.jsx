import React, { useEffect, useRef } from 'react';

/**
 * Section3DVisual - Interactive 3D Canvas Visual Engine
 * Renders distinct 3D models for each section and project.
 */
export default function Section3DVisual({ type = 'hero-tesseract', zoom = 1, width = 360, height = 220, className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let w = (canvas.width = canvas.parentElement?.clientWidth || width);
    let h = (canvas.height = canvas.parentElement?.clientHeight || height);
    let cx = w / 2;
    let cy = h / 2;

    let mouseX = 0;
    let mouseY = 0;
    let rotX = 0.2;
    let rotY = 0.3;
    let time = 0;

    const handleResize = () => {
      if (!canvas.parentElement) return;
      w = canvas.width = canvas.parentElement.clientWidth || width;
      h = canvas.height = canvas.parentElement.clientHeight || height;
      cx = w / 2;
      cy = h / 2;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      mouseX = nx * 0.4;
      mouseY = -ny * 0.4;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // 3D Point Projection Helper
    const project = (x, y, z, fov = 350) => {
      const scale = (fov / (fov + z)) * zoom;
      return {
        x: cx + x * scale,
        y: cy + y * scale,
        scale,
        depth: (z + 200) / 400
      };
    };

    // 3D Rotation Helper
    const rotate3D = (p, rx, ry) => {
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);

      // Y-axis rotation
      const x1 = p.x * cosY + p.z * sinY;
      const y1 = p.y;
      const z1 = -p.x * sinY + p.z * cosY;

      // X-axis rotation
      const x2 = x1;
      const y2 = y1 * cosX - z1 * sinX;
      const z2 = y1 * sinX + z1 * cosX;

      return { x: x2, y: y2, z: z2 };
    };

    const render = () => {
      time += 0.02;
      rotX += (mouseY - (rotX - 0.2)) * 0.05 + 0.003;
      rotY += (mouseX - (rotY - 0.4)) * 0.05 + 0.008;

      ctx.clearRect(0, 0, w, h);

      // Subtle radial glow background
      const glowGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.min(w, h) * 0.6);
      glowGrad.addColorStop(0, 'rgba(0, 223, 129, 0.12)');
      glowGrad.addColorStop(0.6, 'rgba(3, 98, 76, 0.05)');
      glowGrad.addColorStop(1, 'rgba(0, 15, 15, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, w, h);

      // ==========================================
      // SPECIFIC 3D RENDERERS BY TYPE
      // ==========================================
      if (type === 'vr-classroom') {
        // Project 1: VR Headset + Orbiting Atomic Science Rings
        const r = 50;
        ctx.strokeStyle = '#2CC295';
        ctx.lineWidth = 2;

        // Headset 3D Cuboid
        const boxVerts = [
          { x: -45, y: -20, z: -25 }, { x: 45, y: -20, z: -25 },
          { x: 45, y: 20, z: -25 }, { x: -45, y: 20, z: -25 },
          { x: -40, y: -18, z: 25 }, { x: 40, y: -18, z: 25 },
          { x: 40, y: 18, z: 25 }, { x: -40, y: 18, z: 25 }
        ];

        const pVerts = boxVerts.map(v => project(rotate3D(v, rotX, rotY).x, rotate3D(v, rotX, rotY).y, rotate3D(v, rotX, rotY).z));
        const edges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];

        ctx.beginPath();
        edges.forEach(([i, j]) => {
          ctx.moveTo(pVerts[i].x, pVerts[i].y);
          ctx.lineTo(pVerts[j].x, pVerts[j].y);
        });
        ctx.stroke();

        // Orbiting Atomic Nucleus
        for (let a = 0; a < 3; a++) {
          const orbitAngle = time + a * (Math.PI / 3);
          const ox = Math.cos(orbitAngle) * (r * 1.5);
          const oz = Math.sin(orbitAngle) * (r * 1.5);
          const oy = Math.sin(orbitAngle * 2) * 20;
          const pr = project(rotate3D({ x: ox, y: oy, z: oz }, rotX, rotY).x, rotate3D({ x: ox, y: oy, z: oz }, rotX, rotY).y, rotate3D({ x: ox, y: oy, z: oz }, rotX, rotY).z);
          ctx.beginPath();
          ctx.arc(pr.x, pr.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#00DF81';
          ctx.fill();
        }
      } else if (type === 'smart-cane') {
        // Project 2: Smart Cane with 360° Radar Cone & Ultrasonic Waves
        const caneLength = 80;
        const top = project(rotate3D({ x: 0, y: -caneLength / 2, z: 0 }, rotX, rotY).x, rotate3D({ x: 0, y: -caneLength / 2, z: 0 }, rotX, rotY).y, rotate3D({ x: 0, y: -caneLength / 2, z: 0 }, rotX, rotY).z);
        const btm = project(rotate3D({ x: 0, y: caneLength / 2, z: 0 }, rotX, rotY).x, rotate3D({ x: 0, y: caneLength / 2, z: 0 }, rotX, rotY).y, rotate3D({ x: 0, y: caneLength / 2, z: 0 }, rotX, rotY).z);

        // Cane Shaft
        ctx.strokeStyle = '#F1F7F6';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(top.x, top.y);
        ctx.lineTo(btm.x, btm.y);
        ctx.stroke();

        // Top 360° Sensor Hub with Pulsing Emerald Radar Waves
        ctx.beginPath();
        ctx.arc(top.x, top.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#00DF81';
        ctx.fill();

        // Concentric Radar Waves
        for (let wave = 1; wave <= 3; wave++) {
          const waveRadius = ((time * 30 + wave * 25) % 80);
          const alpha = 1 - waveRadius / 80;
          ctx.beginPath();
          ctx.arc(top.x, top.y, waveRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 223, 129, ${alpha * 0.7})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      } else if (type === 'traffic-signals') {
        // Project 3: Smart Traffic Signal Pillar & Green Wave Data Grid
        const poleTop = project(rotate3D({ x: -40, y: -50, z: 0 }, rotX, rotY).x, rotate3D({ x: -40, y: -50, z: 0 }, rotX, rotY).y, rotate3D({ x: -40, y: -50, z: 0 }, rotX, rotY).z);
        const poleBtm = project(rotate3D({ x: -40, y: 50, z: 0 }, rotX, rotY).x, rotate3D({ x: -40, y: 50, z: 0 }, rotX, rotY).y, rotate3D({ x: -40, y: 50, z: 0 }, rotX, rotY).z);

        ctx.strokeStyle = '#707D7D';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(poleTop.x, poleTop.y);
        ctx.lineTo(poleBtm.x, poleBtm.y);
        ctx.stroke();

        // 3 Signal Beacons (Red, Amber, Caribbean Green)
        [-20, 0, 20].forEach((offsetY, idx) => {
          const lightPos = project(rotate3D({ x: -40, y: -30 + offsetY, z: 10 }, rotX, rotY).x, rotate3D({ x: -40, y: -30 + offsetY, z: 10 }, rotX, rotY).y, rotate3D({ x: -40, y: -30 + offsetY, z: 10 }, rotX, rotY).z);
          ctx.beginPath();
          ctx.arc(lightPos.x, lightPos.y, 6, 0, Math.PI * 2);
          ctx.fillStyle = idx === 2 ? '#00DF81' : idx === 1 ? 'rgba(249, 190, 74, 0.4)' : 'rgba(239, 68, 68, 0.3)';
          ctx.fill();
        });

        // Dynamic Green Wave Perspective Road Grid
        for (let i = 0; i < 5; i++) {
          const zOffset = ((time * 40 + i * 30) % 150) - 75;
          const p1 = project(rotate3D({ x: 0, y: 35, z: zOffset }, rotX, rotY).x, rotate3D({ x: 0, y: 35, z: zOffset }, rotX, rotY).y, rotate3D({ x: 0, y: 35, z: zOffset }, rotX, rotY).z);
          const p2 = project(rotate3D({ x: 80, y: 35, z: zOffset }, rotX, rotY).x, rotate3D({ x: 80, y: 35, z: zOffset }, rotX, rotY).y, rotate3D({ x: 80, y: 35, z: zOffset }, rotX, rotY).z);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = 'rgba(0, 223, 129, 0.6)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      } else if (type === 'event-stage') {
        // Project 4: Amphitheater Event Stage & Registration Portal
        const radius = 60;
        ctx.strokeStyle = '#2CC295';
        ctx.lineWidth = 1.5;

        for (let ring = 1; ring <= 3; ring++) {
          ctx.beginPath();
          for (let deg = 0; deg <= 180; deg += 20) {
            const rad = (deg * Math.PI) / 180;
            const px = Math.cos(rad) * (radius * (ring * 0.35 + 0.3));
            const pz = Math.sin(rad) * (radius * (ring * 0.35 + 0.3));
            const py = -ring * 12 + 25;
            const pr = project(rotate3D({ x: px, y: py, z: pz }, rotX, rotY).x, rotate3D({ x: px, y: py, z: pz }, rotX, rotY).y, rotate3D({ x: px, y: py, z: pz }, rotX, rotY).z);
            if (deg === 0) ctx.moveTo(pr.x, pr.y);
            else ctx.lineTo(pr.x, pr.y);
          }
          ctx.stroke();
        }

        // Stage Platform
        const stageP = project(rotate3D({ x: 0, y: 25, z: 0 }, rotX, rotY).x, rotate3D({ x: 0, y: 25, z: 0 }, rotX, rotY).y, rotate3D({ x: 0, y: 25, z: 0 }, rotX, rotY).z);
        ctx.beginPath();
        ctx.arc(stageP.x, stageP.y, 16, 0, Math.PI * 2);
        ctx.fillStyle = '#00DF81';
        ctx.fill();
      } else if (type === 'ai-resume') {
        // Project 5: Floating AI Resume Sheet with Synapse Scanning Laser
        const sheetVerts = [
          { x: -30, y: -45, z: 0 }, { x: 30, y: -45, z: 0 },
          { x: 30, y: 45, z: 0 }, { x: -30, y: 45, z: 0 }
        ];
        const pVerts = sheetVerts.map(v => project(rotate3D(v, rotX, rotY).x, rotate3D(v, rotX, rotY).y, rotate3D(v, rotX, rotY).z));

        ctx.fillStyle = 'rgba(6, 48, 40, 0.85)';
        ctx.strokeStyle = '#2CC295';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(pVerts[0].x, pVerts[0].y);
        ctx.lineTo(pVerts[1].x, pVerts[1].y);
        ctx.lineTo(pVerts[2].x, pVerts[2].y);
        ctx.lineTo(pVerts[3].x, pVerts[3].y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Horizontal resume line bars
        for (let l = 1; l <= 5; l++) {
          const ly = -35 + l * 14;
          const l1 = project(rotate3D({ x: -20, y: ly, z: 2 }, rotX, rotY).x, rotate3D({ x: -20, y: ly, z: 2 }, rotX, rotY).y, rotate3D({ x: -20, y: ly, z: 2 }, rotX, rotY).z);
          const l2 = project(rotate3D({ x: 18, y: ly, z: 2 }, rotX, rotY).x, rotate3D({ x: 18, y: ly, z: 2 }, rotX, rotY).y, rotate3D({ x: 18, y: ly, z: 2 }, rotX, rotY).z);
          ctx.beginPath();
          ctx.moveTo(l1.x, l1.y);
          ctx.lineTo(l2.x, l2.y);
          ctx.strokeStyle = '#00DF81';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Scanning Laser Bar
        const scanY = Math.sin(time * 3) * 35;
        const s1 = project(rotate3D({ x: -32, y: scanY, z: 6 }, rotX, rotY).x, rotate3D({ x: -32, y: scanY, z: 6 }, rotX, rotY).y, rotate3D({ x: -32, y: scanY, z: 6 }, rotX, rotY).z);
        const s2 = project(rotate3D({ x: 32, y: scanY, z: 6 }, rotX, rotY).x, rotate3D({ x: 32, y: scanY, z: 6 }, rotX, rotY).y, rotate3D({ x: 32, y: scanY, z: 6 }, rotX, rotY).z);
        ctx.beginPath();
        ctx.moveTo(s1.x, s1.y);
        ctx.lineTo(s2.x, s2.y);
        ctx.strokeStyle = '#FFD477';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      } else if (type === 'blood-donation') {
        // Project 6: Blood Drop & Medical Cross Telemetry Interface
        const heartP = project(rotate3D({ x: 0, y: -10, z: 0 }, rotX, rotY).x, rotate3D({ x: 0, y: -10, z: 0 }, rotX, rotY).y, rotate3D({ x: 0, y: -10, z: 0 }, rotX, rotY).z);

        // Medical Cross
        ctx.fillStyle = '#00DF81';
        ctx.fillRect(heartP.x - 6, heartP.y - 24, 12, 48);
        ctx.fillRect(heartP.x - 24, heartP.y - 6, 48, 12);

        // ECG Pulse Line
        ctx.beginPath();
        ctx.strokeStyle = '#F1F7F6';
        ctx.lineWidth = 2;
        const ecgPoints = [-50, -30, -15, 0, 10, 20, 35, 50];
        ecgPoints.forEach((px, idx) => {
          const py = idx === 3 ? -25 : idx === 4 ? 20 : Math.sin(time * 4 + idx) * 3;
          const pt = project(rotate3D({ x: px, y: py + 30, z: 0 }, rotX, rotY).x, rotate3D({ x: px, y: py + 30, z: 0 }, rotX, rotY).y, rotate3D({ x: px, y: py + 30, z: 0 }, rotX, rotY).z);
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();
      } else if (type === 'lms-books') {
        // Project 7: Digital Books & Floating Graduation Cap
        const capTop = project(rotate3D({ x: 0, y: -35, z: 0 }, rotX, rotY).x, rotate3D({ x: 0, y: -35, z: 0 }, rotX, rotY).y, rotate3D({ x: 0, y: -35, z: 0 }, rotX, rotY).z);
        // Mortarboard Diamond
        const d1 = project(rotate3D({ x: 0, y: -35, z: -30 }, rotX, rotY).x, rotate3D({ x: 0, y: -35, z: -30 }, rotX, rotY).y, rotate3D({ x: 0, y: -35, z: -30 }, rotX, rotY).z);
        const d2 = project(rotate3D({ x: 35, y: -35, z: 0 }, rotX, rotY).x, rotate3D({ x: 35, y: -35, z: 0 }, rotX, rotY).y, rotate3D({ x: 35, y: -35, z: 0 }, rotX, rotY).z);
        const d3 = project(rotate3D({ x: 0, y: -35, z: 30 }, rotX, rotY).x, rotate3D({ x: 0, y: -35, z: 30 }, rotX, rotY).y, rotate3D({ x: 0, y: -35, z: 30 }, rotX, rotY).z);
        const d4 = project(rotate3D({ x: -35, y: -35, z: 0 }, rotX, rotY).x, rotate3D({ x: -35, y: -35, z: 0 }, rotX, rotY).y, rotate3D({ x: -35, y: -35, z: 0 }, rotX, rotY).z);

        ctx.fillStyle = 'rgba(3, 98, 76, 0.8)';
        ctx.strokeStyle = '#F9BE4A';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(d1.x, d1.y);
        ctx.lineTo(d2.x, d2.y);
        ctx.lineTo(d3.x, d3.y);
        ctx.lineTo(d4.x, d4.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // 3 Stacked Books Below
        for (let b = 0; b < 3; b++) {
          const by = 5 + b * 14;
          const b1 = project(rotate3D({ x: -35, y: by, z: -20 }, rotX, rotY).x, rotate3D({ x: -35, y: by, z: -20 }, rotX, rotY).y, rotate3D({ x: -35, y: by, z: -20 }, rotX, rotY).z);
          const b2 = project(rotate3D({ x: 35, y: by, z: -20 }, rotX, rotY).x, rotate3D({ x: 35, y: by, z: -20 }, rotX, rotY).y, rotate3D({ x: 35, y: by, z: -20 }, rotX, rotY).z);
          const b3 = project(rotate3D({ x: 35, y: by + 8, z: 20 }, rotX, rotY).x, rotate3D({ x: 35, y: by + 8, z: 20 }, rotX, rotY).y, rotate3D({ x: 35, y: by + 8, z: 20 }, rotX, rotY).z);
          const b4 = project(rotate3D({ x: -35, y: by + 8, z: 20 }, rotX, rotY).x, rotate3D({ x: -35, y: by + 8, z: 20 }, rotX, rotY).y, rotate3D({ x: -35, y: by + 8, z: 20 }, rotX, rotY).z);

          ctx.fillStyle = b === 0 ? '#0B453A' : b === 1 ? '#03624C' : '#00DF81';
          ctx.strokeStyle = '#2CC295';
          ctx.beginPath();
          ctx.moveTo(b1.x, b1.y);
          ctx.lineTo(b2.x, b2.y);
          ctx.lineTo(b3.x, b3.y);
          ctx.lineTo(b4.x, b4.y);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
      } else if (type === 'ai-brain') {
        // AI & Machine Learning Service: 3D Neural Cortex Node System
        const nodes = [];
        const count = 18;
        for (let i = 0; i < count; i++) {
          const theta = i * ((Math.PI * 2) / count);
          const nx = Math.sin(theta) * 45;
          const ny = Math.cos(theta * 2) * 25;
          const nz = Math.cos(theta) * 45;
          nodes.push(project(rotate3D({ x: nx, y: ny, z: nz }, rotX, rotY).x, rotate3D({ x: nx, y: ny, z: nz }, rotX, rotY).y, rotate3D({ x: nx, y: ny, z: nz }, rotX, rotY).z));
        }

        ctx.strokeStyle = 'rgba(0, 223, 129, 0.4)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (let i = 0; i < count; i++) {
          for (let j = i + 1; j < count; j++) {
            if (j - i <= 3 || j - i === count - 1) {
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
            }
          }
        }
        ctx.stroke();

        nodes.forEach(n => {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#00DF81';
          ctx.fill();
        });
      } else {
        // Default / Hero Tesseract: 3D Emerald Polyhedron Core with Concentric Energy Rings
        const size = 65;
        const verts = [
          { x: -size, y: -size, z: -size }, { x: size, y: -size, z: -size },
          { x: size, y: size, z: -size }, { x: -size, y: size, z: -size },
          { x: -size, y: -size, z: size }, { x: size, y: -size, z: size },
          { x: size, y: size, z: size }, { x: -size, y: size, z: size }
        ];

        const pVerts = verts.map(v => project(rotate3D(v, rotX, rotY).x, rotate3D(v, rotX, rotY).y, rotate3D(v, rotX, rotY).z));
        const edges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];

        ctx.strokeStyle = 'rgba(0, 223, 129, 0.75)';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        edges.forEach(([i, j]) => {
          ctx.moveTo(pVerts[i].x, pVerts[i].y);
          ctx.lineTo(pVerts[j].x, pVerts[j].y);
        });
        ctx.stroke();

        // Inner glowing golden core
        const core = project(rotate3D({ x: 0, y: 0, z: 0 }, rotX, rotY).x, rotate3D({ x: 0, y: 0, z: 0 }, rotX, rotY).y, rotate3D({ x: 0, y: 0, z: 0 }, rotX, rotY).z);
        ctx.beginPath();
        ctx.arc(core.x, core.y, 14 * zoom, 0, Math.PI * 2);
        ctx.fillStyle = '#FFD477';
        ctx.shadowColor = '#00DF81';
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Concentric Orbital Rings
        for (let ring = 1; ring <= 2; ring++) {
          ctx.beginPath();
          const rSteps = 24;
          for (let s = 0; s <= rSteps; s++) {
            const rad = (s / rSteps) * Math.PI * 2 + time * (ring === 1 ? 1 : -0.8);
            const rx = Math.cos(rad) * (size * 1.5);
            const rz = Math.sin(rad) * (size * 1.5);
            const ry = Math.sin(rad * 2) * 15;
            const pt = project(rotate3D({ x: rx, y: ry, z: rz }, rotX, rotY).x, rotate3D({ x: rx, y: ry, z: rz }, rotX, rotY).y, rotate3D({ x: rx, y: ry, z: rz }, rotX, rotY).z);
            if (s === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
          ctx.strokeStyle = ring === 1 ? 'rgba(0, 223, 129, 0.45)' : 'rgba(249, 190, 74, 0.35)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [type, zoom, width, height]);

  return (
    <div className={`section-3d-visual-card ${className}`}>
      <canvas ref={canvasRef} className="section-3d-canvas"></canvas>
    </div>
  );
}

