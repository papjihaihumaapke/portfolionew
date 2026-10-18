import { AboutSnippet } from '../components/sections/AboutSnippet'
import { Seo } from '../components/Seo'
import { CtaStrip } from '../components/sections/CtaStrip'
import { FeaturedWork } from '../components/sections/FeaturedWork'
import { Hero } from '../components/sections/Hero'
import { HowIWork } from '../components/sections/HowIWork'
import { ProofStrip } from '../components/sections/ProofStrip'
import { SitesStrip } from '../components/sections/SitesStrip'
import { WhatIDo } from '../components/sections/WhatIDo'

export function Home() {
  return (
    <>
      <Seo fullTitle="Hilal Malik | UI/UX & Product Designer" description="UI/UX and Product Designer in Vancouver, BC. I design products and then build them, using code and AI: UX, design systems, SaaS tools, websites and motion." path="/" person />
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
