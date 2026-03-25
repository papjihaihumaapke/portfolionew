import { useEffect } from 'react'
import { AboutSnippet } from '../components/sections/AboutSnippet'
import { CtaStrip } from '../components/sections/CtaStrip'
import { FeaturedWork } from '../components/sections/FeaturedWork'
import { Hero } from '../components/sections/Hero'
import { SkillsMarquee } from '../components/sections/SkillsMarquee'
import { Testimonials } from '../components/sections/Testimonials'

export function Home() {
  useEffect(() => {
    document.title = 'Hilal Malik — UX Designer & Product Builder'
  }, [])

  return (
    <>
      <Hero />
      <SkillsMarquee />
      <FeaturedWork />
      <AboutSnippet />
      <Testimonials />
      <CtaStrip />
    </>
  )
}

