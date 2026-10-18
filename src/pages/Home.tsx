import { useEffect } from 'react'
import { AboutSnippet } from '../components/sections/AboutSnippet'
import { CtaStrip } from '../components/sections/CtaStrip'
import { FeaturedWork } from '../components/sections/FeaturedWork'
import { Hero } from '../components/sections/Hero'

export function Home() {
  useEffect(() => {
    document.title = 'Hilal Malik | UI/UX & Product Designer'
  }, [])

  return (
    <>
      <Hero />
      <FeaturedWork />
      <AboutSnippet />
      <CtaStrip />
    </>
  )
}

