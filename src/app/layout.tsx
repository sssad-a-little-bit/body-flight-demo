import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  icons: { icon: '/icon.svg' },
  title: 'Body Flight — первое занятие в Павлодаре',
  description: 'Воздушная гимнастика, pole dance и стретчинг в Павлодаре. Выберите направление и узнайте о пробном занятии в WhatsApp. Концепция от Flare Studio.',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#241b25' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
