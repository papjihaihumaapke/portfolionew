import { useEffect } from 'react'
import { AboutSnippet } from '../components/sections/AboutSnippet'
import { CtaStrip } from '../components/sections/CtaStrip'
import { FeaturedWork } from '../components/sections/FeaturedWork'
import { Hero } from '../components/sections/Hero'
import { HowIWork } from '../components/sections/HowIWork'
import { ProofStrip } from '../components/sections/ProofStrip'
import { SitesStrip } from '../components/sections/SitesStrip'
import { WhatIDo } from '../components/sections/WhatIDo'

export function Home() {
  useEffect(() => {
    document.title = 'Hilal Malik | UI/UX & Product Designer'
  }, [])

  return (
    <>
      <Hero />
      <ProofStrip />
      <FeaturedWork />
      <WhatIDo />
      <HowIWork />
      <SitesStrip />
      <AboutSnippet />
      <CtaStrip />
    </>
  )
}
