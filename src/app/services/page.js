import ServicesPageClient from './ServicesPageClient';

export const metadata = {
  title: 'Steel Fabrication Services in Mumbai, Thane & Mumbra | RN All Steel',
  description:
    'Explore steel fabrication services by RN All Steel in Mumbai, Thane & Mumbra, including SS railings, steel gates, security doors, window grills, balcony grills, kitchen counters and custom metal fabrication.',
  keywords: [
    'steel fabrication services Mumbai',
    'steel fabrication services Thane',
    'steel fabrication services Mumbra',
    'SS railing fabrication Mumbai',
    'staircase railing Thane',
    'security door fabrication Thane',
    'steel gate fabrication Mumbra',
    'window grill fabrication Mumbai',
    'balcony grill fabrication Thane',
    'kitchen counter fabrication Mumbai',
    'custom steel fabrication Mumbai',
    'metal fabrication services Thane'
  ],
  alternates: {
    canonical: 'https://rnallsteelfabrication.com/services',
  },
  openGraph: {
    title: 'Steel Fabrication Services in Mumbai, Thane & Mumbra | RN All Steel',
    description:
      'SS railings, steel gates, security doors, window grills, balcony grills and custom fabrication services across Mumbai, Thane & Mumbra.',
    url: 'https://rnallsteelfabrication.com/services',
    type: 'website',
    images: [
      {
        url: '/projects/railings/ss-mezzanine-railing-metal-stairs.webp',
        width: 1200,
        height: 630,
        alt: 'Steel fabrication services by RN All Steel Fabrication',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steel Fabrication Services in Mumbai, Thane & Mumbra | RN All Steel',
    description:
      'SS railings, steel gates, security doors, window grills and custom fabrication services across Mumbai, Thane & Mumbra.',
    images: ['/projects/railings/ss-mezzanine-railing-metal-stairs.webp'],
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}