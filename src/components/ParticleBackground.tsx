'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  baseRadius: number;
  vx: number;
  vy: number;
  opacity: number;
  minOpacity: number;
  maxOpacity: number;
  opacitySpeed: number;
  opacityDirection: number;
  isAccent: boolean;
}

interface Shockwave {
  x: number;
  y: number;
  startTime: number;
  maxRadius: number;
  duration: number;
}

interface Meteor {
  startX: number;
  startY: number;
  angle: number;
  length: number;
  speed: number;
  startTime: number;
  duration: number;
}

const BUBBLE_RADIUS = 200; // Hover dissipation zone
const SHOCKWAVE_DURATION = 500; // ms
const SHOCKWAVE_MAX_RADIUS = 300;

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isDark = document.documentElement.classList.contains('dark');
    let prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const particles: Particle[] = [];
    const shockwaves: Shockwave[] = [];
    const meteors: Meteor[] = [];
    const mouse = { x: -9999, y: -9999 };

    let nextMeteorTime = performance.now() + 500;

    function initParticles() {
      particles.length = 0;
      meteors.length = 0;
      const area = width * height;

      // Both modes use balanced density so the NASA particle field is clean and subtle
      const divisor = isDark ? 11000 : 12000;
      const minCount = isDark ? 45 : 35;
      const maxCount = isDark ? 160 : 100;

      const count = prefersReducedMotion
        ? (isDark ? 35 : 20)
        : Math.min(maxCount, Math.max(minCount, Math.floor(area / divisor)));

      for (let i = 0; i < count; i++) {
        const isAccent = Math.random() < 0.4;
        // Refined smaller pinpoint dots:
        // Dark mode: fine stardust (0.6px to 1.7px)
        // Light mode: clean celestial micro-dots (0.6px to 1.35px)
        const radiusScale = isDark
          ? Math.random() * 1.1 + 0.6
          : Math.random() * 0.75 + 0.6;
        const baseRadius = radiusScale * dpr;

        // In light mode: subtly darker & balanced opacity (0.20 to 0.58) so dots are clearly noticeable but subtle
        // In dark mode: crisp high-contrast starlight (0.12 to 0.95)
        const minOpacity = isDark
          ? Math.random() * 0.15 + 0.12
          : Math.random() * 0.08 + 0.20;

        const maxOpacity = isDark
          ? Math.random() * 0.35 + 0.60
          : Math.random() * 0.12 + 0.46;

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseRadius,
          vx: (Math.random() - 0.5) * 0.35 * dpr,
          vy: (Math.random() - 0.5) * 0.35 * dpr,
          opacity: Math.random() * (maxOpacity - minOpacity) + minOpacity,
          minOpacity,
          maxOpacity,
          opacitySpeed: Math.random() * 0.006 + 0.003,
          opacityDirection: Math.random() < 0.5 ? 1 : -1,
          isAccent,
        });
      }
    }

    function handleResize() {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      initParticles();
    }

    handleResize();

    // Watch dark mode toggle and smoothly re-initialize
    const themeObserver = new MutationObserver(() => {
      const nextIsDark = document.documentElement.classList.contains('dark');
      if (nextIsDark !== isDark) {
        isDark = nextIsDark;
        initParticles();
      }
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Watch reduced-motion changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      initParticles();
    };
    motionQuery.addEventListener('change', handleMotionChange);

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handleClick = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        startTime: performance.now(),
        maxRadius: SHOCKWAVE_MAX_RADIUS,
        duration: SHOCKWAVE_DURATION,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Animation Loop
    function render(now: number) {
      if (!ctx || !canvas) return;

      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Clean expired shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        if (now - shockwaves[i].startTime > shockwaves[i].duration) {
          shockwaves.splice(i, 1);
        }
      }

      // ----------------------------------------------------
      // 1. Meteor Shower Spawner & Renderer
      // ----------------------------------------------------
      if (!prefersReducedMotion && now >= nextMeteorTime && meteors.length < 5) {
        const angle = (215 + (Math.random() - 0.5) * 18) * (Math.PI / 180);
        const startX = Math.random() * (width * 1.05) + (width * 0.1);
        const startY = Math.random() * (height * 0.6) - 50;
        const speed = Math.random() * 5 + 7;
        const duration = Math.random() * 400 + 850;
        const length = (isDark ? Math.random() * 70 + 110 : Math.random() * 50 + 85);

        meteors.push({
          startX,
          startY,
          angle,
          length: length * dpr,
          speed,
          startTime: now,
          duration,
        });

        // Frequent meteor cadence: next one every 1.2 to 2.5 seconds
        nextMeteorTime = now + Math.random() * 1300 + 1200;
      }

      // Draw active meteors
      for (let mIdx = meteors.length - 1; mIdx >= 0; mIdx--) {
        const m = meteors[mIdx];
        const elapsed = now - m.startTime;
        const progress = elapsed / m.duration;

        if (progress >= 1) {
          meteors.splice(mIdx, 1);
          continue;
        }

        const distanceTravelled = m.speed * (elapsed / 16.6);
        const currentX = (m.startX + Math.cos(m.angle) * distanceTravelled) * dpr;
        const currentY = (m.startY + Math.sin(m.angle) * distanceTravelled) * dpr;

        // Opacity envelope
        let alpha = progress < 0.2 ? progress / 0.2 : (1 - progress) / 0.8;
        const peakAlpha = isDark ? 0.88 : 0.40;
        alpha *= peakAlpha;

        if (alpha <= 0.01) continue;

        const tailX = currentX - Math.cos(m.angle) * m.length;
        const tailY = currentY - Math.sin(m.angle) * m.length;

        const meteorHead = isDark ? '255, 255, 255' : '99, 112, 214';
        const meteorTail = isDark ? '154, 166, 255' : '147, 158, 238';

        const grad = ctx.createLinearGradient(currentX, currentY, tailX, tailY);
        grad.addColorStop(0, `rgba(${meteorHead}, ${alpha.toFixed(3)})`);
        grad.addColorStop(0.3, `rgba(${meteorTail}, ${(alpha * 0.45).toFixed(3)})`);
        grad.addColorStop(1, `rgba(${meteorTail}, 0)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = (isDark ? 1.6 : 1.0) * dpr;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(currentX, currentY);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(currentX, currentY, (isDark ? 1.7 : 1.0) * dpr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${meteorHead}, ${alpha.toFixed(3)})`;
        ctx.fill();
      }

      // ----------------------------------------------------
      // 2. NASA Circular Particles (Subtle in both Light & Dark)
      // ----------------------------------------------------
      // In dark mode: crisp stardust + lavender accent
      // In light mode: refined slate-600 + royal periwinkle (subtly darker, crisp & non-intrusive)
      const colorPrimary = isDark ? '241, 240, 235' : '75, 85, 102';
      const colorAccent = isDark ? '154, 166, 255' : '60, 78, 185';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Position update (drift)
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Shockwave repulse calculation
          for (let s = 0; s < shockwaves.length; s++) {
            const sw = shockwaves[s];
            const elapsed = now - sw.startTime;
            const progress = elapsed / sw.duration;
            const currentWaveRadius = progress * sw.maxRadius;
            const dx = p.x - sw.x;
            const dy = p.y - sw.y;
            const dist = Math.hypot(dx, dy);

            const distDiff = Math.abs(dist - currentWaveRadius);
            if (distDiff < 60 && dist > 0.01) {
              const pushFactor = (1 - distDiff / 60) * (1 - progress) * 3.2 * dpr;
              p.x += (dx / dist) * pushFactor;
              p.y += (dy / dist) * pushFactor;
            }
          }

          // Screen wrap-around
          if (p.x < -20) p.x = width + 20;
          else if (p.x > width + 20) p.x = -20;

          if (p.y < -20) p.y = height + 20;
          else if (p.y > height + 20) p.y = -20;
        }

        // Opacity twinkle animation
        p.opacity += p.opacitySpeed * p.opacityDirection;
        if (p.opacity >= p.maxOpacity) {
          p.opacity = p.maxOpacity;
          p.opacityDirection = -1;
        } else if (p.opacity <= p.minOpacity) {
          p.opacity = p.minOpacity;
          p.opacityDirection = 1;
        }

        // Hover "bubble" dissipation calculation
        let renderRadius = p.baseRadius;
        let renderAlpha = p.opacity;

        if (mouse.x > -1000) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < BUBBLE_RADIUS) {
            const factor = Math.max(0, dist / BUBBLE_RADIUS);
            renderRadius *= Math.pow(factor, 0.8);
            renderAlpha *= factor;
          }
        }

        if (renderAlpha <= 0.01 || renderRadius <= 0.1) continue;

        const rgb = p.isAccent ? colorAccent : colorPrimary;
        const px = p.x * dpr;
        const py = p.y * dpr;

        // Render clean subtle circular dot (identical mechanism in both modes)
        ctx.beginPath();
        ctx.arc(px, py, renderRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${renderAlpha.toFixed(3)})`;
        ctx.fill();

        // Subtle atmospheric halo for prominent stars in dark mode only
        if (isDark && p.baseRadius > 1.35 * dpr && renderAlpha > 0.45) {
          ctx.beginPath();
          ctx.arc(px, py, renderRadius * 2.0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb}, ${(renderAlpha * 0.18).toFixed(3)})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      themeObserver.disconnect();
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
