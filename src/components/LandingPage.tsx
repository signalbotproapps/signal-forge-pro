import { useEffect, useState, useMemo } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
	ArrowRight,
	AlertTriangle,
	Bot,
	Cpu,
	Download,
	Globe,
	Lock,
	ShieldCheck,
	TimerOff,
	X,
	Sparkles,
	Zap,
	Layers,
	CheckCircle2,
	Radio,
	CreditCard,
	QrCode,
	Check
} from 'lucide-react';
import CyberCanvasBackground from './CyberCanvasBackground';
import LiveMarketTicker from './LiveMarketTicker';
import InteractiveTerminalSimulator from './InteractiveTerminalSimulator';
import AppCard3D from './AppCard3D';
import PaymentModal, { subscriptionPlans } from './PaymentModal';
import { appLinks, type AppLink } from '../data/appLinks';

const ecosystemCards = [
	{
		name: 'Grok Neural Core',
		tag: 'Next-Gen AI',
		description: 'Multi-modal market reasoning engine analyzing institutional orderflow, liquidity sentiment, and macro volatility signals in real time.',
		accent: 'from-[#A855F7]/30 via-[#EC4899]/15 to-transparent',
		border: 'border-[#A855F7]/30',
		icon: Bot,
		iconColor: '#A855F7',
	},
	{
		name: 'Signal Forge Pro Kernel',
		tag: 'Zero-Latency Engine',
		description: 'The master desktop execution hub. Handles local sub-millisecond order routing, Binance API webhooks, and on-device risk guards.',
		accent: 'from-[#00F59B]/25 via-[#00D4FF]/15 to-transparent',
		border: 'border-[#00F59B]/30',
		icon: Zap,
		iconColor: '#00F59B',
	},
	{
		name: 'Tele Apex Relay',
		tag: 'Lightning Delivery',
		description: 'Encrypted peer-to-peer Telegram bridge delivering instantaneous actionable trade alerts and remote command triggers.',
		accent: 'from-[#00D4FF]/25 via-blue-500/10 to-transparent',
		border: 'border-[#00D4FF]/30',
		icon: Radio,
		iconColor: '#00D4FF',
	},
	{
		name: 'Hardware License Sentinel',
		tag: 'Hardware-Bound',
		description: 'Cryptographically binds software activation to your physical machine ID. Zero telemetry snooping and zero cloud reliance.',
		accent: 'from-[#F59E0B]/25 via-amber-500/10 to-transparent',
		border: 'border-[#F59E0B]/30',
		icon: ShieldCheck,
		iconColor: '#F59E0B',
	},
];

const featureHighlights = [
	{
		title: 'Sub-Millisecond Local Execution',
		description: 'Trade logic executes locally on your hardware. Eliminate cloud network hops, broker slippage, and server outages.',
		icon: TimerOff,
		accent: '#00F59B',
	},
	{
		title: '100% On-Device Data Privacy',
		description: 'Your exchange API keys, trading strategies, and order history never leave your computer. True sovereign algorithmic trading.',
		icon: Lock,
		accent: '#00D4FF',
	},
	{
		title: 'Hardware-Bound Licensing',
		description: 'Each license key validates cryptographically against your local CPU & motherboard fingerprint, ensuring unmatched security.',
		icon: ShieldCheck,
		accent: '#A855F7',
	},
	{
		title: 'Autonomous Grok Intelligence',
		description: 'Harness the cutting edge of deep reasoning AI to detect hidden liquidity pools and institutional order blocks before price explodes.',
		icon: Sparkles,
		accent: '#F59E0B',
	},
];

