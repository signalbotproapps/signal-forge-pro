import { useState, useRef } from 'react';
import type { MouseEvent } from 'react';
import { 
	Download, 
	CheckCircle, 
	AlertTriangle,
} from 'lucide-react';
import type { AppLink } from '../data/appLinks';

interface AppCard3DProps {
	app: AppLink;
	onDownloadClick: (url: string, label: string) => void;
	baseUrl: string;
}

export default function AppCard3D({ app, onDownloadClick, baseUrl }: AppCard3DProps) {
	const cardRef = useRef<HTMLDivElement | null>(null);
	const [rotateX, setRotateX] = useState(0);
	const [rotateY, setRotateY] = useState(0);
	const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current) return;
		const rect = cardRef.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		const rX = -((y - centerY) / centerY) * 10;
		const rY = ((x - centerX) / centerX) * 10;

		setRotateX(rX);
		setRotateY(rY);
		setGlarePosition({
			x: (x / rect.width) * 100,
			y: (y / rect.height) * 100,
		});
	};

	const handleMouseEnter = () => setIsHovered(true);

	const handleMouseLeave = () => {
		setIsHovered(false);
		setRotateX(0);
		setRotateY(0);
	};

	const resolveUrl = (path: string) => {
		if (path.startsWith('http')) return path;
		const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
		const cleanPath = path.startsWith('/') ? path : `/${path}`;
		return `${cleanBase}${cleanPath}`;
	};

	const isGrok = app.id === 'grok-desk';
	const isAndroid = app.platform === 'Android';

	return (
		<div
			ref={cardRef}
			onMouseMove={handleMouseMove}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className="group relative flex flex-col justify-between rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.07] via-[#090e1d]/90 to-[#060a14] p-6 lg:p-7 shadow-2xl transition-all duration-300 preserve-3d"
			style={{
				transform: isHovered
					? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
					: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
				boxShadow: isHovered
					? `0 20px 45px -15px ${app.glowColor}`
					: '0 10px 30px -10px rgba(0,0,0,0.5)',
			}}
		>
			{/* Dynamic Glare Reflection Overlay */}
			{isHovered && (
				<div
					className="pointer-events-none absolute inset-0 rounded-3xl opacity-30 transition-opacity duration-300"
					style={{
						background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)`,
					}}
				/>
			)}

			{/* Top Bar with Icon & Badge */}
			<div>
				<div className="flex items-start justify-between gap-4">
					<div className="flex items-center gap-3">
						<div
							className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/20 p-0.5 shadow-lg"
							style={{ backgroundColor: `${app.accentColor}15` }}
						>
							<img
								src={resolveUrl(app.iconImage)}
								alt={`${app.name} icon`}
								className="h-full w-full rounded-xl object-cover"
							/>
						</div>
						<div>
							<span
								className="text-[11px] font-bold uppercase tracking-wider font-mono-numbers"
								style={{ color: app.accentColor }}
							>
								{app.category}
							</span>
							<h3 className="text-xl font-bold text-white font-display leading-tight">{app.name}</h3>
						</div>
					</div>

					{app.badge && (
						<span
							className="rounded-full px-3 py-1 text-xs font-semibold tracking-wide border shadow-sm"
							style={{
								backgroundColor: `${app.accentColor}20`,
								borderColor: `${app.accentColor}50`,
								color: app.accentColor,
							}}
						>
							{app.badge}
						</span>
					)}
				</div>

				<p className="mt-3 text-sm text-slate-300 font-medium">{app.tagline}</p>
				<p className="mt-2 text-xs leading-relaxed text-slate-400">{app.description}</p>

				{/* 3D App Visual Mockup */}
				<div className="mt-5 relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 group-hover:border-white/25 transition-all">
					<div className="relative aspect-[16/10] w-full overflow-hidden">
						<img
							src={resolveUrl(app.previewImage)}
							alt={`${app.name} preview`}
							className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-[#060a14] via-transparent to-transparent opacity-80" />
						
						{/* Floating pill badge on preview */}
						<div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono-numbers">
							<span className="rounded-lg bg-black/70 backdrop-blur-md px-2.5 py-1 text-slate-200 border border-white/10">
								{app.version} • {app.size}
							</span>
							<span className="rounded-lg bg-black/70 backdrop-blur-md px-2.5 py-1 font-semibold border border-white/10" style={{ color: app.accentColor }}>
								{app.platform}
							</span>
						</div>
					</div>
				</div>

				{/* Feature Highlights */}
				<ul className="mt-5 space-y-2 text-xs text-slate-300">
					{app.highlights.map((feature, idx) => (
						<li key={idx} className="flex items-start gap-2">
							<CheckCircle
								size={14}
								className="mt-0.5 shrink-0"
								style={{ color: app.accentColor }}
							/>
							<span>{feature}</span>
						</li>
					))}
				</ul>

				{/* Android Beta Notice if mobile */}
				{isAndroid && (
					<div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200 flex items-start gap-2">
						<AlertTriangle size={15} className="mt-0.5 shrink-0 text-amber-400" />
						<span>
							<strong className="text-amber-300">Android Beta:</strong> Keep app in the foreground to prevent OS battery optimization from suspending live Binance order automation.
						</span>
					</div>
				)}
			</div>

			{/* Footer CTA & Download Button */}
			<div className="mt-6 pt-4 border-t border-white/10">
				<div className="flex items-center justify-between gap-3">
					<div className="text-[11px] text-slate-400">
						<span className="block font-mono-numbers text-slate-500">System Req:</span>
						<span className="truncate max-w-[140px] block" title={app.minSpecs}>{app.minSpecs.split(',')[0]}</span>
					</div>

					<button
						type="button"
						onClick={() => onDownloadClick(app.href, `${app.name} (${app.platform})`)}
						className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:brightness-110 active:scale-95 shadow-lg"
						style={{
							backgroundColor: app.accentColor,
							color: '#050811',
							boxShadow: `0 0 20px -3px ${app.glowColor}`,
						}}
					>
						<Download size={15} />
						Download {app.platform === 'Android' ? 'APK' : 'Setup'}
					</button>
				</div>
			</div>
		</div>
	);
}
