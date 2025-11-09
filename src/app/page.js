import AboutSection from '@/components/AboutSection'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Testimonials from '../components/Testimonials'
import ProjectsSection from '@/components/ProjectSection'

export const metadata = {
  title: 'RN All Steel Fabrication | Premium Steel Work in Mumbai & Thane',
  description: 'Professional steel fabrication services in Mumbai and Thane. Specializing in railings, security doors, gates, and industrial structures. 15+ years experience.',
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