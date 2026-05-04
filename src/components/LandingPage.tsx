import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
	ArrowRight,
	AlertTriangle,
	BadgeCheck,
	Bot,
	Cpu,
	Download,
	GitBranch,
	Globe,
	Lock,
	MonitorSmartphone,
	Rocket,
	ShieldCheck,
	Smartphone,
	TimerOff,
	X,
} from 'lucide-react';
import { appLinks } from '../data/appLinks';

const ecosystemCards = [
	{
		name: 'Aura Signal Generator',
		description: 'AI-assisted market signal generation with fast local processing and strategy tuning.',
		accent: 'from-[#00FF41]/25 to-transparent',
	},
	{
		name: 'Tele Apex',
		description: 'Lightning Telegram delivery bridge for actionable alerts and operational command flow.',
		accent: 'from-[#00D4FF]/25 to-transparent',
	},
	{
		name: 'Signal Forge Pro',
		description: 'The command layer unifying execution, logging, and local activation controls.',
		accent: 'from-[#00FF41]/20 via-[#00D4FF]/20 to-transparent',
	},
];

const features = [
	{
		title: 'No Cloud Latency',
		description: 'Trade logic runs where decisions happen: your machine, your network, your edge.',
		icon: TimerOff,
	},
	{
		title: 'Data Privacy',
		description: 'Signals and analytics remain on-device to reduce external exposure risk.',
		icon: Lock,
	},
	{
		title: 'Local Licensing System',
		description: 'Hardware-bound activation secures usage without always-online dependencies.',
		icon: ShieldCheck,
	},
];

