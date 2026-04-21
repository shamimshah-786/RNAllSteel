import ContactPageClient from './ContactPageClient';

export const metadata = {
  title: 'Contact Us – Get Free Steel Fabrication Quote | Mumbai & Thane',
  description:
    'Contact RN All Steel Fabrication Work for a free quote and site visit. Serving Mumbai, Thane & Mumbra. Call +91 96651 81246 or WhatsApp for railings, gates, grills, and more.',
  keywords:
    'contact steel fabrication Mumbai, free steel fabrication quote Thane, steel fabrication consultation Mumbra, RN All Steel contact',
  alternates: {
    canonical: 'https://rnallsteelfabrication.com/contact',
  },
  openGraph: {
    title: 'Contact RN All Steel Fabrication Work | Free Quote – Mumbai & Thane',
    description:
      'Get a free quote for steel fabrication in Mumbai, Thane & Mumbra. Call or WhatsApp +91 96651 81246.',
    url: 'https://rnallsteelfabrication.com/contact',
    images: [{ url: '/images/banner.jpg', width: 1200, height: 630, alt: 'Contact RN All Steel Fabrication' }],
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
