import { useEffect, useRef } from 'react';

export default function StarIntroCanvas({ onImpact, brandingRef }) {
    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);
        let isMobile = width < 768;

        let comets = [];
        let heroComet = null;
        let animationFrameId;
        let startTime = performance.now();

        const MAX_COMETS = isMobile ? 50 : 120;

        // --- Spawner ---
        function spawnComet() {
            if (comets.length >= MAX_COMETS) return;

            const size = Math.random() * 1.2 + 1;
            const trailLength = 70 + Math.random() * 50;

            // 🎯 Choose a spawn region
            const region = Math.random();
            let startX, startY;

            if (region < 0.7) {
                // Top-right: off-screen
                startX = width + Math.random() * 200;
                startY = -100 - Math.random() * height * 0.5;
            } else {
                // Near hero star / top-center
                startX = width * 0.3 + Math.random() * width * 0.4; // From 30% to 70% of screen width
                startY = -100 - Math.random() * 200;
            }

            const angle = (135 * Math.PI) / 180;
            const speed = 2 + Math.random() * 1.5;

            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;

            // Calculate travel distance to set lifespan
            const endX = -200;
            const endY = height + 200;
            const dx = endX - startX;
            const dy = endY - startY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const lifespan = distance / speed;

            comets.push({
                x: startX,
                y: startY,
                vx,
                vy,
                size,
                length: trailLength,
                opacity: 1,
                life: 0,
                maxLife: lifespan,
            });
        }



        // --- Hero Comet ---
        function launchHero() {
            const imageEl = brandingRef.current?.querySelector('img');
            const rect = imageEl?.getBoundingClientRect();

            if (!rect) return;

            const finalX = rect.left + rect.width / 2;
            const finalY = rect.top + rect.height / 2;

            heroComet = {
                x: width / 2,
                y: -100,
                vx: (finalX - width / 2) / 100,
                vy: (finalY + 100) / 100,
                trail: [],
                age: 0,
                arrived: false,
            };
        }

        // --- Comet Drawing ---
        function drawComet(comet) {
            const { x, y, vx, vy, length, opacity, size } = comet;

            const gradient = ctx.createLinearGradient(x, y, x - vx * length, y - vy * length);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
            gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = size;
            ctx.moveTo(x, y);
            ctx.lineTo(x - vx * length, y - vy * length);
            ctx.stroke();
        }

        // --- Hero Trail + Star Head ---
        function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
            let rot = Math.PI / 2 * 3;
            let step = Math.PI / spikes;
            ctx.beginPath();
            ctx.moveTo(cx, cy - outerRadius);
            for (let i = 0; i < spikes; i++) {
                ctx.lineTo(cx + Math.cos(rot) * outerRadius, cy + Math.sin(rot) * outerRadius);
                rot += step;
                ctx.lineTo(cx + Math.cos(rot) * innerRadius, cy + Math.sin(rot) * innerRadius);
                rot += step;
            }
            ctx.lineTo(cx, cy - outerRadius);
            ctx.closePath();
            ctx.fillStyle = 'white';
            ctx.shadowBlur = 20;
            ctx.shadowColor = 'white';
            ctx.fill();
        }

        function drawHeroComet(hc) {
            hc.trail.push({ x: hc.x, y: hc.y });
            if (hc.trail.length > 50) hc.trail.shift();

            // Trail
            for (let i = 0; i < hc.trail.length - 1; i++) {
                const p1 = hc.trail[i];
                const p2 = hc.trail[i + 1];
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255,255,255,${i / hc.trail.length})`;
                ctx.lineWidth = 3;
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }

            // Star head
            drawStar(ctx, hc.x, hc.y, 5, 10, 4);
        }

        // --- Animation ---
        function draw() {
            ctx.clearRect(0, 0, width, height);

            comets.forEach((comet, i) => {
                comet.x += comet.vx;
                comet.y += comet.vy;
                comet.life++;
                comet.opacity = 1 - comet.life / comet.maxLife;

                drawComet(comet);
                if (comet.life > comet.maxLife) {
                    comets.splice(i, 1);
                }
            });

            if (heroComet) {
                heroComet.x += heroComet.vx;
                heroComet.y += heroComet.vy;
                heroComet.age++;

                drawHeroComet(heroComet);

                if (!heroComet.arrived && heroComet.age > 100) {
                    heroComet.arrived = true;
                    setTimeout(() => onImpact?.(), 200);
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        }

        // --- Setup ---
        const spawnInterval = setInterval(() => {
            if (performance.now() - startTime < 4000) spawnComet();
        }, 80);

        setTimeout(() => {
            launchHero();
        }, 4200);

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            isMobile = width < 768;
        };

        window.addEventListener('resize', resize);
        draw();

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearInterval(spawnInterval);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-50 pointer-events-none"
            style={{ width: '100%', height: '100%' }}
        />
    );
}
