import { useEffect } from 'react'
import { company } from '@/data/company'

interface SEOProps {
  title: string
  description: string
  path: string
  ogImage?: string
  structuredData?: Record<string, unknown>[]
  noIndex?: boolean
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

/**
 * Manages per-page <head> metadata for this client-rendered SPA: title, meta
 * description, canonical URL, Open Graph / Twitter tags, and optional
 * JSON-LD structured data. No external dependency (e.g. react-helmet) is
 * needed for a project this size.
 */
export function SEO({ title, description, path, ogImage, structuredData, noIndex = false }: SEOProps) {
  useEffect(() => {
    const canonicalUrl = `${company.siteUrl}${path}`
    // NOTE: replace with a real hosted Open Graph image before launch.
    const resolvedOgImage = ogImage ?? `${company.siteUrl}/og-image-placeholder.png`

    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow')
    upsertCanonical(canonicalUrl)

    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:image', resolvedOgImage)
    upsertMeta('property', 'og:site_name', company.name)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', resolvedOgImage)

    const scripts: HTMLScriptElement[] = []
    if (structuredData) {
      for (const entry of structuredData) {
        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.textContent = JSON.stringify(entry)
        document.head.appendChild(script)
        scripts.push(script)
      }
    }

    return () => {
      scripts.forEach((script) => script.remove())
    }
  }, [title, description, path, ogImage, structuredData, noIndex])

  return null
}
