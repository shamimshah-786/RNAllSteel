import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TopProgress from '../components/TopProgress';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

const SITE_URL = 'https://rnallsteelfabrication.com';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'RN All Steel Fabrication Work | Mumbai & Thane',
    template: '%s | RN All Steel Fabrication',
  },
  description:
    'Professional steel fabrication services in Mumbai, Thane & Mumbra. Specializing in SS/MS railings, security doors, main gates, window grills, kitchen counters, and custom metal fabrication. 15+ years experience, 500+ projects.',
  keywords:
    'steel fabrication Mumbai, steel fabrication Thane, steel fabrication Mumbra, steel railing Mumbai, SS railing Thane, MS railing, security door Mumbai, main gate Thane, window grill Mumbai, steel gate Mumbra, fabrication work Valivali, industrial steel structure, custom metal fabrication, stainless steel railing, collapsible gate, balcony railing, steel door, welding services Mumbai',
  authors: [{ name: 'RN All Steel Fabrication Work' }],
  creator: 'RN All Steel Fabrication Work',
  publisher: 'RN All Steel Fabrication Work',
  manifest: '/site.webmanifest',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'RN All Steel Fabrication Work',
    title: 'RN All Steel Fabrication Work | Mumbai & Thane',
    description:
      'Professional steel fabrication services in Mumbai, Thane & Mumbra. SS/MS railings, security doors, main gates, window grills and more. 15+ years experience.',
    images: [
      {
        url: '/images/banner.jpg',
        width: 1200,
        height: 630,
        alt: 'RN All Steel Fabrication Work – Premium Steel Fabrication in Mumbai & Thane',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RN All Steel Fabrication Work | Mumbai & Thane',
    description:
      'Professional steel fabrication services in Mumbai, Thane & Mumbra. SS/MS railings, security doors, main gates, and more.',
    images: ['/images/banner.jpg'],
  },
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

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: 'RN All Steel Fabrication Work',
  alternateName: 'RN All Steel',
  description:
    'Professional steel fabrication services in Mumbai, Thane and Mumbra. Specializing in SS/MS railings, security doors, main gates, window grills, kitchen counters, industrial structures, and custom metal fabrication.',
  url: SITE_URL,
  telephone: '+919665181246',
  email: 'rnallsteelfabrication@gmail.com',
  image: `${SITE_URL}/images/banner.jpg`,
  logo: `${SITE_URL}/images/logo.jpg`,
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, UPI, Bank Transfer',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'khot bunglow, Mumbra - Panvel Hwy, near by international kata, Mokashi Pada road',
    addressLocality: 'Thane',
    addressRegion: 'Maharashtra',
    postalCode: '400612',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 19.1649,
    longitude: 73.0236,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:30',
      closes: '21:15',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '41',
    bestRating: '5',
    worstRating: '1',
  },
  areaServed: [
    { '@type': 'City', name: 'Mumbai' },
    { '@type': 'City', name: 'Thane' },
    { '@type': 'City', name: 'Navi Mumbai' },
    { '@type': 'City', name: 'Mumbra' },
  ],
  sameAs: [
    'https://www.facebook.com/p/R-N-All-fabrication-work-100067881897099/',
    'https://www.instagram.com/rnallsteelfabrication',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Steel Fabrication Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SS / MS Railings' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Security Doors & Gates' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Balcony & Window Grills' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kitchen Trolleys & Counters' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Industrial & Commercial Structures' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Metal Fabrication' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Onsite Welding & Repairs' } },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* LocalBusiness structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />

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