export type AppLink = {
    id: string;
    name: string;
    tagline: string;
    description: string;
    platform: 'Windows' | 'Android';
    category: 'Desktop Engine' | 'AI Workstation' | 'Mobile Companion';
    version: string;
    size: string;
    href: string;
    recommended?: boolean;
    badge?: string;
    accentColor: string;
    glowColor: string;
    iconImage: string;
    previewImage: string;
    highlights: string[];
    minSpecs: string;
};

export const appLinks: AppLink[] = [
    {
        id: 'signal-forge-pro-desktop',
        name: 'Signal Forge Pro Desktop',
        tagline: 'High-Frequency Quantitative Execution Engine',
        description: 'Ultra-low latency local trading terminal with automated strategy routing, hardware-bound security, and sub-millisecond execution channels.',
        platform: 'Windows',
        category: 'Desktop Engine',
        version: 'v2.4.1',
        size: '148 MB',
        href: 'https://github.com/signalbotproapps/signal-forge-pro/releases/download/v2.4.1/SignalForgePro_Setup.exe',
        recommended: true,
        badge: 'Flagship Core',
        accentColor: '#00F59B',
        glowColor: 'rgba(0, 245, 155, 0.35)',
        iconImage: '/signal-forge-logo.png',
        previewImage: '/images/desktop-trading-3d.jpg',
        highlights: [
            'Zero-cloud local trade logic & on-device latency engine',
            'Direct Binance & exchange webhook integration routing',
            'Hardware-locked Machine ID activation without telemetry risk',
            'Real-time multi-pair order book and volatility matrix'
        ],
        minSpecs: 'Windows 10/11 (64-bit), 8GB RAM, Core i5 or higher'
    },
    {
        id: 'grok-desk',
        name: 'Grok Desk',
        tagline: 'Autonomous AI Neural Trading Workstation',
        description: 'Next-generation AI trading cockpit featuring Grok-powered neural reasoning, deep sentiment heatmaps, automated order book liquidity sweeps, and multi-agent market intelligence.',
        platform: 'Windows',
        category: 'AI Workstation',
        version: 'v1.4.0',
        size: '168 MB',
        href: 'https://github.com/signalbotproapps/signal-forge-pro/releases/download/v2.4.1/GrokDesk_Setup.exe',
        badge: 'New AI Release',
        accentColor: '#A855F7',
        glowColor: 'rgba(168, 85, 247, 0.4)',
        iconImage: '/images/grok-desk-logo.jpg',
        previewImage: '/images/grok-desk-3d.jpg',
        highlights: [
            'Grok neural reasoning model for market sentiment & narrative decoding',
            'Real-time institutional liquidity heatmap & order block detection',
            'Self-adapting risk parameters powered by continuous reinforcement learning',
            'Multi-window cybernetic HUD workstation with customized layout presets'
        ],
        minSpecs: 'Windows 10/11 (64-bit), 16GB RAM, Dedicated GPU recommended'
    },
    {
        id: 'signal-forge-pro-mobile',
        name: 'Signal Forge Pro Mobile',
        tagline: 'Portable Signal Monitor & Execution Node',
        description: 'Command center in your pocket. Real-time Telegram signal bridge, instant one-tap order verification, and foreground encrypted execution monitoring.',
        platform: 'Android',
        category: 'Mobile Companion',
        version: 'v2.4.1',
        size: '120 MB',
        href: 'https://github.com/signalbotproapps/signal-forge-pro/releases/download/v2.4.1/SignalForgePro.apk',
        badge: 'Android Beta',
        accentColor: '#00D4FF',
        glowColor: 'rgba(0, 212, 255, 0.35)',
        iconImage: '/signal-forge-logo.png',
        previewImage: '/images/mobile-trading-3d.jpg',
        highlights: [
            'Ultra-fast push notification and Telegram alert interception',
            'Foreground trade confirmation bridge for Binance accounts',
            'Encrypted local storage with biometric authentication',
            'Lightweight on-device telemetry and battery-aware synchronization'
        ],
        minSpecs: 'Android 10.0+ (ARM64), 4GB RAM minimum'
    },
];