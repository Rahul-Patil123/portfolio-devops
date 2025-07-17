import { useEffect, useRef } from 'react';
import '../styles/SkyCanvas.css';

export default function SkyCanvas() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let animationFrameId;
    const stars = [];
    const comets = [];

    // Create stars
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.5,
        alpha: Math.random(),
        delta: Math.random() * 0.02 + 0.005,
      });
    }

    function spawnComet() {
      comets.push({
        x: Math.random() * width,
        y: -50,
        vx: 2 + Math.random() * 2,
        vy: 2 + Math.random() * 2,
        length: 100,
        opacity: 1,
      });
    }

    let lastCometTime = 0;

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Draw stars
      stars.forEach((star) => {
        star.alpha += star.delta;
        if (star.alpha <= 0 || star.alpha >= 1) {
          star.delta = -star.delta;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      });

      // Draw comets
      comets.forEach((comet, i) => {
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(
          comet.x,
          comet.y,
          comet.x - comet.length,
          comet.y - comet.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${comet.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.moveTo(comet.x, comet.y);
        ctx.lineTo(comet.x - comet.length, comet.y - comet.length);
        ctx.stroke();

        comet.x += comet.vx;
        comet.y += comet.vy;
        comet.opacity -= 0.005;

        if (comet.opacity <= 0) {
          comets.splice(i, 1);
        }
      });

      // Occasionally spawn comets
      if (performance.now() - lastCometTime > 7000) {
        if (Math.random() < 0.5) spawnComet();
        lastCometTime = performance.now();
      }

      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    // Handle resize
    function handleResize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="sky-canvas" />;
}
