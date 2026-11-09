import React, { useEffect, useRef } from 'react';

export default function Hero({ onOpenTalk }) {
  const canvasRef = useRef(null);

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

    const nodeCount = 64;
    const radius = 175;
    const fov = 380;
    const maxLineDist = 85;
    let rotX = 0.2;
    let rotY = 0.4;
    let rotZ = 0.1;
    let pulseTimer = 0;

    let targetRotX = 0;
    let targetRotY = 0;

    const nodes = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < nodeCount; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);
      nodes.push({
        x0: Math.sin(phi) * Math.cos(theta) * radius,
        y0: Math.sin(phi) * Math.sin(theta) * radius,
        z0: Math.cos(phi) * radius,
        x: 0,
        y: 0,
        z: 0,
        projX: 0,
        projY: 0,
        scale: 1,
        size: 2.2 + Math.random() * 2.2,
        pulsePhase: Math.random() * Math.PI * 2,
        isCore: i % 5 === 0
      });
    }

    const badges = [
      { text: 'AI Neural Engine', angle: 0, orbitR: radius * 1.35, tilt: 0.25, color: '#FFD477', icon: '✦' },
      { text: 'Zero-Latency Core', angle: (2 * Math.PI) / 3, orbitR: radius * 1.4, tilt: -0.3, color: '#F9BE4A', icon: '⚡' },
      { text: 'Cloud Scale Arch', angle: (4 * Math.PI) / 3, orbitR: radius * 1.3, tilt: 0.4, color: '#FFD477', icon: '☁' }
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
      targetRotY = nx * 0.6;
      targetRotX = -ny * 0.6;
    };

    const handleMouseLeave = () => {
      targetRotX = 0;
      targetRotY = 0;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      rotX += (targetRotX - (rotX - 0.2)) * 0.05 + 0.0008;
      rotY += (targetRotY - (rotY - 0.4)) * 0.05 + 0.003;
      pulseTimer += 0.02;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      ctx.clearRect(0, 0, width, height);

      // Glow backdrop
      const grad = ctx.createRadialGradient(centerX, centerY, 30, centerX, centerY, radius * 1.5);
      grad.addColorStop(0, 'rgba(249, 190, 74, 0.16)');
      grad.addColorStop(0.45, 'rgba(16, 70, 56, 0.28)');
      grad.addColorStop(1, 'rgba(6, 59, 48, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Project nodes
      nodes.forEach((n) => {
        const rot = rotatePoint(n, cosX, sinX, cosY, sinY);
        n.x = rot.x;
        n.y = rot.y;
        n.z = rot.z;
        n.scale = fov / (fov + rot.z);
        n.projX = centerX + rot.x * n.scale;
        n.projY = centerY + rot.y * n.scale;
      });

      // Connections
      for (let i = 0; i < nodeCount; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodeCount; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dz = n1.z - n2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < maxLineDist) {
            const avgZ = (n1.z + n2.z) / 2;
            const depthAlpha = Math.max(0.08, (avgZ + radius) / (2 * radius));
            const alpha = (1 - dist / maxLineDist) * depthAlpha * 0.65;
            ctx.beginPath();
            ctx.moveTo(n1.projX, n1.projY);
            ctx.lineTo(n2.projX, n2.projY);
            ctx.strokeStyle = `rgba(249, 190, 74, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // Draw Nodes
      nodes.forEach((n) => {
        const alpha = Math.max(0.2, (n.z + radius) / (2 * radius));
        const r = n.size * n.scale;
        ctx.beginPath();
        ctx.arc(n.projX, n.projY, r, 0, Math.PI * 2);
        ctx.fillStyle = n.isCore ? `rgba(255, 255, 255, ${alpha})` : `rgba(249, 190, 74, ${alpha * 0.95})`;
        ctx.fill();
      });

      // Orbiting Badges
      badges.forEach((b, idx) => {
        b.angle += 0.005 * (idx % 2 === 0 ? 1 : -0.85);
        const bx = Math.cos(b.angle) * b.orbitR;
        const by = Math.sin(b.angle * 1.3) * 35 + b.tilt * radius;
        const bz = Math.sin(b.angle) * b.orbitR;
        const rot = rotatePoint({ x0: bx, y0: by, z0: bz }, cosX, sinX, cosY, sinY);
        const scale = fov / (fov + rot.z);
        const px = centerX + rot.x * scale;
        const py = centerY + rot.y * scale;
        const bAlpha = Math.max(0.25, (rot.z + radius * 1.2) / (radius * 2.4));

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

        ctx.fillStyle = 'rgba(16, 70, 56, 0.9)';
        ctx.strokeStyle = b.color;
        ctx.lineWidth = 1.2;
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
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="hero-section" id="home">
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
              <a href="#services" className="btn-gold">
                <span>Explore Our Services</span>
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

          <div className="hero-visual-wrapper">
            <div className="hero-canvas-container" title="Interactive 3D Technology Sphere - Move cursor to rotate">
              <canvas ref={canvasRef} id="hero-3d-canvas" width="550" height="550" aria-label="Interactive 3D glowing golden digital sphere representing NexFero neural technology network"></canvas>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

