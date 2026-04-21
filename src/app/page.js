import AboutSection from '@/components/AboutSection'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Testimonials from '../components/Testimonials'
import ProjectsSection from '@/components/ProjectSection'

export const metadata = {
  title: 'RN All Steel Fabrication | Premium Steel Work in Mumbai, Thane & Mumbra',
  description:
    'Premium steel fabrication services in Mumbai, Thane & Mumbra — SS/MS railings, security doors, main gates, window grills, kitchen counters and custom metalwork. 15+ years experience, 500+ projects, free site visit.',
  keywords:
    'steel fabrication Mumbai, steel fabrication Thane, steel fabrication Mumbra, SS railing Mumbai, MS railing Thane, main gate Mumbra, security door Mumbai, window grill Thane, custom steel work',
  alternates: {
    canonical: 'https://rnallsteelfabrication.com',
  },
  openGraph: {
    title: 'RN All Steel Fabrication | Premium Steel Work in Mumbai, Thane & Mumbra',
    description:
      'Premium steel fabrication services in Mumbai, Thane & Mumbra. Railings, security doors, main gates, grills, and more. Free site visit.',
    url: 'https://rnallsteelfabrication.com',
    images: [{ url: '/images/banner.jpg', width: 1200, height: 630, alt: 'RN All Steel Fabrication – Premium Steel Work' }],
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