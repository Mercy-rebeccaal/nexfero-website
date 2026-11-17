import React, { useEffect, useState } from 'react';

/**
 * CustomCursor - Premium Glowing Emerald & Gold Desktop Cursor
 * Tracks mouse position with smooth spring physics, hides on touch devices.
 */
export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [follower, setFollower] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let rafId;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: targetX, y: targetY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const isInteractive = target && (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea') ||
        target.closest('.interactive-target')
      );
      setIsHovered(!!isInteractive);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const loop = () => {
      // Smooth lerp for outer ring
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setFollower({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Center precise dot */}
      <div
        className="custom-cursor-dot"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
          pointerEvents: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#00DF81',
          boxShadow: '0 0 10px #00DF81, 0 0 20px #2CC295',
          zIndex: 99999
        }}
      />
      {/* Smooth trailing glow ring */}
      <div
        className={`custom-cursor-ring ${isHovered ? 'hovered' : ''}`}
        style={{
          transform: `translate3d(${follower.x}px, ${follower.y}px, 0) translate(-50%, -50%) scale(${isHovered ? 1.8 : 1})`,
          pointerEvents: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: isHovered ? '1.5px solid #F9BE4A' : '1.5px solid rgba(0, 223, 129, 0.45)',
          background: isHovered ? 'rgba(249, 190, 74, 0.12)' : 'rgba(0, 223, 129, 0.05)',
          boxShadow: isHovered ? '0 0 15px rgba(249, 190, 74, 0.35)' : 'none',
          transition: 'transform 0.15s ease-out, border-color 0.2s ease, background 0.2s ease',
          zIndex: 99998
        }}
      />
    </>
  );
}
