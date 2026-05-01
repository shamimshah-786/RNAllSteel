import ProjectsPageClient from './ProjectsPageClient';

export const metadata = {
  title: 'Steel Fabrication Projects in Mumbai, Thane & Mumbra | RN All Steel',
  description:
    'See completed steel fabrication projects by RN All Steel in Mumbai, Thane & Mumbra, including SS railings, steel gates, security doors, window grills, balcony grills and custom fabrication work.',
  keywords: [
    'steel fabrication projects Mumbai',
    'steel fabrication projects Thane',
    'steel fabrication projects Mumbra',
    'SS railing projects Mumbai',
    'staircase railing projects Thane',
    'steel gate projects Mumbra',
    'security door projects Thane',
    'window grill projects Mumbai',
    'balcony grill projects Thane',
    'custom steel fabrication portfolio'
  ],
  alternates: {
    canonical: 'https://rnallsteelfabrication.com/projects',
  },
  openGraph: {
    title: 'Steel Fabrication Projects in Mumbai, Thane & Mumbra | RN All Steel',
    description:
      'Browse completed SS railing, steel gate, security door and window grill projects across Mumbai, Thane & Mumbra.',
    url: 'https://rnallsteelfabrication.com/projects',
    type: 'website',
    images: [
      {
        url: '/projects/main-gates/ss-swing-compound-main-gate.webp',
        width: 1200,
        height: 630,
        alt: 'Completed steel fabrication projects by RN All Steel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steel Fabrication Projects in Mumbai, Thane & Mumbra | RN All Steel',
    description:
      'Browse completed SS railing, steel gate, security door and window grill projects across Mumbai, Thane & Mumbra.',
    images: ['/projects/main-gates/ss-swing-compound-main-gate.webp'],
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}