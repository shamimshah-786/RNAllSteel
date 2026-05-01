import AboutPageClient from './AboutPageClient';

export const metadata = {
  title: 'About RN All Steel Fabrication | Steel Fabricators in Thane',
  description:
    'Learn about RN All Steel Fabrication, a steel fabrication company serving Thane, Mumbai and Mumbra with SS railings, steel gates, security doors and custom metal work backed by 15+ years of experience.',
  keywords: [
    'about RN All Steel Fabrication',
    'steel fabrication company Thane',
    'steel fabricator Mumbai',
    'steel fabrication company Mumbra',
    'experienced steel fabricators Thane',
    'custom steel fabrication company Mumbai'
  ],
  alternates: {
    canonical: 'https://rnallsteelfabrication.com/about',
  },
  openGraph: {
    title: 'About RN All Steel Fabrication | Steel Fabricators in Thane',
    description:
      'RN All Steel Fabrication serves Thane, Mumbai and Mumbra with SS railings, steel gates, security doors and custom fabrication backed by 15+ years of experience.',
    url: 'https://rnallsteelfabrication.com/about',
    type: 'website',
    images: [
      {
        url: '/images/banner.jpg',
        width: 1200,
        height: 630,
        alt: 'About RN All Steel Fabrication',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About RN All Steel Fabrication | Steel Fabricators in Thane',
    description:
      'Learn about RN All Steel Fabrication, serving Thane, Mumbai and Mumbra with quality steel fabrication services.',
    images: ['/images/banner.jpg'],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}