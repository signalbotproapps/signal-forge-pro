import { useState, useEffect } from 'react';
import { 
	Bot, 
	Zap, 
	ShieldCheck, 
	Activity, 
	Terminal as TerminalIcon, 
	Sparkles, 
	Radio, 
	CheckCircle2, 
	PlayCircle,
} from 'lucide-react';

export default function InteractiveTerminalSimulator() {
	const [activeTab, setActiveTab] = useState<'signal-forge' | 'grok' | 'mobile'>('grok');
	const [isSimulating, setIsSimulating] = useState(false);
	const [simStage, setSimStage] = useState<string>('Standby');
	const [simLog, setSimLog] = useState<Array<{ id: number; text: string; time: string; color: string }>>([
		{ id: 1, text: 'Signal Forge Pro Engine v2.4.1 initialized [Node OK]', time: '10:41:02', color: 'text-slate-400' },
		{ id: 2, text: 'Grok Neural Core linked: 14 market channels synced', time: '10:41:05', color: 'text-[#A855F7]' },
		{ id: 3, text: 'Local hardware license validated: bound to on-device HWID', time: '10:41:07', color: 'text-[#00F59B]' },
	]);

	const triggerSimulation = () => {
		if (isSimulating) return;
		setIsSimulating(true);
		setSimStage('Analyzing Liquidity...');

		setTimeout(() => {
			setSimStage('Grok AI Neural Vote: +96.4% BUY');
			setSimLog((prev) => [
				{
					id: Date.now(),
					text: 'Grok AI detected institutional liquidity sweep on BTC/USDT at 64,810',
					time: new Date().toLocaleTimeString(),
					color: 'text-[#A855F7]',
				},
				...prev.slice(0, 5),
			]);
		}, 600);

		setTimeout(() => {
			setSimStage('Executing Local Order via Signal Forge Pro...');
			setSimLog((prev) => [
				{
					id: Date.now(),
					text: 'Signal Forge Pro dispatched local execution order: LATENCY = 1.9ms',
					time: new Date().toLocaleTimeString(),
					color: 'text-[#00D4FF]',
				},
				...prev.slice(0, 5),
			]);
		}, 1300);

		setTimeout(() => {
			setSimStage('Order Filled: +$1,420 Profit Target Locked');
			setSimLog((prev) => [
				{
					id: Date.now(),
					text: 'Trade verified & logged locally. Telegram alert delivered via Tele Apex.',
					time: new Date().toLocaleTimeString(),
					color: 'text-[#00F59B]',
				},
				...prev.slice(0, 5),
			]);
			setIsSimulating(false);
		}, 2100);
	};

	return (
		<div className="relative mx-auto w-full max-w-4xl rounded-3xl border border-white/15 bg-[#090e1c]/85 p-4 sm:p-6 shadow-[0_0_60px_rgba(0,212,255,0.18)] backdrop-blur-2xl">
			{/* Terminal Top Window Bar */}
			<div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
				<div className="flex items-center gap-3">
					<div className="flex gap-1.5">
						<span className="h-3 w-3 rounded-full bg-[#FF3366]/80 inline-block shadow-[0_0_8px_rgba(255,51,102,0.6)]" />
						<span className="h-3 w-3 rounded-full bg-[#F59E0B]/80 inline-block shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
						<span className="h-3 w-3 rounded-full bg-[#00F59B]/80 inline-block shadow-[0_0_8px_rgba(0,245,155,0.6)]" />
					</div>
					<span className="font-mono-numbers text-xs font-semibold text-slate-300 flex items-center gap-2">
						<TerminalIcon size={14} className="text-[#00D4FF]" />
						QUANTUM_STATION://LIVE_TELEMETRY
					</span>
				</div>

				{/* App Switcher Tabs */}
				<div className="inline-flex rounded-xl border border-white/10 bg-black/40 p-1">
					<button
						type="button"
						onClick={() => setActiveTab('grok')}
						className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
							activeTab === 'grok'
								? 'bg-gradient-to-r from-[#A855F7]/30 to-[#EC4899]/30 text-white border border-[#A855F7]/50 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
								: 'text-slate-400 hover:text-white'
						}`}
					>
						<Sparkles size={12} className="text-[#A855F7]" />
						Grok Desk AI
					</button>

					<button
						type="button"
						onClick={() => setActiveTab('signal-forge')}
						className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
							activeTab === 'signal-forge'
								? 'bg-[#00F59B]/20 text-[#00F59B] border border-[#00F59B]/50 shadow-[0_0_15px_rgba(0,245,155,0.3)]'
								: 'text-slate-400 hover:text-white'
						}`}
					>
						<Zap size={12} className="text-[#00F59B]" />
						Signal Forge Desktop
					</button>

					<button
						type="button"
						onClick={() => setActiveTab('mobile')}
						className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
							activeTab === 'mobile'
								? 'bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/50 shadow-[0_0_15px_rgba(0,212,255,0.3)]'
								: 'text-slate-400 hover:text-white'
						}`}
					>
						<Radio size={12} className="text-[#00D4FF]" />
						Mobile Node
					</button>
				</div>
			</div>

			{/* Active Tab View */}
			<div className="mt-5 grid gap-5 lg:grid-cols-12">
				{/* Main Telemetry & Chart Simulator */}
				<div className="lg:col-span-8 rounded-2xl border border-white/10 bg-black/50 p-4 sm:p-5 relative overflow-hidden">
					{/* Background Scan Beam */}
					<div className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-[#00D4FF]/10 via-[#00F59B]/5 to-transparent animate-beam" />

					{activeTab === 'grok' && (
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#A855F7]/20 text-[#A855F7] border border-[#A855F7]/30">
										<Bot size={14} />
									</span>
									<div>
										<h4 className="text-sm font-semibold text-white">Grok Neural Market Predictor</h4>
										<p className="text-[11px] text-slate-400">Deep Reasoning LLM & Multi-Timeframe Orderflow Engine</p>
									</div>
								</div>
								<span className="rounded-full border border-[#A855F7]/40 bg-[#A855F7]/15 px-2.5 py-0.5 text-xs font-semibold text-[#D8B4FE]">
									AI Confidence: 96.8%
								</span>
							</div>

							{/* Grok Sentiment Heatmap Mini Visual */}
							<div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 space-y-2">
								<div className="flex justify-between text-xs text-slate-400 font-mono-numbers">
									<span>MARKET LIQUIDITY HEATMAP</span>
									<span className="text-[#00F59B]">BULLISH PRESSURE: 82%</span>
								</div>
								<div className="grid grid-cols-6 gap-1.5 h-12">
									{[85, 62, 94, 78, 91, 88].map((val, i) => (
										<div key={i} className="flex flex-col justify-end rounded bg-white/5 p-1 relative overflow-hidden">
											<div 
												className="w-full rounded bg-gradient-to-t from-[#A855F7] to-[#00F59B] transition-all duration-700" 
												style={{ height: `${val}%` }} 
											/>
											<span className="text-[9px] text-center font-mono-numbers text-slate-300 mt-1">{val}%</span>
										</div>
									))}
								</div>
							</div>

							<div className="rounded-xl border border-[#A855F7]/30 bg-[#A855F7]/10 p-3 text-xs leading-relaxed text-slate-200">
								<span className="font-semibold text-[#D8B4FE] block mb-1">🧠 Grok Autonomous Insight:</span>
								&quot;Institutional order blocks identified between $64,200 and $64,750. Whale absorption volume confirmed. Anticipating high-probability volatility expansion to $66,400.&quot;
							</div>
						</div>
					)}

					{activeTab === 'signal-forge' && (
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#00F59B]/20 text-[#00F59B] border border-[#00F59B]/30">
										<Zap size={14} />
									</span>
									<div>
										<h4 className="text-sm font-semibold text-white">Signal Forge Pro Execution Kernel</h4>
										<p className="text-[11px] text-slate-400">Zero Cloud Latency • Hardware Fingerprint Bound</p>
									</div>
								</div>
								<span className="rounded-full border border-[#00F59B]/40 bg-[#00F59B]/15 px-2.5 py-0.5 text-xs font-semibold text-[#00F59B] font-mono-numbers">
									LATENCY: 1.8ms
								</span>
							</div>

							{/* Simulated Execution Candlesticks */}
							<div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
								<div className="flex justify-between text-xs text-slate-400 font-mono-numbers mb-2">
									<span>EUR/USD MOMENTUM PULSE</span>
									<span className="text-[#00F59B] flex items-center gap-1">
										<CheckCircle2 size={12} /> ROUTED VIA LOCALHOST
									</span>
								</div>
								<div className="flex items-end justify-between h-20 px-2 gap-2">
									{[40, 55, 38, 65, 52, 70, 60, 85, 92].map((height, i) => (
										<div key={i} className="flex flex-col items-center flex-1 h-full justify-end">
											<div className="w-0.5 h-3 bg-white/20 mb-0.5" />
											<div 
												className={`w-full max-w-[16px] rounded-sm ${i === 8 ? 'bg-[#00F59B] shadow-[0_0_12px_#00F59B]' : i % 2 === 0 ? 'bg-[#00D4FF]/70' : 'bg-[#00F59B]/70'}`}
												style={{ height: `${height}%` }}
											/>
											<div className="w-0.5 h-2 bg-white/20 mt-0.5" />
										</div>
									))}
								</div>
							</div>

							<div className="grid grid-cols-3 gap-2">
								<div className="rounded-lg border border-white/10 bg-white/5 p-2 text-center">
									<p className="text-[10px] text-slate-400">Local Slip</p>
									<p className="font-mono-numbers text-xs font-bold text-[#00F59B]">0.0001%</p>
								</div>
								<div className="rounded-lg border border-white/10 bg-white/5 p-2 text-center">
									<p className="text-[10px] text-slate-400">Hardware Lock</p>
									<p className="font-mono-numbers text-xs font-bold text-[#00D4FF]">ACTIVE</p>
								</div>
								<div className="rounded-lg border border-white/10 bg-white/5 p-2 text-center">
									<p className="text-[10px] text-slate-400">Order Routing</p>
									<p className="font-mono-numbers text-xs font-bold text-white">Direct Webhook</p>
								</div>
							</div>
						</div>
					)}

					{activeTab === 'mobile' && (
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/30">
										<Radio size={14} />
									</span>
									<div>
										<h4 className="text-sm font-semibold text-white">Mobile Tele Apex Bridge</h4>
										<p className="text-[11px] text-slate-400">Encrypted Telegram Signal Relay • On-Device Push</p>
									</div>
								</div>
								<span className="rounded-full border border-amber-500/40 bg-amber-500/15 px-2.5 py-0.5 text-xs font-semibold text-amber-300">
									Foreground Mode: ACTIVE
								</span>
							</div>

							{/* Simulated Mobile Feed Alert */}
							<div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 space-y-2">
								<div className="flex items-center justify-between text-xs text-slate-400">
									<span className="flex items-center gap-1.5 font-semibold text-white">
										<Radio size={13} className="text-[#00D4FF] animate-pulse" />
										INCOMING SIGNAL INTERCEPTED
									</span>
									<span className="font-mono-numbers text-[10px] text-[#00D4FF]">JUST NOW</span>
								</div>
								<div className="rounded-lg bg-black/40 p-2.5 border border-white/5 font-mono-numbers text-xs text-slate-200">
									<p className="text-[#00F59B] font-semibold">BUY XAU/USD (Gold Spot)</p>
									<p className="text-slate-400 text-[11px] mt-1">Entry: 2654.50 | TP1: 2668.00 | SL: 2646.00</p>
									<div className="mt-2 flex gap-2">
										<span className="rounded bg-[#00F59B]/20 px-2 py-0.5 text-[10px] text-[#00F59B]">Auto-Executed</span>
										<span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-slate-300">Binance Pro API</span>
									</div>
								</div>
							</div>

							<div className="rounded-lg border border-amber-500/25 bg-amber-500/10 p-2.5 text-xs text-amber-200">
								⚡ <span className="font-semibold">Android Notice:</span> Keep the app displayed in foreground to bypass Android OS battery deep sleep restrictions.
							</div>
						</div>
					)}
				</div>

				{/* Right Side: Interactive Action & Live Console */}
				<div className="lg:col-span-4 flex flex-col justify-between rounded-2xl border border-white/10 bg-black/40 p-4 sm:p-5">
					<div>
						<div className="flex items-center justify-between border-b border-white/10 pb-3">
							<span className="text-xs font-semibold tracking-wider text-slate-400 font-mono-numbers uppercase">
								SYSTEM STATUS
							</span>
							<span className="flex items-center gap-1.5 text-xs font-medium text-[#00F59B]">
								<span className="h-1.5 w-1.5 rounded-full bg-[#00F59B] animate-ping" />
								ONLINE
							</span>
						</div>

						{/* Live Simulation Trigger Button */}
						<div className="mt-4">
							<button
								type="button"
								onClick={triggerSimulation}
								disabled={isSimulating}
								className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
									isSimulating
										? 'bg-gradient-to-r from-[#A855F7] via-[#00D4FF] to-[#00F59B] text-black animate-pulse shadow-[0_0_25px_rgba(0,212,255,0.6)]'
										: 'bg-gradient-to-r from-[#00F59B] to-[#00D4FF] text-[#050811] hover:brightness-110 shadow-[0_0_20px_rgba(0,245,155,0.4)]'
								}`}
							>
								{isSimulating ? (
									<>
										<Activity className="animate-spin" size={16} />
										<span>{simStage}</span>
									</>
								) : (
									<>
										<PlayCircle size={16} />
										<span>Test Live Signal Dispatch</span>
									</>
								)}
							</button>
						</div>

						{/* Live Terminal Log Stream */}
						<div className="mt-4 space-y-1.5 font-mono-numbers text-[11px] bg-black/60 rounded-xl p-3 border border-white/5 h-36 overflow-y-auto">
							<div className="text-[10px] text-slate-500 border-b border-white/5 pb-1 mb-1 flex justify-between">
								<span>EVENT LOG</span>
								<span>LOCAL PIPE</span>
							</div>
							{simLog.map((item) => (
								<div key={item.id} className="leading-tight">
									<span className="text-slate-500 mr-1.5">[{item.time.slice(0, 8)}]</span>
									<span className={item.color}>{item.text}</span>
								</div>
							))}
						</div>
					</div>

					<div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
						<span className="flex items-center gap-1">
							<ShieldCheck size={13} className="text-[#00F59B]" /> 100% Local Logic
						</span>
						<span className="font-mono-numbers text-slate-300">HWID: ACTIVE</span>
					</div>
				</div>
			</div>
		</div>
	);
}
