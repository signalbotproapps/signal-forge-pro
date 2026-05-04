export type AppLink = {
	name: string;
	platform: 'Windows' | 'Android';
	version: string;
	size: string;
	href: string;
	recommended?: boolean;
};

export const appLinks: AppLink[] = [
	{
		name: 'Signal Forge Pro Desktop',
		platform: 'Windows',
		version: 'v2.4.1',
		size: '148 MB',
		href: 'https://github.com/your-org/signal-forge-pro/releases/latest',
		recommended: true,
	},
	{
		name: 'Signal Forge Pro Mobile',
		platform: 'Android',
		version: 'v2.4.1',
		size: '86 MB',
		href: 'https://github.com/your-org/signal-forge-pro-mobile/releases/latest',
	},
];
