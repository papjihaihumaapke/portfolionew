import { Helmet } from 'react-helmet-async'
import { site } from '../data/site'
import { personJsonLd } from '../lib/seo'

export type SeoProps = {
  /** Page name; rendered as "<title> | Hilal Malik" unless `fullTitle` is set. */
  title?: string
  fullTitle?: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article' | 'profile'
  person?: boolean
  jsonLd?: object
  noindex?: boolean
}

export function Seo({ title, fullTitle, description, path, image = '/og/site.png', type = 'website', person = false, jsonLd, noindex = false }: SeoProps) {
  const pageTitle = fullTitle ?? `${title} | ${site.shortName}`
  const url = site.url + (path === '/' ? '/' : path)
  const img = site.url + image

  return (
    <Helmet prioritizeSeoTags>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex" /> : <link rel="canonical" href={url} />}

      <meta property="og:site_name" content={site.shortName} />
      <meta property="og:locale" content="en_CA" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />

      {person && <script type="application/ld+json">{JSON.stringify(personJsonLd)}</script>}
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}