export default function LandingPage() {
	const [activePlatform, setActivePlatform] = useState<'Windows' | 'Android'>('Windows');
	const [isWaiverOpen, setIsWaiverOpen] = useState(false);
	const [acceptedWaiver, setAcceptedWaiver] = useState(false);
	const [pendingDownloadUrl, setPendingDownloadUrl] = useState<string | null>(null);
	const [pendingDownloadLabel, setPendingDownloadLabel] = useState('');
	const filteredApps = appLinks.filter((app) => app.platform === activePlatform);

	const openWaiver = (url: string, label: string) => {
		setPendingDownloadUrl(url);
		setPendingDownloadLabel(label);
		setAcceptedWaiver(false);
		setIsWaiverOpen(true);
	};

	const confirmDownload = () => {
		if (!acceptedWaiver || !pendingDownloadUrl) {
			return;
		}

		window.open(pendingDownloadUrl, '_blank', 'noopener,noreferrer');
		setIsWaiverOpen(false);
		setPendingDownloadUrl(null);
		setPendingDownloadLabel('');
	};

	useEffect(() => {
		AOS.init({
			duration: 900,
			easing: 'ease-out-cubic',
			once: true,
			offset: 80,
		});
	}, []);

	return (
		<div className="relative overflow-hidden">
			<div className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-[#00FF41]/10 blur-3xl motion-float-slow" />
				<div className="absolute -right-24 top-40 h-80 w-80 rounded-full bg-[#00D4FF]/10 blur-3xl motion-float" />
				<div className="absolute left-1/2 top-0 h-80 w-[32rem] -translate-x-1/2 bg-gradient-to-b from-[#00D4FF]/15 to-transparent blur-3xl motion-pulse-glow" />
				<div className="absolute left-1/2 top-56 h-64 w-64 -translate-x-1/2 rounded-full border border-[#00D4FF]/30 motion-orbit" />
			</div>

			<header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0E11]/80 backdrop-blur-xl">
				<nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-8">
					<div className="flex items-center gap-3">
						<div className="relative h-9 w-9 overflow-hidden rounded-xl border border-white/20 bg-white/5 shadow-[0_0_30px_rgba(0,212,255,0.25)]">
							<img src={`${import.meta.env.BASE_URL}/signal-forge-logo.png`} alt="Signal Forge Pro logo" className="h-full w-full object-cover motion-float" />
						</div>
						<p className="text-sm font-semibold tracking-wide text-white md:text-base">Signal Forge Pro</p>
					</div>
					<a
						href="#download"
						className="inline-flex items-center gap-2 rounded-2xl border border-[#00D4FF]/40 bg-[#00D4FF]/10 px-4 py-2 text-sm font-medium text-[#7CEBFF] transition hover:border-[#00D4FF] hover:bg-[#00D4FF]/20"
					>
						<Download size={16} />
						Download
					</a>
				</nav>
			</header>

			<main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-5 pb-16 pt-14 md:px-8 md:pt-20">
				<section className="grid items-center gap-10 lg:grid-cols-2">
					<div data-aos="fade-up" className="space-y-6">
						<div className="inline-flex items-center gap-2 rounded-full border border-[#00FF41]/40 bg-[#00FF41]/10 px-3 py-1 text-xs font-medium text-[#86FFAB]">
							<BadgeCheck size={14} />
							Local-First Trading Ecosystem
						</div>
						<h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
							Precision Trading. <span className="text-[#00D4FF]">Local Control.</span>
						</h1>
						<p className="max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
							Experience the Signal Forge Pro ecosystem. Desktop and Mobile apps designed for speed, privacy, and local-first execution.
						</p>
						<div id="download" className="flex flex-col gap-3 pt-2 sm:flex-row">
							<button
								type="button"
								onClick={() =>
									openWaiver(
										appLinks.find((app) => app.platform === 'Windows')?.href ?? '#',
										'Signal Forge Pro Desktop (Windows)',
									)
								}
								className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#00FF41] px-5 py-3 text-sm font-semibold text-[#051006] transition hover:brightness-110"
							>
								<MonitorSmartphone size={18} />
								Download Windows App
							</button>
							<button
								type="button"
								onClick={() =>
									openWaiver(
										appLinks.find((app) => app.platform === 'Android')?.href ?? '#',
										'Signal Forge Pro Mobile (Android)',
									)
								}
								className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#00D4FF]/50 bg-[#00D4FF]/10 px-5 py-3 text-sm font-semibold text-[#7CEBFF] transition hover:bg-[#00D4FF]/20"
							>
								<Smartphone size={18} />
								Download Android APK
							</button>
						</div>
					</div>

					<div data-aos="fade-up" data-aos-delay="180" className="grid gap-4">
						<div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl">
							<div className="mb-4 overflow-hidden rounded-xl border border-white/10 bg-black/30 p-2">
								<div className="relative mx-auto flex w-fit items-center justify-center">
									<div className="absolute h-24 w-24 rounded-full bg-[#00D4FF]/30 blur-2xl motion-pulse-glow" />
									<img
										src={`${import.meta.env.BASE_URL}/signal-forge-logo.png`}
										alt="Signal Forge Pro symbol"
										className="relative z-10 h-20 w-20 rounded-xl object-cover shadow-[0_0_35px_rgba(0,212,255,0.55)] motion-float"
									/>
								</div>
							</div>
							<div className="h-56 rounded-xl border border-white/20 bg-gradient-to-br from-[#0d2230] via-[#0f1b2c] to-[#083323] p-4">
								<div className="mb-3 flex items-center justify-between text-xs text-slate-300">
									<span className="inline-flex items-center gap-1"><Bot size={12} /> Aura Signal Stream</span>
									<span className="rounded-full border border-[#00FF41]/30 bg-[#00FF41]/10 px-2 py-1 text-[#93ffb6]">Live</span>
								</div>
								<div className="grid h-[calc(100%-26px)] grid-cols-3 gap-3">
									<div className="rounded-lg border border-white/10 bg-white/5 p-3">
										<p className="text-[11px] text-slate-400">Win Ratio</p>
										<p className="mt-1 text-lg font-semibold text-[#00FF41]">87.4%</p>
									</div>
									<div className="rounded-lg border border-white/10 bg-white/5 p-3">
										<p className="text-[11px] text-slate-400">Signals</p>
										<p className="mt-1 text-lg font-semibold text-white">142</p>
									</div>
									<div className="rounded-lg border border-white/10 bg-white/5 p-3">
										<p className="text-[11px] text-slate-400">Latency</p>
										<p className="mt-1 text-lg font-semibold text-[#7CEBFF]">8ms</p>
									</div>
									<div className="col-span-3 rounded-lg border border-white/10 bg-black/20 p-3">
										<p className="text-[11px] text-slate-400">Current Strategy</p>
										<p className="mt-1 text-sm text-white">EUR/USD Momentum Pulse with local execution routing</p>
									</div>
								</div>
							</div>
						</div>
						<div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl">
							<div className="h-40 rounded-xl border border-white/20 bg-gradient-to-r from-[#0c2e1d] to-[#0f2635] p-4">
								<p className="text-xs text-slate-300">Mobile Command Panel</p>
								<div className="mt-3 grid grid-cols-3 gap-3">
									<div className="rounded-lg border border-white/10 bg-black/20 p-2 text-center text-[11px] text-[#93ffb6]">BUY</div>
									<div className="rounded-lg border border-white/10 bg-black/20 p-2 text-center text-[11px] text-[#7CEBFF]">HOLD</div>
									<div className="rounded-lg border border-white/10 bg-black/20 p-2 text-center text-[11px] text-rose-300">SELL</div>
								</div>
								<p className="mt-3 text-xs text-slate-400">Synced with desktop engine over private local channel</p>
							</div>
						</div>
					</div>
				</section>

				<section data-aos="fade-up" className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:p-8">
					<div className="flex flex-wrap items-center justify-between gap-3">
						<div>
							<p className="text-xs uppercase tracking-[0.2em] text-[#00D4FF]">Interactive Downloads</p>
							<h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Choose platform and deploy in minutes</h2>
						</div>
						<div className="inline-flex rounded-2xl border border-white/10 bg-black/20 p-1">
							<button
								onClick={() => setActivePlatform('Windows')}
								className={`rounded-xl px-4 py-2 text-sm transition ${activePlatform === 'Windows' ? 'bg-[#00FF41] text-[#051006]' : 'text-slate-300 hover:text-white'}`}
							>
								Windows
							</button>
							<button
								onClick={() => setActivePlatform('Android')}
								className={`rounded-xl px-4 py-2 text-sm transition ${activePlatform === 'Android' ? 'bg-[#00D4FF]/20 text-[#7CEBFF]' : 'text-slate-300 hover:text-white'}`}
							>
								Android
							</button>
						</div>
					</div>
					<div className="grid gap-4 md:grid-cols-2">
						{filteredApps.map((app) => (
							<article key={app.name} className="rounded-2xl border border-white/10 bg-black/20 p-5">
								<div className="flex items-start justify-between gap-3">
									<div>
										<p className="text-base font-semibold text-white">{app.name}</p>
										<p className="mt-1 text-sm text-slate-400">
											{app.version} • {app.size}
										</p>
									</div>
									{app.recommended ? (
										<span className="rounded-full border border-[#00FF41]/30 bg-[#00FF41]/10 px-2 py-1 text-xs text-[#93ffb6]">Recommended</span>
									) : null}
								</div>
								<div className="mt-4 flex items-center justify-between">
									<span className="inline-flex items-center gap-1 text-xs text-slate-400">
										<GitBranch size={13} /> Latest Build
									</span>
									<button
										type="button"
										onClick={() => openWaiver(app.href, `${app.name} (${app.platform})`)}
										className="inline-flex items-center gap-2 rounded-xl border border-[#00D4FF]/40 bg-[#00D4FF]/10 px-4 py-2 text-sm text-[#7CEBFF] transition hover:bg-[#00D4FF]/20"
									>
										Download <ArrowRight size={14} />
									</button>
								</div>
							</article>
						))}
						<div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#00D4FF]/10 to-[#00FF41]/10 p-5">
							<p className="inline-flex items-center gap-2 text-sm text-white">
								<Rocket size={15} />
								One-Click Setup Flow
							</p>
							<p className="mt-2 text-sm text-slate-300">
								Download your app package, install, activate your license, and start trading with local-first execution in minutes.
							</p>
							<div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
								<div className="rounded-lg border border-white/15 bg-black/20 p-2 text-slate-300">Download</div>
								<div className="rounded-lg border border-white/15 bg-black/20 p-2 text-slate-300">Install</div>
								<div className="rounded-lg border border-white/15 bg-black/20 p-2 text-slate-300">Activate</div>
							</div>
						</div>
					</div>
				</section>

				<section data-aos="fade-up" className="space-y-6">
					<div>
						<p className="text-xs uppercase tracking-[0.2em] text-[#00D4FF]">The Ecosystem</p>
						<h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Built as one coordinated signal stack</h2>
					</div>
					<div className="grid gap-4 md:grid-cols-3">
						{ecosystemCards.map((card) => (
							<article
								key={card.name}
								className={`rounded-2xl border border-white/10 bg-gradient-to-br ${card.accent} p-5 backdrop-blur-xl`}
							>
								<h3 className="text-lg font-semibold text-white">{card.name}</h3>
								<p className="mt-3 text-sm leading-relaxed text-slate-300">{card.description}</p>
							</article>
						))}
					</div>
				</section>

				<section data-aos="fade-up" className="space-y-6">
					<div>
						<p className="text-xs uppercase tracking-[0.2em] text-[#00FF41]">Local-First Features</p>
						<h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Engineered for control and reliability</h2>
					</div>
					<div className="grid gap-4 md:grid-cols-3">
						{features.map((feature) => (
							<div key={feature.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
								<div className="inline-flex rounded-xl border border-white/15 bg-white/5 p-2 text-[#00D4FF]">
									<feature.icon size={18} />
								</div>
								<h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
								<p className="mt-2 text-sm text-slate-300">{feature.description}</p>
							</div>
						))}
					</div>
				</section>

				<section data-aos="fade-up" className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:p-8">
					<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
						<div>
							<p className="text-xs uppercase tracking-[0.2em] text-[#00D4FF]">Technical Specs</p>
							<h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Activation tied to your hardware footprint</h2>
						</div>
						<Cpu className="text-[#00D4FF]" />
					</div>
					<div className="mt-6 grid gap-4 md:grid-cols-2">
						<div className="rounded-2xl border border-white/10 bg-black/20 p-5">
							<h3 className="font-semibold text-white">Runtime Environments</h3>
							<p className="mt-2 text-sm text-slate-300">Desktop (Windows) and Android APK deployments with a unified local execution model.</p>
						</div>
						<div className="rounded-2xl border border-white/10 bg-black/20 p-5">
							<h3 className="font-semibold text-white">Local Machine ID Activation</h3>
							<p className="mt-2 text-sm text-slate-300">
								Each license is generated against a machine fingerprint, enabling secure activation and strict account-device binding.
							</p>
						</div>
						<div className="rounded-2xl border border-white/10 bg-black/20 p-5 md:col-span-2">
							<h3 className="inline-flex items-center gap-2 font-semibold text-white">
								<Globe size={16} className="text-[#00D4FF]" />
								Privacy, Security Warnings, and Setup Support
							</h3>
							<p className="mt-2 text-sm text-slate-300">
								Because these apps are installed outside official app stores, your system may show security warnings during download or installation.
								You can proceed after verification. Signal Forge Pro is local-first: data stays on your device, and we do not collect personal trading data.
							</p>
							<p className="mt-3 text-sm text-slate-300">
								For licensing and setup support, contact us at <a href="mailto:signalbotpro@gmail.com" className="text-[#7CEBFF] hover:text-white">signalbotpro@gmail.com</a> or Telegram <a href="https://t.me/SignalBotPr" target="_blank" rel="noreferrer" className="text-[#7CEBFF] hover:text-white">@SignalBotPr</a>.
							</p>
						</div>
					</div>
				</section>
			</main>

			<footer className="border-t border-white/10 py-8">
				<div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 text-sm text-slate-400 md:flex-row md:items-center md:justify-between md:px-8">
					<p>Built for Traders</p>
					<div className="flex items-center gap-5">
						<a href="#" className="transition hover:text-white">
							Documentation
						</a>
						<a href="#" className="transition hover:text-white">
							Support
						</a>
						<a href="#" className="inline-flex items-center gap-1 transition hover:text-[#00D4FF]">
							Download <ArrowRight size={14} />
						</a>
					</div>
				</div>
			</footer>

			{isWaiverOpen ? (
				<div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
					<div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/15 bg-[#0B0E11] p-6 shadow-2xl shadow-black/50 md:p-8">
						<div className="flex items-start justify-between gap-4">
							<div>
								<p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#00D4FF]">
									<AlertTriangle size={14} />
									Mandatory User Agreement
								</p>
								<h3 className="mt-2 text-2xl font-semibold text-white">Signal Forge Pro Risk Disclosure & Liability Waiver</h3>
								<p className="mt-2 text-sm text-slate-300">Applies to: {pendingDownloadLabel}</p>
							</div>
							<button
								type="button"
								onClick={() => setIsWaiverOpen(false)}
								className="rounded-xl border border-white/15 bg-white/5 p-2 text-slate-300 transition hover:text-white"
								aria-label="Close waiver"
							>
								<X size={16} />
							</button>
						</div>

						<div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-300">
							<section>
								<h4 className="font-semibold text-white">1) No Financial Advice</h4>
								<p>
									Signals, alerts, automation tools, and any related content delivered through Signal Forge Pro or associated channels (including Telegram)
									are provided strictly for software utility, educational, and process-automation purposes. Nothing provided constitutes investment, legal,
									tax, or financial advice, and Signal Forge Pro is not acting as a Registered Financial Advisor, broker-dealer, or fiduciary.
								</p>
							</section>
							<section>
								<h4 className="font-semibold text-white">2) No Guarantee of Profit or Performance</h4>
								<p>
									Cryptocurrency and derivatives trading involve substantial risk of loss. Market conditions are volatile and unpredictable. Past performance,
									backtests, historical data, and signal accuracy metrics are not guarantees of future performance. No representation or warranty is made that
									any user will achieve profits or avoid losses.
								</p>
							</section>
							<section>
								<h4 className="font-semibold text-white">3) Assumption of Risk and User Responsibility</h4>
								<p>
									By proceeding, you confirm that you trade exclusively with your own capital, at your sole discretion, and at your sole risk. You are fully
									responsible for trade execution decisions, exchange selection, leverage settings, API permissions, and risk controls. Signal Forge Pro and
									its operators shall not be liable for losses, liquidations, missed opportunities, or financial damages arising from your use of the software.
								</p>
							</section>
							<section>
								<h4 className="font-semibold text-white">4) Automation and Technical Systems Disclaimer</h4>
								<p>
									Automation features rely on third-party infrastructure and network conditions, including but not limited to exchange APIs, Telegram delivery,
									internet connectivity, operating system behavior, device resources, and service uptime. Delays, outages, execution drift, rejected orders,
									or software interruptions may occur. You agree to hold Signal Forge Pro harmless for losses or damages resulting from such technical factors.
								</p>
							</section>
							<section>
								<h4 className="font-semibold text-white">5) External Installation and Security Warnings</h4>
								<p>
									Because installation may occur outside official app marketplaces, your device or operating system may display security or publisher warnings.
									By continuing, you acknowledge this expected behavior and accept responsibility for installation decisions after your own verification.
								</p>
							</section>
							<section>
								<h4 className="font-semibold text-white">6) Data Handling and Privacy</h4>
								<p>
									Signal Forge Pro is designed with a local-first architecture. Core processing and stored data remain on your device environment.
									Signal Forge Pro does not collect personal trading account data through this landing flow.
								</p>
							</section>
							<section>
								<h4 className="font-semibold text-white">7) Limitation of Liability and Acceptance</h4>
								<p>
									To the maximum extent permitted by applicable law, Signal Forge Pro disclaims liability for direct, indirect, incidental, consequential,
									special, or exemplary damages related to software use, trading outcomes, or infrastructure failures. By selecting “I Accept & Continue,”
									you acknowledge that you have read, understood, and agreed to this Risk Disclosure & Liability Waiver.
								</p>
							</section>
						</div>

						<label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-200">
							<input
								type="checkbox"
								checked={acceptedWaiver}
								onChange={(event) => setAcceptedWaiver(event.target.checked)}
								className="mt-0.5 h-4 w-4 rounded border-white/30 bg-transparent accent-[#00D4FF]"
							/>
							<span>
								I have read and accepted the Signal Forge Pro Risk Disclosure & Liability Waiver. I understand that trading carries risk and I proceed at my own
								responsibility.
							</span>
						</label>

						<div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
							<button
								type="button"
								onClick={() => setIsWaiverOpen(false)}
								className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-slate-300 transition hover:text-white"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={confirmDownload}
								disabled={!acceptedWaiver}
								className="rounded-xl bg-[#00D4FF] px-5 py-2.5 text-sm font-semibold text-[#031017] transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
							>
								I Accept & Continue Download
							</button>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}
