import ServicesPageClient from './ServicesPageClient';

export const metadata = {
  title: 'Steel Fabrication Services | Railings, Gates, Grills – Mumbai & Thane',
  description:
    'Expert steel fabrication services in Mumbai, Thane & Mumbra: SS/MS railings, security doors & gates, window grills, kitchen counters, industrial structures and custom metalwork. Free quote available.',
  keywords:
    'steel railing Mumbai, security door Thane, main gate Mumbra, window grill Mumbai, kitchen counter steel, industrial structure fabrication, custom metal fabrication Mumbai, SS railing, MS railing',
  alternates: {
    canonical: 'https://rnallsteelfabrication.com/services',
  },
  openGraph: {
    title: 'Steel Fabrication Services | RN All Steel – Mumbai & Thane',
    description:
      'SS/MS railings, security doors, main gates, window grills, kitchen counters and industrial structures. Free site visits across Mumbai & Thane.',
    url: 'https://rnallsteelfabrication.com/services',
    images: [{ url: '/projects/railings/stainless-steel-staircase-railing.webp', width: 1200, height: 630, alt: 'Steel Fabrication Services – RN All Steel' }],
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
