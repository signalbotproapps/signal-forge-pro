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
        href: 'https://github.com/signalbotproapps/signal-forge-pro/releases/download/v2.4.1/SignalForgePro_Setup.exe',
        recommended: true,
    },
    {
        name: 'Signal Forge Pro Mobile',
        platform: 'Android',
        version: 'v2.4.1',
        size: '120 MB',
        href: 'https://github.com/signalbotproapps/signal-forge-pro/releases/download/v2.4.1/SignalForgePro.apk',
    },
];