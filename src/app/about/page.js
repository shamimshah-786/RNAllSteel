// app/about/page.js  (Server Component — unchanged metadata)
import AboutPageClient from './AboutPageClient';

export const metadata = {
  title: 'About Us – RN All Steel Fabrication | Mumbai & Thane',
  description: 'Learn about RN All Steel Fabrication Work — 15+ years of precision steel fabrication in Mumbai, Thane & Mumbra. 500+ projects completed. ISO-quality standards, skilled team.',
  keywords: 'about RN All Steel, steel fabrication company Mumbai, steel fabrication company Thane, Mumbra steel fabrication, steel fabrication experts',
  alternates: { canonical: 'https://rnallsteelfabrication.com/about' },
  openGraph: {
    title: 'About RN All Steel Fabrication Work | Mumbai & Thane',
    description: '15+ years of precision steel fabrication in Mumbai, Thane & Mumbra. 500+ completed projects.',
    url: 'https://rnallsteelfabrication.com/about',
    images: [{ url: '/images/banner.jpg', width: 1200, height: 630, alt: 'RN All Steel Fabrication – About Us' }],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}