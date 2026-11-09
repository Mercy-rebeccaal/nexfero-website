/**
 * NexFero Innovations - 3D Interactive Digital Sphere & Neural Network Canvas
 * 
 * Features:
 * - 3D Geodesic particle sphere with true 3D rotation matrices & perspective projection
 * - Dynamic golden connection lines with electric signal pulses
 * - Concentric data orbital rings with glowing satellite beacons
 * - Floating interactive AI telemetry tags anchored to 3D space
 * - Interactive mouse parallax with smooth damping (lerp)
 * - High performance 60FPS rendering with auto-pause when out of viewport
 */

(function () {
  'use strict';

  const canvas = document.getElementById('hero-3d-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Configuration
  const config = {
    nodeCount: 64,
    radius: 175,
    fov: 380,
    maxLineDist: 85,
    pulseSpeed: 0.02,
    baseRotSpeedX: 0.0018,
    baseRotSpeedY: 0.0035,
    colors: {
      deepEmerald: '#063B30',
      emeraldCard: '#104638',
      accentGold: '#F9BE4A',
      lightGold: '#FFD477',
      brightWhite: '#FFFFFF',
      circuitFade: 'rgba(249, 190, 74, '
    }
  };

  let width = (canvas.width = canvas.parentElement.clientWidth || 550);
  let height = (canvas.height = canvas.parentElement.clientHeight || 550);
  let centerX = width / 2;
  let centerY = height / 2;

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mouse interaction state
  let mouse = {
    x: 0,
    y: 0,
    targetRotX: 0,
    targetRotY: 0,
    isHovering: false
  };

  // Rotation angles
  let rotX = 0.2;
  let rotY = 0.4;
  let rotZ = 0.1;

  // Generate 3D nodes evenly distributed across a sphere (Fibonacci lattice)
  const nodes = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;

  for (let i = 0; i < config.nodeCount; i++) {
    const theta = 2 * Math.PI * i / goldenRatio;
    const phi = Math.acos(1 - 2 * (i + 0.5) / config.nodeCount);

    const x = Math.sin(phi) * Math.cos(theta);
    const y = Math.sin(phi) * Math.sin(theta);
    const z = Math.cos(phi);

    nodes.push({
      x0: x * config.radius,
      y0: y * config.radius,
      z0: z * config.radius,
      x: 0,
      y: 0,
      z: 0,
      projX: 0,
      projY: 0,
      projScale: 1,
      size: 2.2 + Math.random() * 2.2,
      pulsePhase: Math.random() * Math.PI * 2,
      isCore: i % 5 === 0
    });
  }

  // Floating AI Badges anchored in 3D orbit
  const badges = [
    { text: 'AI Neural Engine', angle: 0, orbitR: config.radius * 1.35, tilt: 0.25, color: '#FFD477', icon: '✦' },
    { text: 'Zero-Latency Core', angle: (2 * Math.PI) / 3, orbitR: config.radius * 1.4, tilt: -0.3, color: '#F9BE4A', icon: '⚡' },
    { text: 'Cloud Scale Arch', angle: (4 * Math.PI) / 3, orbitR: config.radius * 1.3, tilt: 0.4, color: '#FFD477', icon: '☁' }
  ];

  // Ambient floating background particles
  const ambientParticles = [];
  for (let i = 0; i < 35; i++) {
    ambientParticles.push({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: (Math.random() - 0.5) * 300,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.8 + 0.8,
      alpha: Math.random() * 0.6 + 0.2
    });
  }

  // Handle Resize
  function handleResize() {
    if (!canvas.parentElement) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    width = canvas.width = Math.min(rect.width, 600) || 520;
    height = canvas.height = Math.min(rect.height, 600) || 520;
    centerX = width / 2;
    centerY = height / 2;
  }

  window.addEventListener('resize', handleResize);

  // Mouse Listener on Hero Section
  const heroSection = document.getElementById('home') || canvas.parentElement;
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      mouse.targetRotY = nx * 0.6;
      mouse.targetRotX = -ny * 0.6;
      mouse.isHovering = true;
    });

    heroSection.addEventListener('mouseleave', () => {
      mouse.targetRotX = 0;
      mouse.targetRotY = 0;
      mouse.isHovering = false;
    });
  }

  // Visibility Optimization (Pause when offscreen)
  let isVisible = true;
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(canvas);
  }

  // 3D Matrix Math & Projection
  function rotate3D(point, cosX, sinX, cosY, sinY, cosZ, sinZ) {
    // Yaw (Y axis)
    let x1 = point.x0 * cosY + point.z0 * sinY;
    let y1 = point.y0;
    let z1 = -point.x0 * sinY + point.z0 * cosY;

    // Pitch (X axis)
    let x2 = x1;
    let y2 = y1 * cosX - z1 * sinX;
    let z2 = y1 * sinX + z1 * cosX;

    // Roll (Z axis)
    let x3 = x2 * cosZ - y2 * sinZ;
    let y3 = x2 * sinZ + y2 * cosZ;
    let z3 = z2;

    return { x: x3, y: y3, z: z3 };
  }

  function project(x, y, z) {
    const scale = config.fov / (config.fov + z);
    return {
      x: centerX + x * scale,
      y: centerY + y * scale,
      scale: scale,
      depth: (z + config.radius) / (2 * config.radius) // 0 to 1
    };
  }

  // Draw Background Glowing Aura
  function drawGlowBackdrop() {
    const grad = ctx.createRadialGradient(
      centerX, centerY, 30,
      centerX, centerY, config.radius * 1.5
    );
    grad.addColorStop(0, 'rgba(249, 190, 74, 0.16)');
    grad.addColorStop(0.45, 'rgba(16, 70, 56, 0.28)');
    grad.addColorStop(1, 'rgba(6, 59, 48, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, config.radius * 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw Orbital Golden Rings
  let ringAngle = 0;
  function drawOrbitalRings(cosX, sinX, cosY, sinY) {
    ringAngle += prefersReducedMotion ? 0.002 : 0.008;

    // Outer Equator Ring
    ctx.save();
    ctx.beginPath();
    const ringSteps = 48;
    for (let i = 0; i <= ringSteps; i++) {
      const a = (i / ringSteps) * Math.PI * 2 + ringAngle;
      const rx = Math.cos(a) * (config.radius * 1.25);
      const rz = Math.sin(a) * (config.radius * 1.25);
      const ry = Math.sin(a * 2) * 15; // wave ripple

      const rot = rotate3D({ x0: rx, y0: ry, z0: rz }, cosX, sinX, cosY, sinY, 1, 0);
      const proj = project(rot.x, rot.y, rot.z);

      if (i === 0) ctx.moveTo(proj.x, proj.y);
      else ctx.lineTo(proj.x, proj.y);
    }
    ctx.strokeStyle = 'rgba(255, 212, 119, 0.35)';
    ctx.lineWidth = 1.4;
    ctx.setLineDash([4, 6]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // Polar Data Ring
    ctx.save();
    ctx.beginPath();
    for (let i = 0; i <= ringSteps; i++) {
      const a = (i / ringSteps) * Math.PI * 2 - ringAngle * 0.7;
      const rx = Math.sin(a * 1.5) * 12;
      const ry = Math.cos(a) * (config.radius * 1.18);
      const rz = Math.sin(a) * (config.radius * 1.18);

      const rot = rotate3D({ x0: rx, y0: ry, z0: rz }, cosX, sinX, cosY, sinY, 1, 0);
      const proj = project(rot.x, rot.y, rot.z);

      if (i === 0) ctx.moveTo(proj.x, proj.y);
      else ctx.lineTo(proj.x, proj.y);
    }
    ctx.strokeStyle = 'rgba(249, 190, 74, 0.22)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  }

  // Animation Loop
  let lastTime = performance.now();
  let pulseTimer = 0;

  function render(time) {
    if (!isVisible) {
      requestAnimationFrame(render);
      return;
    }

    const delta = (time - lastTime) / 1000;
    lastTime = time;
    pulseTimer += config.pulseSpeed;

    // Smooth Damping to target mouse rotation
    const lerpFactor = 0.05;
    rotX += (mouse.targetRotX - (rotX - 0.2)) * lerpFactor;
    rotY += (mouse.targetRotY - (rotY - 0.4)) * lerpFactor;

    if (!prefersReducedMotion) {
      rotY += config.baseRotSpeedY;
      rotX += config.baseRotSpeedX * 0.5;
    }

    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const cosZ = Math.cos(rotZ);
    const sinZ = Math.sin(rotZ);

    ctx.clearRect(0, 0, width, height);

    // Draw background aura
    drawGlowBackdrop();

    // Update Ambient Particles
    ambientParticles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -width / 2) p.x = width / 2;
      if (p.x > width / 2) p.x = -width / 2;
      if (p.y < -height / 2) p.y = height / 2;
      if (p.y > height / 2) p.y = -height / 2;

      const px = centerX + p.x;
      const py = centerY + p.y;
      ctx.fillStyle = `rgba(255, 212, 119, ${p.alpha * 0.4})`;
      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw Orbital Rings
    drawOrbitalRings(cosX, sinX, cosY, sinY);

    // Rotate & Project all sphere nodes
    nodes.forEach(node => {
      const rot = rotate3D(node, cosX, sinX, cosY, sinY, cosZ, sinZ);
      node.x = rot.x;
      node.y = rot.y;
      node.z = rot.z;

      const p = project(node.x, node.y, node.z);
      node.projX = p.x;
      node.projY = p.y;
      node.projScale = p.scale;
      node.depth = p.depth;
    });

    // Draw Connection Lines between nearby nodes
    const nodeCount = nodes.length;
    for (let i = 0; i < nodeCount; i++) {
      const n1 = nodes[i];
      for (let j = i + 1; j < nodeCount; j++) {
        const n2 = nodes[j];

        // 3D Euclidean distance
        const dx = n1.x - n2.x;
        const dy = n1.y - n2.y;
        const dz = n1.z - n2.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < config.maxLineDist) {
          const avgZ = (n1.z + n2.z) / 2;
          const depthAlpha = Math.max(0.08, (avgZ + config.radius) / (2 * config.radius));
          const distFactor = 1 - dist / config.maxLineDist;
          const alpha = distFactor * depthAlpha * 0.65;

          ctx.beginPath();
          ctx.moveTo(n1.projX, n1.projY);
          ctx.lineTo(n2.projX, n2.projY);

          // Pulse highlight if electric wave passes
          const wave = Math.sin(pulseTimer * 3 + (n1.pulsePhase + n2.pulsePhase)) * 0.5 + 0.5;
          if (wave > 0.88 && depthAlpha > 0.4) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 1.8})`;
            ctx.lineWidth = 1.8;
          } else {
            ctx.strokeStyle = `${config.colors.circuitFade}${alpha})`;
            ctx.lineWidth = 0.9;
          }
          ctx.stroke();
        }
      }
    }

    // Sort nodes by Z depth so back nodes are drawn first
    nodes.slice().sort((a, b) => a.z - b.z).forEach(node => {
      const pulse = Math.sin(pulseTimer * 2 + node.pulsePhase) * 0.4 + 0.6;
      const alpha = Math.max(0.2, (node.z + config.radius) / (2 * config.radius));
      const radius = node.size * node.projScale * (node.isCore ? 1.4 : 1);

      // Node Glow for front nodes
      if (node.z > 0 && node.isCore) {
        ctx.beginPath();
        ctx.arc(node.projX, node.projY, radius * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249, 190, 74, ${alpha * 0.22 * pulse})`;
        ctx.fill();
      }

      // Main Node Dot
      ctx.beginPath();
      ctx.arc(node.projX, node.projY, radius, 0, Math.PI * 2);
      ctx.fillStyle = node.isCore
        ? `rgba(255, 255, 255, ${alpha})`
        : `rgba(249, 190, 74, ${alpha * 0.95})`;
      ctx.fill();

      // Golden Ring around key core nodes
      if (node.isCore && alpha > 0.6) {
        ctx.beginPath();
        ctx.arc(node.projX, node.projY, radius * 1.9, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 212, 119, ${alpha * 0.75})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // Orbiting Floating AI Badges
    badges.forEach((b, idx) => {
      b.angle += prefersReducedMotion ? 0.001 : 0.005 * (idx % 2 === 0 ? 1 : -0.85);

      const bx = Math.cos(b.angle) * b.orbitR;
      const by = Math.sin(b.angle * 1.3) * 35 + b.tilt * config.radius;
      const bz = Math.sin(b.angle) * b.orbitR;

      const rot = rotate3D({ x0: bx, y0: by, z0: bz }, cosX, sinX, cosY, sinY, 1, 0);
      const proj = project(rot.x, rot.y, rot.z);

      // Only render badge sharply if in front or middle
      const badgeAlpha = Math.max(0.25, (rot.z + config.radius * 1.2) / (config.radius * 2.4));

      ctx.save();
      ctx.globalAlpha = Math.min(1, badgeAlpha * 1.2);

      // Connecting faint tether to closest center
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(proj.x, proj.y);
      ctx.strokeStyle = `rgba(249, 190, 74, ${badgeAlpha * 0.18})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Badge Container Pill
      const text = `${b.icon} ${b.text}`;
      ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
      const textMetrics = ctx.measureText(text);
      const padX = 14;
      const padY = 7;
      const boxW = textMetrics.width + padX * 2;
      const boxH = 26;
      const boxX = proj.x - boxW / 2;
      const boxY = proj.y - boxH / 2;

      // Glassmorphic pill fill & gold border
      ctx.fillStyle = 'rgba(16, 70, 56, 0.88)';
      ctx.strokeStyle = b.color;
      ctx.lineWidth = 1.2;

      // Rounded rect pill
      const r = 13;
      ctx.beginPath();
      ctx.moveTo(boxX + r, boxY);
      ctx.lineTo(boxX + boxW - r, boxY);
      ctx.quadraticCurveTo(boxX + boxW, boxY, boxX + boxW, boxY + r);
      ctx.lineTo(boxX + boxW, boxY + boxH - r);
      ctx.quadraticCurveTo(boxX + boxW, boxY + boxH, boxX + boxW - r, boxY + boxH);
      ctx.lineTo(boxX + r, boxY + boxH);
      ctx.quadraticCurveTo(boxX, boxY + boxH, boxX, boxY + boxH - r);
      ctx.lineTo(boxX, boxY + r);
      ctx.quadraticCurveTo(boxX, boxY, boxX + r, boxY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Badge Text
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(text, boxX + padX, boxY + 17);

      ctx.restore();
    });

    requestAnimationFrame(render);
  }

  // Initialize
  handleResize();
  requestAnimationFrame(render);
})();

