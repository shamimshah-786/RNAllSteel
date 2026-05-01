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
    default: 'RN All Steel Fabrication | Steel Fabrication in Mumbai & Thane',
    template: '%s | RN All Steel Fabrication',
  },
  description:
    'RN All Steel Fabrication offers SS railings, steel gates, security doors, window grills, kitchen counters and custom steel fabrication services in Mumbai, Thane & Mumbra.',
  keywords: [
    'steel fabrication Mumbai',
    'steel fabrication Thane',
    'steel fabrication Mumbra',
    'SS railing Mumbai',
    'security door Thane',
    'steel gate Mumbra',
    'window grill Mumbai',
    'custom steel fabrication'
  ],
  authors: [{ name: 'RN All Steel Fabrication Work' }],
  creator: 'RN All Steel Fabrication Work',
  publisher: 'RN All Steel Fabrication Work',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'RN All Steel Fabrication Work',
    title: 'RN All Steel Fabrication | Steel Fabrication in Mumbai & Thane',
    description:
      'SS railings, security doors, steel gates, window grills and custom fabrication services in Mumbai, Thane & Mumbra.',
    images: [
      {
        url: '/images/banner.jpg',
        width: 1200,
        height: 630,
        alt: 'RN All Steel Fabrication Work',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RN All Steel Fabrication | Steel Fabrication in Mumbai & Thane',
    description:
      'SS railings, security doors, steel gates, window grills and custom fabrication services in Mumbai, Thane & Mumbra.',
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
  '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
  '@id': `${SITE_URL}/#business`,
  name: 'RN All Steel Fabrication Work',
  alternateName: ['RN All Steel', 'R N All Steel Fabrication Work'],
  description:
    'RN All Steel Fabrication Work provides steel fabrication services in Mumbai, Thane, Mumbra and Navi Mumbai, including SS railings, staircase railings, security doors, steel gates, window grills, balcony grills, kitchen counters and custom metal fabrication.',
  url: SITE_URL,
  telephone: '+91-9665181246',
  email: 'rnallsteelfabrication@gmail.com',
  image: [
    `${SITE_URL}/images/banner.jpg`,
    `${SITE_URL}/images/logo.jpg`
  ],
  logo: `${SITE_URL}/images/logo.jpg`,
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, UPI, Bank Transfer',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Khot Bunglow, Mumbra-Panvel Highway, near International Kata, Mokashi Pada Road',
    addressLocality: 'Thane',
    addressRegion: 'Maharashtra',
    postalCode: '400612',
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 19.1649,
    longitude: 73.0236
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: '09:30',
      closes: '21:15'
    }
  ],
  areaServed: [
    { '@type': 'City', name: 'Mumbai' },
    { '@type': 'City', name: 'Thane' },
    { '@type': 'City', name: 'Mumbra' },
    { '@type': 'City', name: 'Navi Mumbai' }
  ],
  sameAs: [
    'https://www.facebook.com/p/R-N-All-fabrication-work-100067881897099/',
    'https://www.instagram.com/rn_all_steel_fabrication/'
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Steel Fabrication Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'SS Railing Fabrication'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'MS Railing Fabrication'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Staircase Railing Fabrication'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Security Door Fabrication'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Steel Gate Fabrication'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Window Grill Fabrication'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Balcony Grill Fabrication'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Kitchen Counter Fabrication'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Steel Fabrication'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Onsite Welding and Repair Services'
        }
      }
    ]
  }
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