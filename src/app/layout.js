import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TopProgress from '../components/TopProgress';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'RN All Steel Fabrication Work | Mumbai & Thane',
  description:
    'Professional steel fabrication services in Mumbai and Thane. Specializing in railings, security doors, gates, industrial structures, and custom metal fabrication.',
  keywords:
    'steel fabrication, Mumbai, Thane, railings, security doors, gates, industrial structures, welding',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Top progress loader (client component) */}
        <TopProgress />

        { (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=G-ENV5PX5G62`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-ENV5PX5G62', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="grow page-transition">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}