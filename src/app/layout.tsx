import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

const APP_NAME = 'Beauty Appointments';
const APP_DEFAULT_TITLE = 'Beauty Nails Salon Appointments App';
const APP_TITLE_TEMPLATE = '%s - Web App';
const APP_DESCRIPTION = 'App to manage appointments for a Beauty Nails Salon.';

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: APP_DEFAULT_TITLE,
        // startUpImage: [],
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: 'website',
        siteName: APP_NAME,
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
    twitter: {
        card: 'summary',
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
};

export const viewport: Viewport = {
    themeColor: '#FFFFFF',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="es" dir="ltr">
            <head />
            <body>
                <Providers>
                    <div className="flex  flex-col items-center">
                        <div className="relative w-full max-w-[600px] min-h-screen py-10 flex flex-col gap-8 p-5 overflow-hidden">
                            {children}
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
