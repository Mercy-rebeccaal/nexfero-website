import React, { useEffect, useRef, useState } from 'react';

export default function Hero({ onOpenTalk }) {
  const canvasRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight || 800;
      const progress = Math.min(1.8, scrollY / (windowH * 0.9));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.parentElement.clientWidth || 550);
    let height = (canvas.height = canvas.parentElement.clientHeight || 550);
    let centerX = width / 2;
    let centerY = height / 2;

    const nodeCount = 72;
    const baseRadius = 160;
    const fov = 380;
    const maxLineDist = 90;
    let rotX = 0.25;
    let rotY = 0.45;
    let pulseTimer = 0;

    let targetRotX = 0;
    let targetRotY = 0;

    const nodes = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < nodeCount; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);
      nodes.push({
        x0: Math.sin(phi) * Math.cos(theta),
        y0: Math.sin(phi) * Math.sin(theta),
        z0: Math.cos(phi),
        x: 0,
        y: 0,
        z: 0,
        projX: 0,
        projY: 0,
        scale: 1,
        size: 2.2 + Math.random() * 2.4,
        pulsePhase: Math.random() * Math.PI * 2,
        isCore: i % 4 === 0,
        isGold: i % 3 === 0
      });
    }

    const badges = [
      { text: 'AI Neural Systems', angle: 0, orbitR: 1.45, tilt: 0.25, color: '#00DF81', icon: '✦' },
      { text: 'Full-Stack Architecture', angle: (2 * Math.PI) / 3, orbitR: 1.5, tilt: -0.3, color: '#F9BE4A', icon: '⚡' },
      { text: 'Emerging Technologies', angle: (4 * Math.PI) / 3, orbitR: 1.4, tilt: 0.35, color: '#2CC295', icon: '☁' }
    ];

    const rotatePoint = (p, cosX, sinX, cosY, sinY) => {
      const x1 = p.x0 * cosY + p.z0 * sinY;
      const y1 = p.y0;
      const z1 = -p.x0 * sinY + p.z0 * cosY;
      const x2 = x1;
      const y2 = y1 * cosX - z1 * sinX;
      const z2 = y1 * sinX + z1 * cosX;
      return { x: x2, y: y2, z: z2 };
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      targetRotY = nx * 0.7;
      targetRotX = -ny * 0.7;
    };

    const handleMouseLeave = () => {
      targetRotX = 0;
      targetRotY = 0;
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || 550;
      height = canvas.height = canvas.parentElement.clientHeight || 550;
      centerX = width / 2;
      centerY = height / 2;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      rotX += (targetRotX - (rotX - 0.2)) * 0.05 + 0.001;
      rotY += (targetRotY - (rotY - 0.4)) * 0.05 + 0.0035;
      pulseTimer += 0.02;

      // Dynamic cinematic scroll zoom multiplier
      const currentScrollScale = 1 + scrollProgress * 0.45;
      const currentRadius = baseRadius * currentScrollScale;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      ctx.clearRect(0, 0, width, height);

      // Deep glowing emerald backdrop
      const grad = ctx.createRadialGradient(centerX, centerY, 20 * currentScrollScale, centerX, centerY, currentRadius * 1.6);
      grad.addColorStop(0, 'rgba(0, 223, 129, 0.22)');
      grad.addColorStop(0.35, 'rgba(3, 98, 76, 0.35)');
      grad.addColorStop(0.7, 'rgba(3, 34, 33, 0.2)');
      grad.addColorStop(1, 'rgba(0, 15, 15, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // Outer Tesseract Ring
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(pulseTimer * 0.2);
      ctx.strokeStyle = 'rgba(44, 194, 149, 0.22)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([8, 12]);
      ctx.beginPath();
      ctx.ellipse(0, 0, currentRadius * 1.35, currentRadius * 0.55, pulseTimer * 0.1, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Project nodes with scale
      nodes.forEach((n) => {
        const rawPt = { x0: n.x0 * currentRadius, y0: n.y0 * currentRadius, z0: n.z0 * currentRadius };
        const rot = rotatePoint(rawPt, cosX, sinX, cosY, sinY);
        n.x = rot.x;
        n.y = rot.y;
        n.z = rot.z;
        n.scale = fov / (fov + rot.z);
        n.projX = centerX + rot.x * n.scale;
        n.projY = centerY + rot.y * n.scale;
      });

      // Connections
      const scaledDist = maxLineDist * currentScrollScale;
      for (let i = 0; i < nodeCount; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodeCount; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dz = n1.z - n2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < scaledDist) {
            const avgZ = (n1.z + n2.z) / 2;
            const depthAlpha = Math.max(0.1, (avgZ + currentRadius) / (2 * currentRadius));
            const alpha = (1 - dist / scaledDist) * depthAlpha * 0.75;
            ctx.beginPath();
            ctx.moveTo(n1.projX, n1.projY);
            ctx.lineTo(n2.projX, n2.projY);
            ctx.strokeStyle = n1.isGold || n2.isGold ? `rgba(249, 190, 74, ${alpha})` : `rgba(0, 223, 129, ${alpha})`;
            ctx.lineWidth = 0.95;
            ctx.stroke();
          }
        }
      }

      // Draw Nodes
      nodes.forEach((n) => {
        const alpha = Math.max(0.25, (n.z + currentRadius) / (2 * currentRadius));
        const r = n.size * n.scale;
        ctx.beginPath();
        ctx.arc(n.projX, n.projY, r, 0, Math.PI * 2);
        if (n.isGold) {
          ctx.fillStyle = `rgba(249, 190, 74, ${alpha * 0.95})`;
          ctx.shadowColor = '#F9BE4A';
          ctx.shadowBlur = 6;
        } else if (n.isCore) {
          ctx.fillStyle = `rgba(0, 223, 129, ${alpha})`;
          ctx.shadowColor = '#00DF81';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = `rgba(44, 194, 149, ${alpha * 0.85})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Orbiting Badges
      badges.forEach((b, idx) => {
        b.angle += 0.006 * (idx % 2 === 0 ? 1 : -0.85);
        const bx = Math.cos(b.angle) * currentRadius * b.orbitR;
        const by = Math.sin(b.angle * 1.3) * 35 + b.tilt * currentRadius;
        const bz = Math.sin(b.angle) * currentRadius * b.orbitR;
        const rot = rotatePoint({ x0: bx, y0: by, z0: bz }, cosX, sinX, cosY, sinY);
        const scale = fov / (fov + rot.z);
        const px = centerX + rot.x * scale;
        const py = centerY + rot.y * scale;
        const bAlpha = Math.max(0.3, (rot.z + currentRadius * 1.2) / (currentRadius * 2.4));

        ctx.save();
        ctx.globalAlpha = Math.min(1, bAlpha * 1.2);
        ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
        const text = `${b.icon} ${b.text}`;
        const tw = ctx.measureText(text).width;
        const padX = 14;
        const padY = 7;
        const boxW = tw + padX * 2;
        const boxH = 26;
        const boxX = px - boxW / 2;
        const boxY = py - boxH / 2;

        ctx.fillStyle = 'rgba(3, 34, 33, 0.92)';
        ctx.strokeStyle = b.color;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxW, boxH, 13);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(text, boxX + padX, boxY + 17);
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [scrollProgress]);

  return (
    <section className="hero-section cinematic-hero" id="home">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              <span>EMPOWERING FUTURE ENTERPRISES</span>
            </div>

            <h1 className="hero-title">
              Building Tomorrow Through <span className="gold-gradient-text">Intelligent Technology.</span>
            </h1>

            <p className="hero-description">
              NexFero Innovations transforms ambitious ideas into intelligent digital solutions through AI, modern software engineering and creative technology.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn-gold">
                <span>Explore Our Projects</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V8H8"/></svg>
              </a>
              <a href="#contact" className="btn-outline-gold" onClick={onOpenTalk}>
                <span>Let's Talk</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </a>
            </div>

            <div className="hero-meta-strip">
              <div className="hero-meta-item">
                <span className="hero-meta-label">Location</span>
                <span className="hero-meta-value">Chennai, India</span>
              </div>
              <div className="hero-meta-item">
                <span className="hero-meta-label">Core Paradigm</span>
                <span className="hero-meta-value">AI & Full-Stack Systems</span>
              </div>
              <div className="hero-meta-item">
                <span className="hero-meta-label">Brand Creed</span>
                <span className="hero-meta-value">Beyond Ideas. Beyond Limits.</span>
              </div>
            </div>
          </div>

          <div
            className="hero-visual-wrapper cinematic-visual-container"
            style={{
              transform: `scale(${1 + scrollProgress * 0.12})`,
              transition: 'transform 0.15s ease-out'
            }}
          >
            <div className="hero-canvas-container" title="Cinematic 3D Emerald Sphere - Scales on scroll, rotates with mouse">
              <canvas
                ref={canvasRef}
                id="hero-3d-canvas"
                width="550"
                height="550"
                aria-label="Interactive 3D glowing emerald digital sphere representing NexFero neural technology network"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