export default function LandingPage() {
	const [activeFilter, setActiveFilter] = useState<'All' | 'Windows' | 'Android'>('All');
	const [isWaiverOpen, setIsWaiverOpen] = useState(false);
	const [acceptedWaiver, setAcceptedWaiver] = useState(false);
	const [pendingDownloadUrl, setPendingDownloadUrl] = useState<string | null>(null);
	const [pendingDownloadLabel, setPendingDownloadLabel] = useState('');
	
	// Payment Modal State
	const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
	const [selectedPaymentPlanId, setSelectedPaymentPlanId] = useState('6-months');

	const baseUrl = import.meta.env.BASE_URL || '/';

	const resolveUrl = (path: string) => {
		if (path.startsWith('http')) return path;
		const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
		const cleanPath = path.startsWith('/') ? path : `/${path}`;
		return `${cleanBase}${cleanPath}`;
	};

	const filteredApps = useMemo(() => {
		if (activeFilter === 'All') return appLinks;
		return appLinks.filter((app) => app.platform === activeFilter);
	}, [activeFilter]);

	const openWaiver = (url: string, label: string) => {
		setPendingDownloadUrl(url);
		setPendingDownloadLabel(label);
		setAcceptedWaiver(false);
		setIsWaiverOpen(true);
	};

	const openPaymentModal = (planId = '6-months') => {
		setSelectedPaymentPlanId(planId);
		setIsPaymentModalOpen(true);
	};

	const confirmDownload = () => {
		if (!acceptedWaiver || !pendingDownloadUrl) return;
		window.open(pendingDownloadUrl, '_blank', 'noopener,noreferrer');
		setIsWaiverOpen(false);
		setPendingDownloadUrl(null);
		setPendingDownloadLabel('');
	};

	useEffect(() => {
		AOS.init({
			duration: 800,
			easing: 'ease-out-cubic',
			once: true,
			offset: 60,
		});
	}, []);

	return (
		<div className="relative min-h-screen text-slate-100 selection:bg-[#00F59B]/20 selection:text-[#00F59B]">
			{/* Interactive 3D Cyber Canvas Background */}
			<CyberCanvasBackground />

			{/* Sticky Futuristic Navigation Header */}
			<header className="sticky top-0 z-50 border-b border-white/10 bg-[#050811]/85 backdrop-blur-xl transition-all">
				<nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
					{/* Dual Logo Branding */}
					<a href="#" className="flex items-center gap-3 group">
						<div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/20 bg-gradient-to-br from-[#00F59B]/20 to-[#00D4FF]/20 p-1 shadow-[0_0_25px_rgba(0,245,155,0.35)] transition-transform duration-300 group-hover:scale-105">
							<img
								src={resolveUrl('/signal-forge-logo.png')}
								alt="Signal Forge Pro"
								className="h-full w-full object-cover"
							/>
						</div>
						<div className="flex flex-col">
							<div className="flex items-center gap-2">
								<span className="font-display font-extrabold tracking-tight text-white text-base md:text-lg">
									SIGNAL FORGE <span className="text-[#00F59B]">PRO</span>
								</span>
								<span className="rounded bg-[#A855F7]/25 px-1.5 py-0.5 text-[9px] font-bold text-[#D8B4FE] border border-[#A855F7]/40">
									+ GROK DESK
								</span>
							</div>
							<span className="text-[10px] tracking-wider text-slate-400 font-mono-numbers">
								LOCAL-FIRST QUANTUM SUITE
							</span>
						</div>
					</a>

					{/* Navigation Links */}
					<div className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-slate-300">
						<a href="#apps" className="transition hover:text-[#00F59B]">
							Apps Suite (3)
						</a>
						<a href="#terminal" className="transition hover:text-[#00D4FF]">
							Live Terminal
						</a>
						<a href="#grok" className="transition hover:text-[#A855F7] flex items-center gap-1">
							<Sparkles size={13} className="text-[#A855F7]" />
							Grok AI Desk
						</a>
						<a href="#pricing" className="transition hover:text-[#00F59B] flex items-center gap-1">
							<CreditCard size={13} className="text-[#00F59B]" />
							Pricing & Binance Pay
						</a>
						<a href="#ecosystem" className="transition hover:text-white">
							Ecosystem
						</a>
					</div>

					{/* Action Buttons */}
					<div className="flex items-center gap-3">
						<button
							type="button"
							onClick={() => openPaymentModal('6-months')}
							className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3.5 py-2 text-xs font-semibold text-amber-300 transition hover:bg-amber-500/20 hover:text-white"
						>
							<QrCode size={14} className="text-amber-400" />
							Binance Pay
						</button>
						<a
							href="#apps"
							className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00F59B] to-[#00D4FF] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#050811] shadow-[0_0_20px_rgba(0,245,155,0.4)] transition hover:brightness-110 active:scale-95"
						>
							<Download size={14} />
							Get Apps
						</a>
					</div>
				</nav>
			</header>

			{/* Streaming Live Market Ticker */}
			<LiveMarketTicker />

			{/* Main Content Area */}
			<main className="mx-auto flex w-full max-w-7xl flex-col gap-24 px-4 py-12 sm:px-6 lg:px-8">
				{/* Hero Section */}
				<section className="relative pt-6 md:pt-12">
					<div className="grid items-center gap-12 lg:grid-cols-12">
						{/* Left Column: Headlines & Call to Actions */}
						<div data-aos="fade-up" className="lg:col-span-7 space-y-6">
							{/* Futuristic Pill Badge */}
							<div className="inline-flex items-center gap-2.5 rounded-full border border-[#00F59B]/40 bg-[#00F59B]/10 px-4 py-1.5 text-xs font-semibold text-[#00F59B] shadow-[0_0_20px_rgba(0,245,155,0.2)]">
								<span className="relative flex h-2 w-2">
									<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00F59B] opacity-75" />
									<span className="relative inline-flex h-2 w-2 rounded-full bg-[#00F59B]" />
								</span>
								<span className="font-mono-numbers">NEXT-GEN 3-APP QUANT TRADING ECOSYSTEM</span>
							</div>

							<h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
								Trade from a{' '}
								<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F59B] via-[#00D4FF] to-[#A855F7] animate-pulse">
									Different World.
								</span>{' '}
								Pure Local Power.
							</h1>

							<p className="max-w-2xl text-base sm:text-lg leading-relaxed text-slate-300">
								Step beyond traditional cloud latency. Deploy the triad of institutional trading tools:
								<strong className="text-white"> Signal Forge Pro Desktop</strong>, the revolutionary{' '}
								<strong className="text-[#D8B4FE]">Grok Desk AI Workstation</strong>, and the ultra-fast{' '}
								<strong className="text-[#7CEBFF]">Signal Forge Pro Mobile</strong> node.
							</p>

							{/* Key Hero Metrics Bar */}
							<div className="grid grid-cols-3 gap-3 pt-2">
								<div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-md">
									<p className="text-[11px] font-mono-numbers text-slate-400 uppercase">Avg Latency</p>
									<p className="text-xl sm:text-2xl font-black text-[#00F59B] font-display">&lt; 1.8ms</p>
									<p className="text-[10px] text-slate-400">Zero Cloud Hops</p>
								</div>
								<div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-md">
									<p className="text-[11px] font-mono-numbers text-slate-400 uppercase">AI Win Ratio</p>
									<p className="text-xl sm:text-2xl font-black text-[#00D4FF] font-display">89.6%</p>
									<p className="text-[10px] text-slate-400">Grok Neural Core</p>
								</div>
								<div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-md">
									<p className="text-[11px] font-mono-numbers text-slate-400 uppercase">Data Privacy</p>
									<p className="text-xl sm:text-2xl font-black text-[#A855F7] font-display">100%</p>
									<p className="text-[10px] text-slate-400">Hardware Locked</p>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="flex flex-wrap items-center gap-4 pt-4">
								<a
									href="#apps"
									className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#00F59B] to-[#00D4FF] px-6 py-4 text-sm font-bold uppercase tracking-wider text-[#050811] shadow-[0_0_30px_rgba(0,245,155,0.45)] transition hover:brightness-110 active:scale-95"
								>
									<Download size={18} />
									Download 3 Apps
								</a>
								<button
									type="button"
									onClick={() => openPaymentModal('6-months')}
									className="inline-flex items-center justify-center gap-2.5 rounded-2xl border border-amber-500/50 bg-amber-500/10 px-6 py-4 text-sm font-bold uppercase tracking-wider text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.25)] transition hover:bg-amber-500/20 active:scale-95"
								>
									<QrCode size={18} />
									Subscribe via Binance Pay
								</button>
							</div>
						</div>

						{/* Right Column: 3D Holographic Trading Visual */}
						<div data-aos="fade-up" data-aos-delay="200" className="lg:col-span-5 relative">
							{/* Glowing Aura Ring */}
							<div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#00F59B]/20 via-[#00D4FF]/20 to-[#A855F7]/30 blur-2xl opacity-70 animate-pulse-glow" />

							<div className="relative rounded-3xl border border-white/20 bg-gradient-to-b from-white/10 to-black/60 p-3 shadow-2xl backdrop-blur-2xl">
								<div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/15">
									<img
										src={resolveUrl('/images/hero-trading-3d.jpg')}
										alt="3D Holographic Trading Command Station"
										className="h-full w-full object-cover"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-transparent opacity-60" />

									{/* Floating Live Telemetry Overlay Card */}
									<div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/15 bg-black/75 p-3 backdrop-blur-md font-mono-numbers">
										<div className="flex items-center justify-between text-xs mb-1.5">
											<span className="flex items-center gap-1.5 text-white font-semibold">
												<span className="h-2 w-2 rounded-full bg-[#00F59B] animate-ping" />
												GROK DEEP REASONING
											</span>
											<span className="text-[#00F59B] font-bold">+18.4% APY</span>
										</div>
										<p className="text-[11px] text-slate-300 truncate">
											Real-time orderbook depth scanner analyzing 18 pairs concurrently.
										</p>
									</div>
								</div>

								{/* Mini App Thumbnails Row */}
								<div className="mt-3 grid grid-cols-3 gap-2">
									<div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2">
										<div className="h-7 w-7 rounded-lg overflow-hidden shrink-0 border border-white/10">
											<img src={resolveUrl('/signal-forge-logo.png')} alt="" className="h-full w-full object-cover" />
										</div>
										<div className="truncate">
											<p className="text-[10px] font-bold text-white leading-tight truncate">Forge Desktop</p>
											<p className="text-[9px] text-[#00F59B]">v2.4.1 Win</p>
										</div>
									</div>

									<div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2">
										<div className="h-7 w-7 rounded-lg overflow-hidden shrink-0 border border-[#A855F7]/40">
											<img src={resolveUrl('/images/grok-desk-logo.jpg')} alt="" className="h-full w-full object-cover" />
										</div>
										<div className="truncate">
											<p className="text-[10px] font-bold text-white leading-tight truncate">Grok Desk</p>
											<p className="text-[9px] text-[#A855F7]">v1.4.0 Win</p>
										</div>
									</div>

									<div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2">
										<div className="h-7 w-7 rounded-lg overflow-hidden shrink-0 border border-[#00D4FF]/40">
											<img src={resolveUrl('/signal-forge-logo.png')} alt="" className="h-full w-full object-cover" />
										</div>
										<div className="truncate">
											<p className="text-[10px] font-bold text-white leading-tight truncate">Forge Mobile</p>
											<p className="text-[9px] text-[#00D4FF]">v2.4.1 APK</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Interactive Live Terminal Simulator Section */}
				<section id="terminal" data-aos="fade-up" className="space-y-6 pt-6">
					<div className="text-center max-w-3xl mx-auto space-y-3">
						<p className="text-xs uppercase tracking-[0.25em] text-[#00D4FF] font-mono-numbers">
							INTERACTIVE QUANTUM WORKBENCH
						</p>
						<h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
							Experience Real-Time Autonomous Signal Routing
						</h2>
						<p className="text-sm sm:text-base text-slate-300">
							Switch between engines, test live liquidity scans, and watch simulated low-latency trade dispatches in action.
						</p>
					</div>

					<InteractiveTerminalSimulator />
				</section>

				{/* 3 Apps Showcase & Download Hub */}
				<section id="apps" data-aos="fade-up" className="space-y-8 pt-6">
					<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-white/10 pb-6">
						<div>
							<p className="text-xs uppercase tracking-[0.25em] text-[#00F59B] font-mono-numbers">
								OFFICIAL DISTRIBUTION SUITE
							</p>
							<h2 className="font-display mt-2 text-3xl sm:text-4xl font-extrabold text-white">
								Select Your Platform. Deploy Local Control.
							</h2>
							<p className="mt-2 text-sm text-slate-300">
								Choose from our three dedicated trading packages. All setups include on-device encrypted activation.
							</p>
						</div>

						{/* Platform Filter Buttons */}
						<div className="inline-flex rounded-2xl border border-white/15 bg-black/40 p-1 self-start sm:self-auto">
							<button
								type="button"
								onClick={() => setActiveFilter('All')}
								className={`rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
									activeFilter === 'All'
										? 'bg-gradient-to-r from-[#00F59B] to-[#00D4FF] text-[#050811] shadow-md'
										: 'text-slate-300 hover:text-white'
								}`}
							>
								All Apps (3)
							</button>
							<button
								type="button"
								onClick={() => setActiveFilter('Windows')}
								className={`rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
									activeFilter === 'Windows'
										? 'bg-[#00F59B]/20 text-[#00F59B] border border-[#00F59B]/50'
										: 'text-slate-300 hover:text-white'
								}`}
							>
								Windows (2)
							</button>
							<button
								type="button"
								onClick={() => setActiveFilter('Android')}
								className={`rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
									activeFilter === 'Android'
										? 'bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/50'
										: 'text-slate-300 hover:text-white'
								}`}
							>
								Android (1)
							</button>
						</div>
					</div>

					{/* 3D App Cards Grid */}
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{filteredApps.map((app) => (
							<AppCard3D
								key={app.id}
								app={app}
								onDownloadClick={openWaiver}
								baseUrl={baseUrl}
							/>
						))}
					</div>

					{/* 3-Step Quick Deployment Flow Bar */}
					<div className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.04] via-black/40 to-white/[0.02] p-6 backdrop-blur-xl">
						<div className="grid gap-6 md:grid-cols-3">
							<div className="flex items-start gap-4">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#00F59B]/15 text-[#00F59B] font-display font-bold text-lg border border-[#00F59B]/30">
									1
								</div>
								<div>
									<h4 className="font-semibold text-white text-sm">Download & Install</h4>
									<p className="mt-1 text-xs text-slate-400">
										Obtain the signed installer or APK directly from verified release builds.
									</p>
								</div>
							</div>

							<div className="flex items-start gap-4">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#00D4FF]/15 text-[#00D4FF] font-display font-bold text-lg border border-[#00D4FF]/30">
									2
								</div>
								<div>
									<h4 className="font-semibold text-white text-sm">Bind Hardware License</h4>
									<p className="mt-1 text-xs text-slate-400">
										Submit your Machine ID to lock activation exclusively to your physical rig.
									</p>
								</div>
							</div>

							<div className="flex items-start gap-4">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#A855F7]/15 text-[#A855F7] font-display font-bold text-lg border border-[#A855F7]/30">
									3
								</div>
								<div>
									<h4 className="font-semibold text-white text-sm">Autonomous Execution</h4>
									<p className="mt-1 text-xs text-slate-400">
										Route sub-millisecond orders through Binance or your favored exchange API.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Spotlight on Grok Desk Section */}
				<section id="grok" data-aos="fade-up" className="relative overflow-hidden rounded-3xl border border-[#A855F7]/30 bg-gradient-to-br from-[#A855F7]/15 via-[#090e1e]/90 to-[#EC4899]/10 p-6 sm:p-10 shadow-[0_0_50px_rgba(168,85,247,0.2)] backdrop-blur-2xl">
					<div className="grid items-center gap-10 lg:grid-cols-12">
						<div className="lg:col-span-7 space-y-5">
							<div className="inline-flex items-center gap-2 rounded-full border border-[#A855F7]/40 bg-[#A855F7]/20 px-3.5 py-1 text-xs font-semibold text-[#D8B4FE]">
								<Sparkles size={14} />
								FEATURE SPOTLIGHT: GROK DESK WORKSTATION
							</div>

							<h2 className="font-display text-3xl sm:text-4xl font-black text-white leading-tight">
								The Next-Generation <span className="text-[#A855F7]">Neural AI Trading Cockpit</span>
							</h2>

							<p className="text-sm sm:text-base text-slate-300 leading-relaxed">
								Engineered for quantitative traders who demand predictive reasoning over simple lagging indicators.
								Grok Desk decodes market microstructures, orderbook skew, whale absorption footprints, and cross-market narrative sentiment.
							</p>

							<div className="grid sm:grid-cols-2 gap-3 pt-2">
								<div className="rounded-xl border border-white/10 bg-black/40 p-3.5">
									<h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
										<Bot size={15} className="text-[#A855F7]" /> Multi-Agent Market Reasoning
									</h4>
									<p className="mt-1.5 text-xs text-slate-400">
										Continuous LLM analysis assessing news shocks, liquidity gaps, and whale accumulations.
									</p>
								</div>

								<div className="rounded-xl border border-white/10 bg-black/40 p-3.5">
									<h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
										<Layers size={15} className="text-[#00F59B]" /> 3D Liquidity Heatmaps
									</h4>
									<p className="mt-1.5 text-xs text-slate-400">
										Visualize depth clusters and order block targets before volatility expansion starts.
									</p>
								</div>
							</div>

							<div className="pt-2">
								<button
									type="button"
									onClick={() =>
										openWaiver(
											appLinks.find((app) => app.id === 'grok-desk')?.href ?? '#',
											'Grok Desk (Windows Desktop)',
										)
									}
									className="inline-flex items-center gap-2 rounded-2xl bg-[#A855F7] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(168,85,247,0.5)] transition hover:brightness-110 active:scale-95"
								>
									<Download size={16} />
									Download Grok Desk v1.4.0 (Windows)
								</button>
							</div>
						</div>

						<div className="lg:col-span-5 relative">
							<div className="overflow-hidden rounded-2xl border border-[#A855F7]/40 shadow-2xl">
								<img
									src={resolveUrl('/images/grok-desk-3d.jpg')}
									alt="Grok Desk AI Workstation"
									className="h-full w-full object-cover"
								/>
							</div>
						</div>
					</div>
				</section>

				{/* The Coordinated Ecosystem Stack */}
				<section id="ecosystem" data-aos="fade-up" className="space-y-8">
					<div className="text-center max-w-3xl mx-auto space-y-2">
						<p className="text-xs uppercase tracking-[0.25em] text-[#00D4FF] font-mono-numbers">
							COORDINATED SIGNAL INFRASTRUCTURE
						</p>
						<h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
							Built as One Interconnected Execution Stack
						</h2>
						<p className="text-sm text-slate-300">
							Every module communicates over local, low-latency pipes to give you an uncompromising institutional edge.
						</p>
					</div>

					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
						{ecosystemCards.map((card) => {
							const Icon = card.icon;
							return (
								<article
									key={card.name}
									className={`rounded-3xl border ${card.border} bg-gradient-to-b ${card.accent} p-6 backdrop-blur-xl shadow-xl transition-transform hover:-translate-y-1.5`}
								>
									<div className="flex items-center justify-between">
										<div
											className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/5"
											style={{ color: card.iconColor }}
										>
											<Icon size={24} />
										</div>
										<span
											className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border"
											style={{
												backgroundColor: `${card.iconColor}15`,
												borderColor: `${card.iconColor}40`,
												color: card.iconColor,
											}}
										>
											{card.tag}
										</span>
									</div>

									<h3 className="mt-5 font-display text-lg font-bold text-white">{card.name}</h3>
									<p className="mt-2 text-xs leading-relaxed text-slate-300">{card.description}</p>
								</article>
							);
						})}
					</div>
				</section>

				{/* Local-First & Technical Advantages */}
				<section data-aos="fade-up" className="space-y-8">
					<div className="text-center max-w-3xl mx-auto space-y-2">
						<p className="text-xs uppercase tracking-[0.25em] text-[#00F59B] font-mono-numbers">
							SOVEREIGN ARCHITECTURE
						</p>
						<h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
							Engineered for Speed, Reliability, and Discretion
						</h2>
					</div>

					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{featureHighlights.map((feature) => {
							const Icon = feature.icon;
							return (
								<div
									key={feature.title}
									className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl hover:border-white/20 transition-all"
								>
									<div
										className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5"
										style={{ color: feature.accent }}
									>
										<Icon size={20} />
									</div>
									<h3 className="mt-4 font-display text-base font-bold text-white">{feature.title}</h3>
									<p className="mt-2 text-xs leading-relaxed text-slate-300">{feature.description}</p>
								</div>
							);
						})}
					</div>
				</section>

				{/* Brand New Dedicated Pricing & Binance Pay Section */}
				<section
					id="pricing"
					data-aos="fade-up"
					className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#091122] via-[#070b16] to-[#040710] p-6 sm:p-12 shadow-[0_0_60px_rgba(245,158,11,0.15)] backdrop-blur-2xl"
				>
					<div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
					<div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#00F59B]/10 blur-3xl" />

					<div className="relative text-center max-w-3xl mx-auto space-y-3 mb-10">
						<div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/15 px-4 py-1 text-xs font-semibold text-amber-300 font-mono-numbers">
							<QrCode size={14} className="text-amber-400" />
							INSTANT BINANCE PAY SUBSCRIPTIONS
						</div>
						<h2 className="font-display text-3xl sm:text-5xl font-black text-white leading-tight">
							Simple, Transparent <span className="text-[#00F59B]">Subscription Packages</span>
						</h2>
						<p className="text-sm sm:text-base text-slate-300">
							Select your package, scan the Binance QR code, and receive your hardware-locked activation license with immediate VIP room access.
						</p>
					</div>

					{/* 4 Plans Pricing Matrix */}
					<div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{subscriptionPlans.map((plan) => {
							return (
								<div
									key={plan.id}
									className={`relative flex flex-col justify-between rounded-3xl border p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 ${
										plan.popular
											? 'border-[#00F59B] bg-gradient-to-b from-[#00F59B]/15 via-white/[0.04] to-black/70 shadow-[0_0_35px_rgba(0,245,155,0.25)]'
											: 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
									}`}
								>
									{plan.badge && (
										<span
											className={`absolute -top-3 right-4 rounded-full px-3 py-0.5 text-xs font-bold tracking-wide border shadow-md ${
												plan.popular
													? 'bg-[#00F59B] text-black border-[#00F59B]'
													: 'bg-[#A855F7] text-white border-[#A855F7]'
											}`}
										>
											{plan.badge}
										</span>
									)}

									<div>
										<h3 className="font-display text-lg font-bold text-white">{plan.name}</h3>
										<p className="text-xs text-slate-400 font-mono-numbers">{plan.duration}</p>

										<div className="mt-4 flex items-baseline gap-1">
											<span className="font-display text-3xl font-black text-white">${plan.price}</span>
											<span className="text-xs font-mono-numbers text-slate-400">USDT</span>
										</div>
										<p className="text-xs font-mono-numbers text-[#00D4FF] mt-1">{plan.monthlyRate}</p>
										{plan.discountText && (
											<span className="inline-block mt-1 text-[11px] font-semibold text-[#00F59B]">
												{plan.discountText}
											</span>
										)}

										<ul className="mt-6 space-y-2.5 text-xs text-slate-300 border-t border-white/10 pt-4">
											{plan.features.map((feat, i) => (
												<li key={i} className="flex items-start gap-2">
													<Check size={14} className="text-[#00F59B] shrink-0 mt-0.5" />
													<span>{feat}</span>
												</li>
											))}
										</ul>
									</div>

									<div className="mt-8 pt-4 border-t border-white/10">
										<button
											type="button"
											onClick={() => openPaymentModal(plan.id)}
											className={`w-full inline-flex items-center justify-center gap-2 rounded-2xl py-3 px-4 text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 shadow-lg ${
												plan.popular
													? 'bg-gradient-to-r from-[#00F59B] to-[#00D4FF] text-[#050811] hover:brightness-110 shadow-[0_0_20px_rgba(0,245,155,0.4)]'
													: 'bg-white/10 text-white hover:bg-white/20'
											}`}
										>
											<QrCode size={14} /> Pay with Binance
										</button>
									</div>
								</div>
							);
						})}
					</div>

					{/* Bottom Reassurance Banner */}
					<div className="mt-10 rounded-2xl border border-white/10 bg-black/40 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
								<ShieldCheck size={22} />
							</div>
							<div>
								<p className="text-sm font-bold text-white">Direct On-Chain Binance Pay Security</p>
								<p className="text-xs text-slate-400">
									No third-party credit card storage or recurring charges. You maintain 100% control over payments from your Binance account.
								</p>
							</div>
						</div>

						<button
							type="button"
							onClick={() => openPaymentModal('6-months')}
							className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition hover:brightness-110 active:scale-95"
						>
							Open Payment Scanner <ArrowRight size={14} />
						</button>
					</div>
				</section>

				{/* Technical Specs & Support Grid */}
				<section data-aos="fade-up" className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10 backdrop-blur-xl">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
						<div>
							<p className="text-xs uppercase tracking-[0.25em] text-[#00D4FF] font-mono-numbers">
								ENTERPRISE RUNTIME SPECIFICATIONS
							</p>
							<h2 className="font-display mt-1 text-2xl sm:text-3xl font-bold text-white">
								Architecture, Security, and System Boundaries
							</h2>
						</div>
						<Cpu className="text-[#00D4FF]" size={28} />
					</div>

					<div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						<div className="rounded-2xl border border-white/10 bg-black/30 p-5">
							<h3 className="font-bold text-white text-sm">Supported Operating Systems</h3>
							<p className="mt-2 text-xs leading-relaxed text-slate-300">
								• <strong>Windows:</strong> 10 / 11 (64-bit architecture) for Signal Forge Pro & Grok Desk.<br />
								• <strong>Android:</strong> 10.0+ (ARM64) standalone APK for mobile signal monitoring.
							</p>
						</div>

						<div className="rounded-2xl border border-white/10 bg-black/30 p-5">
							<h3 className="font-bold text-white text-sm">Hardware Fingerprint Model</h3>
							<p className="mt-2 text-xs leading-relaxed text-slate-300">
								Software activations generate a unique cryptographic hash from your local CPU and motherboard ID.
								License keys are validated offline with zero data transmission back to central servers.
							</p>
						</div>

						<div className="rounded-2xl border border-white/10 bg-black/30 p-5">
							<h3 className="font-bold text-white text-sm">Direct Support Channels</h3>
							<p className="mt-2 text-xs leading-relaxed text-slate-300">
								For setup queries, licensing verification, and custom strategy consulting:<br />
								• Email: <a href="mailto:signalbotpro@gmail.com" className="text-[#00D4FF] hover:underline">signalbotpro@gmail.com</a><br />
								• Telegram: <a href="https://t.me/SignalBotPr" target="_blank" rel="noreferrer" className="text-[#00F59B] hover:underline">@SignalBotPr</a>
							</p>
						</div>

						<div className="rounded-2xl border border-white/10 bg-black/30 p-5 md:col-span-2 lg:col-span-3">
							<h3 className="font-bold text-white text-sm flex items-center gap-2">
								<Globe size={16} className="text-[#00D4FF]" />
								External Installation & Security Notice
							</h3>
							<p className="mt-2 text-xs leading-relaxed text-slate-300">
								Because Signal Forge Pro and Grok Desk are high-frequency autonomous trading applications distributed directly outside third-party consumer app stores, your operating system (Windows SmartScreen or Android Package Installer) may display publisher warnings. You can safely proceed by choosing “Run Anyway” or allowing installation from trusted sources. Data remains strictly on your machine.
							</p>
						</div>
					</div>
				</section>
			</main>

			{/* Futuristic Footer */}
			<footer className="mt-20 border-t border-white/10 bg-[#03060c] py-12">
				<div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
						<div className="flex items-center gap-3">
							<div className="h-9 w-9 rounded-xl border border-white/20 bg-white/5 p-1">
								<img src={resolveUrl('/signal-forge-logo.png')} alt="" className="h-full w-full object-cover" />
							</div>
							<div>
								<p className="font-display font-bold text-white text-base">Signal Forge Pro & Grok Desk</p>
								<p className="text-[11px] text-slate-400 font-mono-numbers">Next-Gen Local Algorithmic Trading Suite</p>
							</div>
						</div>

						<div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
							<a href="#apps" className="transition hover:text-white">Download Apps</a>
							<a href="#terminal" className="transition hover:text-white">Terminal Simulator</a>
							<a href="#grok" className="transition hover:text-white">Grok Desk AI</a>
							<button type="button" onClick={() => openPaymentModal('6-months')} className="transition hover:text-amber-400 text-left">
								Pricing & Binance Pay
							</button>
							<a href="https://t.me/SignalBotPr" target="_blank" rel="noreferrer" className="text-[#00D4FF] hover:underline">
								Telegram Community
							</a>
						</div>
					</div>

					<div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
						<p>© 2026 Signal Forge Pro Ecosystem. All rights reserved. Sovereign Local Execution.</p>
						<p className="text-[11px] text-slate-400 font-mono-numbers">Hardware Bound • Zero Cloud Telemetry</p>
					</div>
				</div>
			</footer>

			{/* Risk Disclosure & Liability Waiver Cyber Modal */}
			{isWaiverOpen && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
					<div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/20 bg-[#070b16] p-6 sm:p-8 shadow-[0_0_60px_rgba(0,212,255,0.25)]">
						<div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
							<div>
								<p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#00D4FF] font-mono-numbers">
									<AlertTriangle size={14} className="text-[#00D4FF]" />
									MANDATORY TRADING DISCLOSURE & WAIVER
								</p>
								<h3 className="mt-1 font-display text-2xl font-bold text-white">
									Risk Disclosure & Liability Acceptance
								</h3>
								<p className="mt-1 text-xs text-slate-400">
									Target Package: <span className="font-semibold text-white">{pendingDownloadLabel}</span>
								</p>
							</div>
							<button
								type="button"
								onClick={() => setIsWaiverOpen(false)}
								className="rounded-xl border border-white/15 bg-white/5 p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
								aria-label="Close modal"
							>
								<X size={18} />
							</button>
						</div>

						{/* Disclaimer clauses */}
						<div className="mt-6 space-y-4 text-xs sm:text-sm leading-relaxed text-slate-300 max-h-72 overflow-y-auto pr-2 bg-black/40 p-4 rounded-2xl border border-white/5">
							<section>
								<h4 className="font-semibold text-white">1) No Financial or Investment Advice</h4>
								<p className="mt-1 text-slate-400">
									Signals, neural predictions, automation tools, and documentation provided via Signal Forge Pro and Grok Desk are delivered strictly for technological, educational, and computational utility. We do not act as registered broker-dealers, investment advisors, or fiduciaries.
								</p>
							</section>

							<section>
								<h4 className="font-semibold text-white">2) Extreme Market Volatility & Capital Risk</h4>
								<p className="mt-1 text-slate-400">
									Digital asset trading entails substantial risk of capital loss. Past algorithmic performance, backtest ratios, and simulated win rates do not guarantee future profitability. You trade exclusively at your own risk.
								</p>
							</section>

							<section>
								<h4 className="font-semibold text-white">3) Local Execution & Hardware Responsibility</h4>
								<p className="mt-1 text-slate-400">
									Because software logic executes locally on your hardware, you are solely responsible for machine uptime, internet connection stability, exchange API keys, leverage limits, and power management. Signal Forge Pro disclaims liability for technical slippage or hardware interrupts.
								</p>
							</section>

							<section>
								<h4 className="font-semibold text-white">4) Android Foreground Execution Notice</h4>
								<p className="mt-1 text-slate-400">
									For users deploying the Android mobile companion, you acknowledge that Android OS battery savers may suspend background tasks. The application must remain active in the foreground for continuous automated order relay.
								</p>
							</section>

							<section>
								<h4 className="font-semibold text-white">5) Limitation of Total Liability</h4>
								<p className="mt-1 text-slate-400">
									To the fullest extent permissible by applicable law, Signal Forge Pro and its affiliates will not be liable for any direct, indirect, incidental, or consequential damages resulting from software use, market swings, or exchange outages.
								</p>
							</section>
						</div>

						{/* Acceptance Checkbox */}
						<label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs sm:text-sm text-slate-200 hover:border-white/20 transition-all">
							<input
								type="checkbox"
								checked={acceptedWaiver}
								onChange={(e) => setAcceptedWaiver(e.target.checked)}
								className="mt-0.5 h-4 w-4 rounded border-white/30 bg-transparent accent-[#00F59B]"
							/>
							<span>
								I acknowledge that I have read, understood, and agreed to the Signal Forge Pro & Grok Desk Risk Disclosure & Liability Waiver. I confirm that trading carries inherent risk and I accept full responsibility for my execution.
							</span>
						</label>

						{/* Modal Actions */}
						<div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3 border-t border-white/10 pt-4">
							<button
								type="button"
								onClick={() => setIsWaiverOpen(false)}
								className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={confirmDownload}
								disabled={!acceptedWaiver}
								className="rounded-xl bg-gradient-to-r from-[#00F59B] to-[#00D4FF] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#050811] shadow-[0_0_20px_rgba(0,245,155,0.4)] transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
							>
								Accept & Download Installer
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Interactive Binance Pay Checkout Portal Modal */}
			<PaymentModal
				isOpen={isPaymentModalOpen}
				onClose={() => setIsPaymentModalOpen(false)}
				baseUrl={baseUrl}
				initialPlanId={selectedPaymentPlanId}
			/>
		</div>
	);
}