import { useEffect, useRef } from 'react';

export default function CyberCanvasBackground() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let animationFrameId: number;
		let width = (canvas.width = window.innerWidth);
		let height = (canvas.height = window.innerHeight);

		let mouseX = width / 2;
		let mouseY = height / 2;
		let targetMouseX = width / 2;
		let targetMouseY = height / 2;

		const handleResize = () => {
			if (!canvas) return;
			width = canvas.width = window.innerWidth;
			height = canvas.height = window.innerHeight;
		};

		const handleMouseMove = (e: MouseEvent) => {
			targetMouseX = e.clientX;
			targetMouseY = e.clientY;
		};

		window.addEventListener('resize', handleResize);
		window.addEventListener('mousemove', handleMouseMove, { passive: true });

		// Generate 3D perspective particle cloud
		const particleCount = Math.min(100, Math.floor(width / 16));
		const particles: Array<{
			x: number;
			y: number;
			z: number;
			origZ: number;
			color: string;
			size: number;
			speed: number;
		}> = [];

		const colors = [
			'rgba(0, 245, 155, ', // Emerald
			'rgba(0, 212, 255, ', // Cyan
			'rgba(168, 85, 247, ', // Violet (Grok)
			'rgba(245, 158, 11, ', // Amber
		];

		for (let i = 0; i < particleCount; i++) {
			particles.push({
				x: (Math.random() - 0.5) * width * 1.5,
				y: (Math.random() - 0.5) * height * 1.5,
				z: Math.random() * 800 + 100,
				origZ: Math.random() * 800 + 100,
				color: colors[Math.floor(Math.random() * colors.length)],
				size: Math.random() * 2 + 1,
				speed: Math.random() * 0.8 + 0.3,
			});
		}

		// Floating 3D holographic candlesticks in the background
		const candlesticks: Array<{
			x: number;
			y: number;
			w: number;
			h: number;
			wickH: number;
			bullish: boolean;
			speedY: number;
			alpha: number;
		}> = [];

		for (let i = 0; i < 18; i++) {
			candlesticks.push({
				x: Math.random() * width,
				y: Math.random() * height,
				w: Math.random() * 12 + 6,
				h: Math.random() * 50 + 20,
				wickH: Math.random() * 90 + 50,
				bullish: Math.random() > 0.45,
				speedY: (Math.random() * 0.3 + 0.1) * (Math.random() > 0.5 ? 1 : -1),
				alpha: Math.random() * 0.18 + 0.05,
			});
		}

		let time = 0;

		const render = () => {
			time += 0.01;
			// Smooth mouse lerp
			mouseX += (targetMouseX - mouseX) * 0.05;
			mouseY += (targetMouseY - mouseY) * 0.05;

			const offsetX = (mouseX - width / 2) * 0.12;
			const offsetY = (mouseY - height / 2) * 0.12;

			ctx.clearRect(0, 0, width, height);

			// Render subtle floating 3D Candlesticks in background depth
			candlesticks.forEach((candle) => {
				candle.y += candle.speedY;
				if (candle.y < -100) candle.y = height + 80;
				if (candle.y > height + 100) candle.y = -80;

				const renderX = candle.x - offsetX * 0.3;
				const renderY = candle.y - offsetY * 0.3;

				ctx.save();
				ctx.globalAlpha = candle.alpha;
				const strokeColor = candle.bullish ? '#00F59B' : '#FF3366';
				ctx.strokeStyle = strokeColor;
				ctx.fillStyle = candle.bullish ? 'rgba(0, 245, 155, 0.25)' : 'rgba(255, 51, 102, 0.25)';

				// Wick
				ctx.lineWidth = 1.5;
				ctx.beginPath();
				ctx.moveTo(renderX + candle.w / 2, renderY - candle.wickH / 2);
				ctx.lineTo(renderX + candle.w / 2, renderY + candle.wickH / 2);
				ctx.stroke();

				// Body
				ctx.fillRect(renderX, renderY - candle.h / 2, candle.w, candle.h);
				ctx.strokeRect(renderX, renderY - candle.h / 2, candle.w, candle.h);
				ctx.restore();
			});

			// Render 3D Perspective Particle Mesh
			const fov = 450;
			const cx = width / 2 + offsetX;
			const cy = height / 2 + offsetY;

			// Project and draw particles
			const projected: Array<{ px: number; py: number; scale: number; color: string; size: number }> = [];

			for (let i = 0; i < particles.length; i++) {
				const p = particles[i];
				p.z -= p.speed;
				if (p.z <= 20) {
					p.z = 850;
					p.x = (Math.random() - 0.5) * width * 1.5;
					p.y = (Math.random() - 0.5) * height * 1.5;
				}

				const scale = fov / (fov + p.z);
				const px = cx + p.x * scale;
				const py = cy + p.y * scale;

				if (px >= 0 && px <= width && py >= 0 && py <= height) {
					projected.push({
						px,
						py,
						scale,
						color: p.color,
						size: p.size * scale * 1.8,
					});

					ctx.beginPath();
					ctx.arc(px, py, Math.max(1, p.size * scale * 1.8), 0, Math.PI * 2);
					const alpha = Math.min(1, Math.max(0.1, (scale - 0.3) * 1.5));
					ctx.fillStyle = `${p.color}${alpha})`;
					ctx.shadowBlur = 12 * scale;
					ctx.shadowColor = p.color + '0.8)';
					ctx.fill();
					ctx.shadowBlur = 0;
				}
			}

			// Draw subtle cybernetic neural link vectors between close particles
			for (let i = 0; i < projected.length; i++) {
				for (let j = i + 1; j < projected.length; j++) {
					const dx = projected[i].px - projected[j].px;
					const dy = projected[i].py - projected[j].py;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < 90) {
						const linkAlpha = (1 - dist / 90) * 0.18 * Math.min(projected[i].scale, projected[j].scale);
						ctx.beginPath();
						ctx.moveTo(projected[i].px, projected[i].py);
						ctx.lineTo(projected[j].px, projected[j].py);
						ctx.strokeStyle = `rgba(0, 212, 255, ${linkAlpha})`;
						ctx.lineWidth = 0.8;
						ctx.stroke();
					}
				}
			}

			animationFrameId = requestAnimationFrame(render);
		};

		render();

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('mousemove', handleMouseMove);
			cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return (
		<div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
			{/* Canvas layer */}
			<canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70" />

			{/* Volumetric glow orbs */}
			<div className="absolute -left-36 top-10 h-96 w-96 rounded-full bg-[#00F59B]/12 blur-[120px] animate-pulse-glow" />
			<div className="absolute -right-36 top-32 h-[30rem] w-[30rem] rounded-full bg-[#A855F7]/12 blur-[140px] animate-float-slow" />
			<div className="absolute left-1/2 top-1/3 h-[28rem] w-[45rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00D4FF]/10 blur-[130px]" />
			<div className="absolute -bottom-20 left-1/4 h-96 w-96 rounded-full bg-[#00F59B]/10 blur-[120px] animate-float-reverse" />

			{/* Perspective Cyber Grid floor overlay */}
			<div className="absolute inset-0 bg-cyber-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

			{/* Subtle vignette */}
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,8,17,0.7)_70%,rgba(5,8,17,0.95)_100%)]" />
		</div>
	);
}
