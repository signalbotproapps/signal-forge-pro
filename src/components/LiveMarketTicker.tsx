import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Activity, Zap } from 'lucide-react';

interface TickerItem {
	pair: string;
	price: string;
	change: string;
	isPositive: boolean;
	tag?: string;
}

const initialTickers: TickerItem[] = [
	{ pair: 'BTC/USDT', price: '64,845.20', change: '+3.48%', isPositive: true, tag: 'HIGH VOL' },
	{ pair: 'ETH/USDT', price: '3,492.15', change: '+2.19%', isPositive: true },
	{ pair: 'SOL/USDT', price: '158.74', change: '+6.82%', isPositive: true, tag: 'BREAKOUT' },
	{ pair: 'GROK/AI', price: '42.60', change: '+18.45%', isPositive: true, tag: 'AI SURGE' },
	{ pair: 'EUR/USD', price: '1.0892', change: '-0.14%', isPositive: false },
	{ pair: 'XAU/USD', price: '2,654.80', change: '+1.05%', isPositive: true },
	{ pair: 'GBP/JPY', price: '194.32', change: '-0.38%', isPositive: false },
	{ pair: 'NVDA/USD', price: '128.40', change: '+4.12%', isPositive: true, tag: 'MOMENTUM' },
];

export default function LiveMarketTicker() {
	const [tickers, setTickers] = useState<TickerItem[]>(initialTickers);
	const [updatedIndex, setUpdatedIndex] = useState<number | null>(null);

	// Periodic micro-tick simulation
	useEffect(() => {
		const interval = setInterval(() => {
			const randomIndex = Math.floor(Math.random() * initialTickers.length);
			setTickers((prev) => {
				const next = [...prev];
				const current = next[randomIndex];
				const currentNum = parseFloat(current.price.replace(',', ''));
				const deltaPercent = (Math.random() * 0.4 - 0.18) / 100;
				const newPriceNum = currentNum * (1 + deltaPercent);
				const formattedPrice = current.pair.includes('EUR') || current.pair.includes('GBP')
					? newPriceNum.toFixed(4)
					: newPriceNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

				const isUp = deltaPercent >= 0;
				const changeNum = parseFloat(current.change.replace('%', '').replace('+', '')) + deltaPercent * 10;

				next[randomIndex] = {
					...current,
					price: formattedPrice,
					change: `${changeNum >= 0 ? '+' : ''}${changeNum.toFixed(2)}%`,
					isPositive: isUp,
				};
				return next;
			});

			setUpdatedIndex(randomIndex);
			const timer = setTimeout(() => setUpdatedIndex(null), 800);
			return () => clearTimeout(timer);
		}, 2600);

		return () => clearInterval(interval);
	}, []);

	// Repeat array to ensure smooth continuous marquee loop
	const displayTickers = [...tickers, ...tickers];

	return (
		<div className="relative z-40 border-y border-white/[0.08] bg-[#070b16]/90 backdrop-blur-md py-2 overflow-hidden">
			<div className="mx-auto flex w-full max-w-7xl items-center px-4">
				{/* Fixed Left Status Indicator */}
				<div className="hidden sm:flex shrink-0 items-center gap-2 border-r border-white/10 pr-4 text-xs font-medium text-slate-400">
					<span className="relative flex h-2 w-2">
						<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00F59B] opacity-75" />
						<span className="relative inline-flex h-2 w-2 rounded-full bg-[#00F59B]" />
					</span>
					<span className="text-[#00F59B] font-semibold tracking-wider font-mono-numbers text-[11px] uppercase">
						QUANT FEED
					</span>
					<span className="text-[10px] text-slate-500">• 0.4ms</span>
				</div>

				{/* Scrolling Marquee Stream */}
				<div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
					<div className="flex animate-ticker shrink-0 items-center gap-6 whitespace-nowrap pl-4">
						{displayTickers.map((item, idx) => {
							const isFlash = updatedIndex === idx % tickers.length;
							return (
								<div
									key={`${item.pair}-${idx}`}
									className={`inline-flex items-center gap-2.5 rounded-lg px-2.5 py-1 text-xs transition-colors duration-500 font-mono-numbers ${
										isFlash
											? item.isPositive
												? 'bg-[#00F59B]/20 text-[#00F59B]'
												: 'bg-[#FF3366]/20 text-[#FF3366]'
											: 'bg-white/[0.02] text-slate-300 hover:bg-white/[0.06]'
									}`}
								>
									<span className="font-semibold text-white tracking-wide">{item.pair}</span>
									<span className="text-slate-200">{item.price}</span>
									<span
										className={`inline-flex items-center gap-0.5 text-[11px] font-semibold ${
											item.isPositive ? 'text-[#00F59B]' : 'text-[#FF3366]'
										}`}
									>
										{item.isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
										{item.change}
									</span>
									{item.tag && (
										<span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-medium tracking-wider text-[#00D4FF]">
											{item.tag}
										</span>
									)}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
