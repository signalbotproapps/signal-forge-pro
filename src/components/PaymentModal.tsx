import { useState, useId } from 'react';
import { 
	X, 
	CheckCircle2, 
	Copy, 
	ShieldCheck, 
	Mail, 
	Send, 
	ArrowRight, 
	ArrowLeft,
	Loader2,
	RefreshCw,
} from 'lucide-react';

export type SubscriptionPlan = {
	id: string;
	name: string;
	duration: string;
	months: number;
	price: number;
	discountText?: string;
	monthlyRate: string;
	badge?: string;
	popular?: boolean;
	features: string[];
};

export const subscriptionPlans: SubscriptionPlan[] = [
	{
		id: '1-month',
		name: 'Starter Pass',
		duration: '1 Month',
		months: 1,
		price: 99,
		monthlyRate: '$99 / mo',
		features: [
			'Signal Forge Pro Desktop Full License',
			'Grok Desk AI Neural Workstation',
			'Signal Forge Pro Mobile Companion',
			'VIP Telegram Signal Alerts Room',
			'Standard 24/7 Support Channel',
		],
	},
	{
		id: '3-months',
		name: 'Quarterly Trader',
		duration: '3 Months',
		months: 3,
		price: 285,
		discountText: '4% Discount (Save $12)',
		monthlyRate: '$95 / mo',
		badge: '4% OFF',
		features: [
			'All 3 Trading Apps Included',
			'Sub-millisecond Local Execution Kernel',
			'Grok AI Market Sentiment & Heatmaps',
			'Priority Telegram VIP Community',
			'Direct License Replacement Guarantee',
		],
	},
	{
		id: '6-months',
		name: 'Semi-Annual Pro',
		duration: '6 Months',
		months: 6,
		price: 540,
		discountText: '9% Discount (Save $54)',
		monthlyRate: '$90 / mo',
		badge: 'Most Popular',
		popular: true,
		features: [
			'All 3 Trading Apps & Full Source Updates',
			'Hardware-locked Multi-device Transfer (1x)',
			'Dedicated Strategy Optimization Guidance',
			'Direct Binance API Webhook Integration',
			'Priority 1-on-1 Setup Assistance',
		],
	},
	{
		id: '12-months',
		name: 'Annual VIP Mastery',
		duration: '12 Months',
		months: 12,
		price: 1010,
		discountText: '15% Discount (Save $178)',
		monthlyRate: '$84.17 / mo',
		badge: 'Best Value • 15% OFF',
		features: [
			'Full Annual Triad Access (Desktop + Grok + Mobile)',
			'Exclusive Institutional Liquidity Feeds',
			'Lifetime HWID Migration Security',
			'VIP Founder Telegram Private Channel',
			'Free Major Version Upgrades Guaranteed',
		],
	},
];

interface PaymentModalProps {
	isOpen: boolean;
	onClose: () => void;
	baseUrl: string;
	initialPlanId?: string;
}

