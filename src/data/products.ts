import { QrCode, Code2, Sparkles, Building2 } from 'lucide-react'
import type { FlagshipProduct } from '@/types'

/**
 * DropWire — the live, shipping product. Everything here is factual: the
 * capture flow, the four SDKs, the AI add-ons and the enterprise options all
 * reflect the product as it exists today at dropwire.hexagen.ca.
 */
export const flagshipProduct: FlagshipProduct = {
  slug: 'dropwire',
  name: 'DropWire',
  tagline: 'Real-time mobile capture for your product',
  description:
    'A multi-tenant API platform for real-time media capture. Show a QR code, your customer scans it, and photos, documents, video, signatures and voice notes stream straight into your app — no native install, live over the web.',
  status: 'live',
  href: 'https://green-wave-0ebabb60f.7.azurestaticapps.net/',
  docsHref: 'https://green-wave-0ebabb60f.7.azurestaticapps.net/docs',
  highlights: [
    {
      icon: QrCode,
      label: 'QR → mobile capture',
      description: 'Customers scan a code and capture is delivered live to your backend — no app to install.',
    },
    {
      icon: Code2,
      label: 'SDKs for every stack',
      description: 'Drop-in SDKs for TypeScript, Python, PHP and React Native get you sending in minutes.',
    },
    {
      icon: Sparkles,
      label: 'AI add-ons',
      description: 'Extract & tag, redact, run quality checks and search captured media semantically.',
    },
    {
      icon: Building2,
      label: 'Built for enterprise',
      description: 'Custom limits, private networking and contracts for teams with scale and compliance needs.',
    },
  ],
  codeSnippet: [
    { text: '// create a capture session', kind: 'comment' },
    { text: 'const s = await dw.createSession()', kind: 'code' },
    { text: '// show s.qrValue → scan → files arrive', kind: 'comment' },
    { text: 'dw.onUpload(f => save(f))', kind: 'code' },
  ],
  captureChips: ['Photos', 'Documents', 'Video', 'Signatures', 'Voice notes'],
}
