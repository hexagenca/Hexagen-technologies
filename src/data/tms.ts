import {
  BarChart3,
  Bell,
  Bot,
  Building2,
  Calculator,
  FileStack,
  FileText,
  Headset,
  Languages,
  LayoutDashboard,
  Mail,
  MapPin,
  Package,
  Receipt,
  Route,
  Server,
  ShieldCheck,
  Smartphone,
  Truck,
  Users,
} from 'lucide-react'
import type { TmsProduct } from '@/types'

const TMS_URL = 'https://tms.hexagen.ca'

/**
 * Hexagen TMS — the second live product. Every claim here was checked against
 * the TMS codebase and its own public site (tms.hexagen.ca) on 2026-10-22.
 * Pricing, integrations and hosting are repeated from there: when they change
 * on tms.hexagen.ca, change them here too. Wording the TMS team already found
 * untrue is deliberately absent — e.g. two-factor is optional (not mandatory),
 * and Hena changes no record, but is not "read-only" everywhere.
 */
export const tmsProduct: TmsProduct = {
  slug: 'tms',
  name: 'Hexagen TMS',
  tagline: 'Every trip, one screen',
  description:
    'A transportation management system for carriers and brokers. Quote it, dispatch it, track it, invoice it — one record of the trip that every view reads and every person writes.',
  status: 'live',
  href: TMS_URL,
  overviewPath: '/products/tms',
  productTourHref: `${TMS_URL}/product`,
  pricingHref: `${TMS_URL}/#pricing`,
  trialHref: `${TMS_URL}/signup?plan=per_truck`,

  highlights: [
    {
      icon: Route,
      label: 'Quote to invoice, one record',
      description: 'Quotes, trips, tracking and invoices all read the same trip — nothing is typed twice.',
    },
    {
      icon: LayoutDashboard,
      label: 'Dispatch that ranks',
      description: 'Drivers suggested by endorsements, equipment, hours of service and pickup window. You assign.',
    },
    {
      icon: Smartphone,
      label: 'Offline-first driver app',
      description: 'Stops, documents and proof of delivery from the cab — it syncs when the signal comes back.',
    },
    {
      icon: Bot,
      label: 'Hena, the AI assistant',
      description: 'Price suggestions, inbox sorting and report summaries. Off until you turn it on.',
    },
  ],

  lifecycle: [
    {
      icon: Calculator,
      title: 'Quote',
      description:
        'Price a lane from comparables and send the quote. The customer accepts or counters from a link, and every revision is numbered.',
    },
    {
      icon: Truck,
      title: 'Dispatch',
      description:
        'An accepted quote books itself as a trip. Assign a driver and equipment from ranked suggestions — conflicts are flagged before you commit.',
    },
    {
      icon: MapPin,
      title: 'Track',
      description:
        'Telematics and the driver app keep every truck on the map. Customers follow a tracking link — no account needed.',
    },
    {
      icon: Receipt,
      title: 'Invoice',
      description:
        'Bill delivered trips at your tax rates, send a branded PDF, and sync to QuickBooks Online, Xero or Zoho Books.',
    },
  ],

  replaces: ['Spreadsheets', 'Email threads', 'The whiteboard', 'Telematics tabs', 'Accounting re-entry'],

  /** A real screen recording of the TMS demo account (fictional company, fictional data). */
  tour: {
    src: { webm: '/media/tms/tour.webm', mp4: '/media/tms/tour.mp4' },
    poster: '/media/tms/tour-poster.jpg',
    durationSeconds: 158,
    chapters: [
      { label: 'Dashboard', at: 11, caption: 'The day at a glance: revenue, trips in motion, what is late and what needs a decision.' },
      { label: 'Quotes', at: 28, caption: 'Price a lane, send the quote, and the customer accepts or counters from a link in their email.' },
      { label: 'Trips', at: 43, caption: 'An accepted quote becomes a trip — stops, equipment, driver, documents and charges in one record.' },
      { label: 'Dispatch board', at: 58, caption: 'Every truck and its trips across the week. Conflicts are flagged before you commit.' },
      { label: 'Fleet map', at: 72, caption: 'Where every truck is, from the driver app or a connected ELD — updating live on the map.' },
      { label: 'Drivers', at: 88, caption: 'The roster, with licences, documents and expiry dates tracked for you.' },
      { label: 'Documents', at: 113, caption: 'Bills of lading, proofs of delivery and rate confirmations, filed against the right trip.' },
      { label: 'Invoices', at: 122, caption: 'Bill delivered trips, see what is outstanding and past due, and send a branded PDF.' },
      { label: 'Reports', at: 134, caption: 'Revenue, margins and on-time performance — run, save, schedule and export to CSV.' },
    ],
  },

  modules: [
    { icon: Package, label: 'Orders & quotes', description: 'Quotes become orders with a numbered revision history and an acceptance on record.' },
    { icon: LayoutDashboard, label: 'Dispatch boards', description: 'Week, columns and the Power board — live positions and ETAs for every trip.' },
    { icon: MapPin, label: 'Fleet tracking', description: 'Samsara, Motive, Geotab and the driver app on one map — the freshest position wins.' },
    { icon: FileStack, label: 'Document library', description: 'BOLs, PODs and rate confirmations from driver phones, mailboxes and the office.' },
    { icon: Mail, label: 'Inbox beside the order', description: 'Gmail and Outlook threads next to the trip, sorted and drafted by Hena if you turn it on.' },
    { icon: Receipt, label: 'Invoicing & accounting', description: 'Invoices taxed at your rates, revised under a new number, synced to your accounting.' },
    { icon: BarChart3, label: 'Reports & dashboards', description: 'Ready-made reports across every module. Saved reports run on a schedule.' },
    { icon: Smartphone, label: 'Driver app & WhatsApp', description: 'An offline-first app — and drivers without it can work their stops over WhatsApp.' },
  ],

  audiences: [
    { icon: Headset, label: 'Dispatchers', description: 'Plan, assign and re-plan from one board instead of five tabs and a phone.' },
    { icon: Building2, label: 'Owners & managers', description: 'Revenue, receivables and every truck on one dashboard — across one company or many.' },
    { icon: Truck, label: 'Drivers', description: 'Their stops, documents and proof of delivery on their phone, even without signal.' },
    { icon: Users, label: 'Your customers', description: 'A tracking link for every order. No login, and no calls asking where the load is.' },
  ],

  hena: {
    question: 'Which reefer orders deliver in Montréal on Thursday?',
    answer: '3 orders — 2 assigned, 1 still waiting on a driver.',
    rows: [
      { ref: 'ORD-2291 · reefer', state: 'assigned', tone: 'ok' },
      { ref: 'ORD-2304 · reefer', state: 'assigned', tone: 'ok' },
      { ref: 'ORD-2317 · reefer', state: 'needs a driver', tone: 'warn' },
    ],
    capabilities: [
      'Suggests prices from comparable lanes',
      'Explains driver suggestions and checks the plan',
      'Sorts the inbox and drafts replies',
      'Summarizes scheduled reports',
    ],
  },

  integrations: [
    'QuickBooks Online',
    'Xero',
    'Zoho Books',
    'Samsara',
    'Motive',
    'Geotab',
    'Gmail',
    'Outlook',
    'Google Maps',
    'WhatsApp',
    'Twilio SMS',
    'Slack',
    'Comdata',
  ],

  trust: [
    { icon: MapPin, label: 'Hosted in Canada', description: 'The hosted service runs in Azure Canada Central. Built and supported in Canada.' },
    { icon: Languages, label: 'English & French', description: 'The whole product — app, driver app and legal documents — in both official languages.' },
    { icon: ShieldCheck, label: 'Access you control', description: 'Two-factor authentication, custom roles, and a history of what changed on every trip.' },
    { icon: Server, label: 'Hosted or self-hosted', description: 'Run it with us, or under an annual licence on your own Docker or bare metal with PostgreSQL or SQL Server.' },
  ],

  plans: [
    {
      name: 'Pay as You Go',
      price: 'CA$59',
      unit: '/month',
      summary: 'Includes 40 delivered loads, then CA$5 a load. Unlimited office users and drivers, one company.',
      footnote: 'Integrations, Maps and AI are billed by use.',
      href: `${TMS_URL}/signup?plan=metered`,
      cta: 'Get started',
    },
    {
      name: 'Standard',
      price: 'CA$499',
      unit: '/month + CA$30 a truck',
      summary: 'Unlimited companies, every integration and Google Maps included, your own domain and 24×7 support.',
      footnote: 'AI is billed by use, under a limit you set.',
      href: `${TMS_URL}/signup?plan=per_truck`,
      cta: 'Start 14-day free trial',
      featured: true,
    },
  ],

  demo: {
    tripId: 'TR-1042',
    lane: 'Toronto, ON → Montréal, QC',
    statuses: ['Quoted', 'Dispatched', 'In transit', 'Delivered', 'Invoiced'],
    views: [
      { icon: LayoutDashboard, label: 'Dispatch board' },
      { icon: MapPin, label: 'Tracking link' },
      { icon: Smartphone, label: 'Driver app' },
      { icon: FileText, label: 'Invoice' },
      { icon: Bell, label: 'Dashboard' },
    ],
  },

  faq: [
    {
      question: 'Who is Hexagen TMS for?',
      answer:
        'Carriers and brokers who run their own trips — from a small operator on Pay as You Go to fleets running several companies on Standard.',
    },
    {
      question: 'Do we have to replace our accounting or telematics?',
      answer:
        'No. Hexagen TMS connects to QuickBooks Online, Xero, Zoho Books, Samsara, Motive, Geotab, Gmail, Outlook and Comdata, so the tools you already use keep working.',
    },
    {
      question: 'Where is our data stored?',
      answer:
        'The hosted service runs in Azure Canada Central. If you need it on your own infrastructure, Hexagen TMS can be self-hosted on Docker or bare metal under an annual licence.',
    },
    {
      question: 'Is the AI assistant required?',
      answer:
        'No. Hena is off until you turn it on, each feature has its own switch, and it is billed by use. Nothing it produces changes a load, a trip, an order or an invoice.',
    },
    {
      question: 'Can we try it first?',
      answer:
        'Yes. The Standard plan comes with a 14-day free trial. Pay as You Go has no trial, but starts at CA$59 a month with no long-term commitment.',
    },
  ],
}