export default function PaymentModal({ isOpen, onClose, baseUrl, initialPlanId = '6-months' }: PaymentModalProps) {
	const [selectedPlanId, setSelectedPlanId] = useState<string>(initialPlanId);
	const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Select Plan, 2: Trader Details, 3: Binance Pay, 4: Confirmed & Dispatch
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [telegramUsername, setTelegramUsername] = useState('');
	const [hardwareId, setHardwareId] = useState('');
	const [referralEmail, setReferralEmail] = useState('');
	const [txId, setTxId] = useState('');
	const [copiedField, setCopiedField] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submittedToCrm, setSubmittedToCrm] = useState(false);
	const [crmSubmitError, setCrmSubmitError] = useState<string | null>(null);

	const submitToRelay = async (customTxId?: string) => {
		setIsSubmitting(true);
		setCrmSubmitError(null);

		const activeTx = customTxId !== undefined ? customTxId : txId;
		
		let packageCode = 'SEMI_ANNUAL';
		if (selectedPlan.id === '1-month') packageCode = 'MONTHLY';
		else if (selectedPlan.id === '3-months') packageCode = 'QUARTERLY';
		else if (selectedPlan.id === '6-months') packageCode = 'SEMI_ANNUAL';
		else if (selectedPlan.id === '12-months') packageCode = 'ANNUAL';

		const payload = {
			name: fullName.trim(),
			email: email.trim(),
			telegram: telegramUsername.trim(),
			hwid: hardwareId.trim(),
			packageId: packageCode,
			amountPaid: selectedPlan.price,
			txId: activeTx.trim() || 'Paid via Binance App',
			referralEmail: referralEmail.trim(),
			orderRef: fullOrderNumber
		};

		try {
			const res = await fetch('https://signalforge-relay.signalbotpro.workers.dev/submit', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});

			const data = await res.json();
			if (data.success) {
				setSubmittedToCrm(true);
			} else {
				setCrmSubmitError(data.error || 'Failed to queue order');
			}
		} catch (err) {
			setCrmSubmitError('Network notice: Dispatched via local fallback.');
		} finally {
			setIsSubmitting(false);
		}
	};

	const selectedPlan = subscriptionPlans.find((p) => p.id === selectedPlanId) || subscriptionPlans[2];

	const resolveUrl = (path: string) => {
		if (path.startsWith('http')) return path;
		const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
		const cleanPath = path.startsWith('/') ? path : `/${path}`;
		return `${cleanBase}${cleanPath}`;
	};

	const copyToClipboard = (text: string, fieldId: string) => {
		navigator.clipboard.writeText(text);
		setCopiedField(fieldId);
		setTimeout(() => setCopiedField(null), 2500);
	};

	// Generate a clean alphanumeric order reference code
	const rawId = useId().replace(/[^a-zA-Z0-9]/g, '').slice(0, 6).toUpperCase();
	const fullOrderNumber = `SFP-${new Date().getFullYear()}-${rawId || '789X2'}`;

	const emailSubject = `[SUBSCRIPTION PAYMENT] ${selectedPlan.name} ($${selectedPlan.price} USDT) - ${fullName || 'New Subscriber'}`;
	
	const emailBodyText = `Hello Signal Forge Pro & Grok Desk Team,

I have completed the Binance Pay transfer for my software subscription. Please find my order and activation details below:

==========================================
ORDER REFERENCE: ${fullOrderNumber}
SUBSCRIPTION PLAN: ${selectedPlan.name} (${selectedPlan.duration})
AMOUNT PAID: ${selectedPlan.price} USDT
==========================================

SUBSCRIBER DETAILS:
- Full Name: ${fullName}
- Contact Email: ${email}
- Telegram Username: ${telegramUsername || 'N/A'}
- Machine Hardware ID (HWID): ${hardwareId || 'Pending initial launch / provided upon setup'}
- Referral Email (Registered Member): ${referralEmail || 'None'}

PAYMENT VERIFICATION:
- Payment Method: Binance Pay App
- Recipient Binance Nickname: Rasom_Atif
- Binance TxID / Payee Nickname: ${txId || 'Paid via Binance App'}
- Date/Time: ${new Date().toUTCString()}

Please verify the transaction and generate my Hardware License Key for Signal Forge Pro & Grok Desk.

Thank you!`;

	const mailtoLink = `mailto:signalbotpro@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBodyText)}`;
	const telegramMessageLink = `https://t.me/SignalBotPr?text=${encodeURIComponent(
		`⚡ NEW PAYMENT VERIFICATION (${fullOrderNumber})\n\nPlan: ${selectedPlan.name} ($${selectedPlan.price} USDT)\nName: ${fullName}\nEmail: ${email}\nTelegram: ${telegramUsername || 'N/A'}\nHWID: ${hardwareId || 'Pending'}\nReferral Member: ${referralEmail || 'None'}\nTxID: ${txId || 'Paid via Binance Pay'}\n\nPlease issue my license key!`
	)}`;

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-md overflow-y-auto">
			<div className="relative my-8 w-full max-w-4xl rounded-3xl border border-white/20 bg-[#080d1a] p-5 sm:p-8 shadow-[0_0_80px_rgba(0,212,255,0.25)] text-slate-100 max-h-[92vh] overflow-y-auto">
				{/* Modal Close Button */}
				<button
					type="button"
					onClick={onClose}
					className="absolute top-5 right-5 rounded-xl border border-white/10 bg-white/5 p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
					aria-label="Close"
				>
					<X size={20} />
				</button>

				{/* Modal Header & Progress Indicator */}
				<div className="border-b border-white/10 pb-5">
					<div className="flex items-center gap-2 text-xs font-mono-numbers text-[#00F59B] uppercase tracking-wider">
						<span className="flex h-2 w-2 rounded-full bg-[#00F59B] animate-ping" />
						SECURE BINANCE PAY GATEWAY
					</div>
					<h2 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-white">
						Subscribe to Signal Forge Pro & Grok Desk
					</h2>
					<p className="mt-1 text-xs sm:text-sm text-slate-300">
						Unlocks full on-device execution, Grok neural AI workstation, and local hardware licensing.
					</p>

					{/* 4-Step Flow Breadcrumbs */}
					<div className="mt-5 grid grid-cols-4 gap-2 text-center text-xs font-mono-numbers">
						<div className={`rounded-xl py-2 px-1 border transition-all ${step === 1 ? 'border-[#00F59B] bg-[#00F59B]/15 text-[#00F59B] font-bold' : step > 1 ? 'border-white/20 bg-white/5 text-slate-300' : 'border-white/5 text-slate-500'}`}>
							1. Select Plan
						</div>
						<div className={`rounded-xl py-2 px-1 border transition-all ${step === 2 ? 'border-[#00D4FF] bg-[#00D4FF]/15 text-[#00D4FF] font-bold' : step > 2 ? 'border-white/20 bg-white/5 text-slate-300' : 'border-white/5 text-slate-500'}`}>
							2. Your Details
						</div>
						<div className={`rounded-xl py-2 px-1 border transition-all ${step === 3 ? 'border-[#F59E0B] bg-[#F59E0B]/15 text-[#F59E0B] font-bold' : step > 3 ? 'border-white/20 bg-white/5 text-slate-300' : 'border-white/5 text-slate-500'}`}>
							3. Binance Pay
						</div>
						<div className={`rounded-xl py-2 px-1 border transition-all ${step === 4 ? 'border-[#A855F7] bg-[#A855F7]/15 text-[#A855F7] font-bold' : 'border-white/5 text-slate-500'}`}>
							4. Verification
						</div>
					</div>
				</div>

				{/* STEP 1: Plan Selection */}
				{step === 1 && (
					<div className="mt-6 space-y-6">
						<div>
							<h3 className="text-lg font-bold text-white font-display">Choose Subscription Term</h3>
							<p className="text-xs text-slate-400">All packages grant complete access to both Desktop Apps and Mobile node.</p>
						</div>

						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
							{subscriptionPlans.map((plan) => {
								const isSelected = plan.id === selectedPlanId;
								return (
									<div
										key={plan.id}
										onClick={() => setSelectedPlanId(plan.id)}
										className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 relative flex flex-col justify-between ${
											isSelected
												? 'border-[#00F59B] bg-gradient-to-b from-[#00F59B]/15 via-white/[0.05] to-black/60 shadow-[0_0_30px_rgba(0,245,155,0.25)] scale-[1.02]'
												: 'border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]'
										}`}
									>
										{plan.badge && (
											<span className={`absolute -top-2.5 right-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide border shadow-sm ${
												plan.popular
													? 'bg-[#00F59B] text-black border-[#00F59B]'
													: 'bg-[#A855F7] text-white border-[#A855F7]'
											}`}>
												{plan.badge}
											</span>
										)}

										<div>
											<p className="text-sm font-bold text-white">{plan.name}</p>
											<p className="text-xs text-slate-400 font-mono-numbers">{plan.duration}</p>
											
											<div className="mt-3">
												<span className="font-display text-2xl font-black text-white">${plan.price}</span>
												<span className="text-xs text-slate-400 font-mono-numbers ml-1">USDT</span>
											</div>
											<p className="text-[11px] font-mono-numbers text-[#00D4FF] mt-0.5">{plan.monthlyRate}</p>
											{plan.discountText && (
												<p className="text-[10px] text-[#00F59B] font-semibold mt-1">{plan.discountText}</p>
											)}
										</div>

										<div className="mt-4 pt-3 border-t border-white/10 text-xs">
											<div className={`w-full py-1.5 rounded-lg text-center font-bold text-[11px] uppercase tracking-wider transition ${
												isSelected ? 'bg-[#00F59B] text-black' : 'bg-white/10 text-slate-300'
											}`}>
												{isSelected ? 'Selected' : 'Choose Plan'}
											</div>
										</div>
									</div>
								);
							})}
						</div>

						{/* Plan Feature Summary Box */}
						<div className="rounded-2xl border border-white/10 bg-black/40 p-4 sm:p-5">
							<h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono-numbers mb-2.5">
								Included in {selectedPlan.name} (${selectedPlan.price} USDT):
							</h4>
							<div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-300">
								{selectedPlan.features.map((feature, i) => (
									<div key={i} className="flex items-center gap-2">
										<CheckCircle2 size={14} className="text-[#00F59B] shrink-0" />
										<span>{feature}</span>
									</div>
								))}
							</div>
						</div>

						<div className="flex justify-end pt-2">
							<button
								type="button"
								onClick={() => setStep(2)}
								className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#00F59B] to-[#00D4FF] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#050811] shadow-[0_0_25px_rgba(0,245,155,0.4)] transition hover:brightness-110 active:scale-95"
							>
								Next: Enter Trader Details
								<ArrowRight size={15} />
							</button>
						</div>
					</div>
				)}

				{/* STEP 2: Subscriber Details */}
				{step === 2 && (
					<div className="mt-6 space-y-6">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-lg font-bold text-white font-display">Subscriber & License Information</h3>
								<p className="text-xs text-slate-400">Where should we deliver your activation keys and Telegram room invitation?</p>
							</div>
							<div className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-right font-mono-numbers">
								<span className="text-[10px] text-slate-400 block">Selected:</span>
								<span className="text-xs font-bold text-[#00F59B]">{selectedPlan.name} • ${selectedPlan.price} USDT</span>
							</div>
						</div>

						<div className="grid gap-4 sm:grid-cols-2">
							<div>
								<label className="block text-xs font-semibold text-slate-300 mb-1.5">
									Full Name <span className="text-[#00F59B]">*</span>
								</label>
								<input
									type="text"
									required
									value={fullName}
									onChange={(e) => setFullName(e.target.value)}
									placeholder="e.g. Alex Morgan"
									className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#00F59B] focus:outline-none"
								/>
							</div>

							<div>
								<label className="block text-xs font-semibold text-slate-300 mb-1.5">
									Email Address <span className="text-[#00F59B]">*</span>
								</label>
								<input
									type="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="e.g. alex@tradingfirm.com"
									className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#00F59B] focus:outline-none"
								/>
							</div>

							<div>
								<label className="block text-xs font-semibold text-slate-300 mb-1.5">
									Telegram Username <span className="text-slate-500">(Optional for VIP room access)</span>
								</label>
								<input
									type="text"
									value={telegramUsername}
									onChange={(e) => setTelegramUsername(e.target.value)}
									placeholder="e.g. @AlexTrader"
									className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#00D4FF] focus:outline-none"
								/>
							</div>

							<div>
								<label className="block text-xs font-semibold text-slate-300 mb-1.5">
									Machine Hardware ID <span className="text-slate-500">(Optional - can send later)</span>
								</label>
								<input
									type="text"
									value={hardwareId}
									onChange={(e) => setHardwareId(e.target.value)}
									placeholder="e.g. HWID-4892-BA49-X"
									className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#A855F7] focus:outline-none font-mono-numbers"
								/>
							</div>

							<div className="sm:col-span-2">
								<label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
									<span>Referral Email (Registered Member&apos;s Email)</span>
									<span className="text-slate-500 font-normal">Optional</span>
								</label>
								<input
									type="email"
									value={referralEmail}
									onChange={(e) => setReferralEmail(e.target.value)}
									placeholder="e.g. member@tradingfirm.com"
									className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#F59E0B] focus:outline-none"
								/>
								<p className="mt-1 text-[11px] text-slate-400">
									If you were invited or referred by an existing registered subscriber, enter their email address here so we can credit their rewards.
								</p>
							</div>
						</div>

						<div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs text-slate-400 flex items-start gap-2.5">
							<ShieldCheck size={16} className="text-[#00F59B] shrink-0 mt-0.5" />
							<span>
								Your Machine ID binds cryptographically to your machine so no external server can access your trade logic or Binance API keys. If you haven&apos;t installed the app yet, you can leave it blank and send it to us anytime after downloading.
							</span>
						</div>

						<div className="flex items-center justify-between pt-2">
							<button
								type="button"
								onClick={() => setStep(1)}
								className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
							>
								<ArrowLeft size={14} /> Back to Plans
							</button>

							<button
								type="button"
								disabled={!fullName.trim() || !email.trim() || !email.includes('@')}
								onClick={() => setStep(3)}
								className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#00F59B] to-[#00D4FF] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#050811] shadow-[0_0_25px_rgba(0,245,155,0.4)] transition hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
							>
								Proceed to Binance Pay
								<ArrowRight size={15} />
							</button>
						</div>
					</div>
				)}

				{/* STEP 3: Binance Scan & Pay */}
				{step === 3 && (
					<div className="mt-6 space-y-6">
						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-lg font-bold text-white font-display">Scan with Binance App to Pay</h3>
								<p className="text-xs text-slate-400">Open your Binance mobile app and scan the code below.</p>
							</div>
							<div className="rounded-xl border border-white/10 bg-black/50 px-3 py-1.5 text-right font-mono-numbers">
								<span className="text-[10px] text-slate-400 block">Total Due:</span>
								<span className="text-sm font-black text-[#F59E0B]">{selectedPlan.price} USDT</span>
							</div>
						</div>

						<div className="grid gap-6 lg:grid-cols-12 items-center">
							{/* Official Binance QR Code Card */}
							<div className="lg:col-span-6 flex flex-col items-center justify-center rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-black/60 to-black/80 p-5 shadow-[0_0_35px_rgba(245,158,11,0.2)]">
								<div className="relative overflow-hidden rounded-2xl border-2 border-white/20 bg-white p-2 shadow-2xl max-w-[280px]">
									<img
										src={resolveUrl('/images/binance-pay-qr.jpg')}
										alt="Binance Pay QR Code"
										className="w-full h-auto rounded-xl object-contain"
									/>
								</div>
								<p className="mt-3 font-mono-numbers text-xs font-bold text-amber-300">
									Binance Nickname: Rasom_Atif
								</p>
							</div>

							{/* Payment Instructions & Copy Fields */}
							<div className="lg:col-span-6 space-y-4">
								<div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-3">
									<h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono-numbers">
										Payment Details
									</h4>

									{/* Amount to Send */}
									<div className="flex items-center justify-between rounded-xl bg-white/5 p-2.5 border border-white/5">
										<div>
											<span className="text-[10px] text-slate-400 block">Exact Transfer Amount:</span>
											<span className="font-mono-numbers font-black text-lg text-[#00F59B]">
												{selectedPlan.price} USDT
											</span>
										</div>
										<button
											type="button"
											onClick={() => copyToClipboard(selectedPlan.price.toString(), 'amount')}
											className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/20 transition"
										>
											<Copy size={13} />
											{copiedField === 'amount' ? 'Copied!' : 'Copy'}
										</button>
									</div>

									{/* Binance Payee / ID */}
									<div className="flex items-center justify-between rounded-xl bg-white/5 p-2.5 border border-white/5">
										<div>
											<span className="text-[10px] text-slate-400 block">Payee Nickname:</span>
											<span className="font-mono-numbers font-bold text-sm text-white">
												Rasom_Atif
											</span>
										</div>
										<button
											type="button"
											onClick={() => copyToClipboard('Rasom_Atif', 'payee')}
											className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/20 transition"
										>
											<Copy size={13} />
											{copiedField === 'payee' ? 'Copied!' : 'Copy'}
										</button>
									</div>

									{/* Order Reference */}
									<div className="flex items-center justify-between rounded-xl bg-white/5 p-2.5 border border-white/5">
										<div>
											<span className="text-[10px] text-slate-400 block">Order Reference ID:</span>
											<span className="font-mono-numbers font-bold text-xs text-[#00D4FF]">
												{fullOrderNumber}
											</span>
										</div>
										<button
											type="button"
											onClick={() => copyToClipboard(fullOrderNumber, 'orderRef')}
											className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/20 transition"
										>
											<Copy size={13} />
											{copiedField === 'orderRef' ? 'Copied!' : 'Copy'}
										</button>
									</div>
								</div>

								<div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs text-slate-400 space-y-1">
									<p className="font-semibold text-white">Quick Steps:</p>
									<p>1. Open Binance App ➔ Tap QR icon ➔ Scan image.</p>
									<p>2. Send <strong>{selectedPlan.price} USDT</strong> to <strong>Rasom_Atif</strong>.</p>
									<p>3. Once confirmed in Binance, click the green button below.</p>
								</div>
							</div>
						</div>

						<div className="flex items-center justify-between pt-2 border-t border-white/10">
							<button
								type="button"
								onClick={() => setStep(2)}
								className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
							>
								<ArrowLeft size={14} /> Back
							</button>

							<button
								type="button"
								onClick={() => { setStep(4); submitToRelay(); }}
								className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#00F59B] to-[#00D4FF] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#050811] shadow-[0_0_30px_rgba(0,245,155,0.45)] transition hover:brightness-110 active:scale-95"
							>
								<CheckCircle2 size={16} />
								I Have Completed Payment
							</button>
						</div>
					</div>
				)}

				{/* STEP 4: Instant Confirmation & Dispatch */}
				{step === 4 && (
					<div className="mt-6 space-y-6">
						<div className="rounded-2xl border border-[#00F59B]/40 bg-[#00F59B]/10 p-5 text-center space-y-2">
							<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00F59B] text-black">
								<CheckCircle2 size={28} />
							</div>
							<h3 className="font-display text-xl font-bold text-white">
								Thank You, {fullName}! Let&apos;s Activate Your License
							</h3>
							<p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
								Your order reference is <strong className="text-[#00F59B] font-mono-numbers">{fullOrderNumber}</strong>. Your license request is automatically ingested into our CRM desk and can also be verified via Email or Telegram.
							</p>
						</div>

						{/* Automated Direct Intake Status Card */}
						<div className={`rounded-2xl border p-4 transition-all ${
							submittedToCrm
								? 'border-[#00F59B]/50 bg-gradient-to-r from-[#00F59B]/10 via-black/40 to-[#00D4FF]/10 shadow-[0_0_30px_rgba(0,245,155,0.15)]'
								: crmSubmitError
								? 'border-amber-500/40 bg-amber-500/10'
								: 'border-white/10 bg-white/[0.03]'
						}`}>
							<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
								<div className="flex items-start gap-3">
									<div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
										submittedToCrm
											? 'bg-[#00F59B] text-black shadow-lg shadow-[#00F59B]/20'
											: isSubmitting
											? 'bg-[#00D4FF]/20 text-[#00D4FF] animate-spin'
											: 'bg-white/10 text-white'
									}`}>
										{submittedToCrm ? (
											<CheckCircle2 size={22} />
										) : isSubmitting ? (
											<Loader2 size={20} />
										) : (
											<Send size={18} />
										)}
									</div>
									<div>
										<div className="flex items-center gap-2">
											<span className="text-xs font-bold uppercase tracking-wider text-white font-mono-numbers">
												AUTOMATED LICENSE INTAKE QUEUE
											</span>
											{submittedToCrm && (
												<span className="rounded-full bg-[#00F59B]/20 border border-[#00F59B]/40 px-2 py-0.5 text-[10px] font-bold text-[#00F59B] font-mono-numbers">
													RECEIVED & BUFFERED
												</span>
											)}
										</div>
										<p className="mt-0.5 text-xs text-slate-300">
											{submittedToCrm
												? `Order #${fullOrderNumber} safely dispatched to ForgeDesk CRM. Autonomous Binance Spot verification in progress.`
												: isSubmitting
												? 'Transmitting encrypted application to 24/7 serverless queue buffer...'
												: crmSubmitError
												? `Queue notice: ${crmSubmitError}. You can retry or use the direct Email/Telegram buttons below.`
												: 'Your order details will be automatically ingested into our operations desk.'}
										</p>
									</div>
								</div>

								<button
									type="button"
									disabled={isSubmitting}
									onClick={() => submitToRelay()}
									className={`shrink-0 inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
										submittedToCrm
											? 'border border-white/15 bg-white/5 text-slate-300 hover:bg-white/10'
											: 'bg-gradient-to-r from-[#00F59B] to-[#00D4FF] text-[#050811] hover:brightness-110 shadow-md'
									} disabled:opacity-50`}
								>
									{isSubmitting ? (
										<>
											<Loader2 size={13} className="animate-spin" /> Transmitting...
										</>
									) : submittedToCrm ? (
										<>
											<RefreshCw size={13} /> Update / Resync
										</>
									) : (
										<>
											<Send size={13} /> Submit to Desk
										</>
									)}
								</button>
							</div>
						</div>

						{/* Transaction ID Input */}
						<div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-2">
							<label className="block text-xs font-semibold text-slate-300">
								Binance Transaction ID / TxID / Your Binance Nickname <span className="text-slate-500">(Recommended for fastest matching)</span>
							</label>
							<input
								type="text"
								value={txId}
								onChange={(e) => setTxId(e.target.value)}
								placeholder="e.g. 293847291 or Binance Nickname"
								className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#00F59B] focus:outline-none font-mono-numbers"
							/>
						</div>

						{/* Dual Dispatch Channels (Email + Telegram) */}
						<div className="grid gap-4 sm:grid-cols-2">
							{/* Channel 1: Launch Email */}
							<div className="rounded-2xl border border-white/15 bg-white/[0.03] p-5 flex flex-col justify-between space-y-4">
								<div>
									<div className="flex items-center gap-2 text-xs font-bold text-[#00D4FF] font-mono-numbers uppercase">
										<Mail size={16} /> CHANNEL 1: EMAIL DISPATCH
									</div>
									<h4 className="mt-1 font-bold text-white text-base">Send via Your Email Client</h4>
									<p className="mt-1 text-xs text-slate-400">
										Opens Gmail, Outlook, or Apple Mail with your verification note pre-filled to <span className="text-slate-200">signalbotpro@gmail.com</span>.
									</p>
								</div>

								<div className="space-y-2">
									<a
										href={mailtoLink}
										className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#00F59B] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#050811] transition hover:brightness-110 active:scale-95 shadow-md"
									>
										<Mail size={15} /> Launch Email Client
									</a>
									<button
										type="button"
										onClick={() => copyToClipboard(emailBodyText, 'fullEmail')}
										className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10 transition"
									>
										<Copy size={13} />
										{copiedField === 'fullEmail' ? 'Copied Email Template!' : 'Copy Email Text Manually'}
									</button>
								</div>
							</div>

							{/* Channel 2: Telegram Instant Dispatch */}
							<div className="rounded-2xl border border-[#00F59B]/30 bg-[#00F59B]/5 p-5 flex flex-col justify-between space-y-4">
								<div>
									<div className="flex items-center gap-2 text-xs font-bold text-[#00F59B] font-mono-numbers uppercase">
										<Send size={16} /> CHANNEL 2: TELEGRAM DIRECT
									</div>
									<h4 className="mt-1 font-bold text-white text-base">Instant Dispatch to @SignalBotPr</h4>
									<p className="mt-1 text-xs text-slate-400">
										Send order details directly to our Telegram operator for immediate license file generation.
									</p>
								</div>

								<a
									href={telegramMessageLink}
									target="_blank"
									rel="noopener noreferrer"
									className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#00F59B] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#050811] transition hover:brightness-110 active:scale-95 shadow-md"
								>
									<Send size={15} /> Message @SignalBotPr on Telegram
								</a>
							</div>
						</div>

						{/* Pre-formatted Message Preview */}
						<div className="rounded-2xl border border-white/10 bg-black/60 p-4">
							<div className="flex items-center justify-between text-xs font-mono-numbers text-slate-400 border-b border-white/10 pb-2 mb-2">
								<span>PRE-GENERATED VERIFICATION NOTE</span>
								<span className="text-[#00F59B]">signalbotpro@gmail.com</span>
							</div>
							<pre className="font-mono-numbers text-[11px] leading-relaxed text-slate-300 overflow-x-auto whitespace-pre-wrap">
								{emailBodyText}
							</pre>
						</div>

						<div className="flex justify-end pt-2">
							<button
								type="button"
								onClick={onClose}
								className="rounded-xl border border-white/15 bg-white/5 px-6 py-2.5 text-xs font-semibold text-slate-300 hover:text-white transition"
							>
								Done & Return to Site
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
