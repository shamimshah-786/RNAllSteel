import AboutSection from '@/components/AboutSection'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Testimonials from '../components/Testimonials'
import ProjectsSection from '@/components/ProjectSection'

export const metadata = {
  title: 'Steel Fabrication in Mumbai, Thane & Mumbra | RN All Steel Fabrication',
  description:
    'RN All Steel Fabrication provides SS railings, security doors, steel gates, window grills, kitchen counters and custom steel fabrication in Mumbai, Thane & Mumbra. 15+ years experience, 500+ projects, free site visit.',
  keywords: [
    'steel fabrication Mumbai',
    'steel fabrication Thane',
    'steel fabrication Mumbra',
    'SS railing Mumbai',
    'staircase railing Thane',
    'balcony railing Mumbai',
    'security door Thane',
    'steel gate Mumbra',
    'main gate fabrication Thane',
    'window grill Mumbai',
    'kitchen counter fabrication Mumbai',
    'custom steel fabrication Mumbai',
    'industrial steel structure Thane',
    'steel fabricator near me'
  ],
  alternates: {
    canonical: 'https://rnallsteelfabrication.com',
  },
  openGraph: {
    title: 'Steel Fabrication in Mumbai, Thane & Mumbra | RN All Steel Fabrication',
    description:
      'SS railings, security doors, steel gates, window grills and custom fabrication services across Mumbai, Thane & Mumbra.',
    url: 'https://rnallsteelfabrication.com',
    images: [
      {
        url: '/images/banner.jpg',
        width: 1200,
        height: 630,
        alt: 'RN All Steel Fabrication services in Mumbai, Thane and Mumbra',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steel Fabrication in Mumbai, Thane & Mumbra | RN All Steel Fabrication',
    description:
      'SS railings, steel gates, security doors, window grills and custom fabrication services across Mumbai, Thane & Mumbra.',
    images: ['/images/banner.jpg'],
  },
}

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection/>

      <Services />
      <ProjectsSection/>
      <Testimonials />
    </>
  )
}