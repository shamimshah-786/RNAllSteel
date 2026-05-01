import ContactPageClient from './ContactPageClient';

export const metadata = {
  title: 'Contact RN All Steel Fabrication in Thane | Free Quote & Site Visit',
  description:
    'Contact RN All Steel Fabrication for steel fabrication work in Thane, Mumbai and Mumbra. Call +91 96651 81246 for SS railings, steel gates, security doors, window grills and a free site visit.',
  keywords: [
    'contact steel fabricator Thane',
    'steel fabrication quote Mumbai',
    'free site visit steel fabrication Thane',
    'security door fabricator contact',
    'SS railing quote Mumbai',
    'steel gate fabricator Mumbra',
    'RN All Steel contact'
  ],
  alternates: {
    canonical: 'https://rnallsteelfabrication.com/contact',
  },
  openGraph: {
    title: 'Contact RN All Steel Fabrication in Thane | Free Quote & Site Visit',
    description:
      'Call +91 96651 81246 for SS railings, steel gates, security doors, window grills and custom steel fabrication in Thane, Mumbai and Mumbra.',
    url: 'https://rnallsteelfabrication.com/contact',
    type: 'website',
    images: [
      {
        url: '/images/banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact RN All Steel Fabrication for free quote and site visit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact RN All Steel Fabrication in Thane | Free Quote & Site Visit',
    description:
      'Call +91 96651 81246 for SS railings, steel gates, security doors, window grills and custom steel fabrication.',
    images: ['/images/banner.jpg'],
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}