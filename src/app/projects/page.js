import ProjectsPageClient from './ProjectsPageClient';

export const metadata = {
  title: 'Steel Fabrication Projects Portfolio | Mumbai & Thane',
  description:
    'Browse our portfolio of 500+ steel fabrication projects in Mumbai, Thane & Mumbra — main gates, SS/MS railings, window grills, collapsible gates, main doors, and more.',
  keywords:
    'steel fabrication projects Mumbai, steel railing projects Thane, main gate portfolio, window grill projects Mumbra, steel door portfolio, stainless steel projects',
  alternates: {
    canonical: 'https://rnallsteelfabrication.com/projects',
  },
  openGraph: {
    title: 'Steel Fabrication Projects Portfolio | RN All Steel – Mumbai & Thane',
    description:
      'Browse 500+ completed steel fabrication projects — gates, railings, grills, doors and more across Mumbai & Thane.',
    url: 'https://rnallsteelfabrication.com/projects',
    images: [{ url: '/projects/main-gates/stainless-steel-main-gate-house.webp', width: 1200, height: 630, alt: 'Steel Fabrication Projects Portfolio' }],
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
