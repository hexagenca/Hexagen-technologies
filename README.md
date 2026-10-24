# Hexagen

Marketing website for **Hexagen**, a Canadian AI software solutions company. Built as a fully client-rendered React SPA — no CMS, no server-rendered pages.

## Overview

- Product marketing site covering the homepage, four product pages (HexaChat, HexaDocs, HexaFlow, HexaInsights), Solutions, Services, About, Careers, Contact, and legal pages.
- Content is centralized in typed data files (`src/data/`) so new products, services, or solutions can be added without touching page markup.
- No backend is wired up yet. Forms (demo request, contact, career application) post through a small API service layer that is ready to be pointed at a real endpoint — see [Form backend integration](#form-backend-integration).

## Tech stack

- **React 19** + **TypeScript** (strict mode)
- **Vite** (Rolldown-powered build) for dev server and production bundling
- **Tailwind CSS v4** (CSS-first configuration, no `tailwind.config.js` needed)
- **Motion** (`motion/react`) for animation, with `prefers-reduced-motion` respected throughout
- **React Router v7** for client-side routing and route-level code splitting
- **Lucide React** for icons
- **ESLint** (flat config) + `typescript-eslint`

No UI component library, no CSS framework other than Tailwind, no charting library (charts are hand-built with inline SVG).

## Getting started

```bash
npm install
cp .env.example .env   # optional locally — see Environment variables below
npm run dev
```

The dev server runs at `http://localhost:5173` by default.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) and produce a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint over the project |
| `npm run typecheck` | Run the TypeScript compiler in `--noEmit` mode |

## Project structure

```text
src/
  assets/            static images/graphics bundled through the build
  components/
    common/          generic building blocks (Button, Container, Tabs, Accordion, SEO-agnostic UI)
    layout/          Navbar, MobileMenu, Footer, PageHero, SEO, Layout (route shell)
    sections/        homepage-specific sections (Hero, HowItWorks, IntegrationSection, ...)
    products/         product mockups, ProductCard, ProductShowcase, ProductPageTemplate
    forms/           ContactForm, CareerApplicationForm, shared FormField
  data/              typed content: products, services, solutions, navigation, faqs, company info...
  hooks/             useReducedMotion, useScrolled, useLockBodyScroll
  pages/             one file per route, composes sections + SEO
  styles/            theme.css (design tokens)
  types/             shared TypeScript interfaces (Product, Service, Solution, FAQ, forms...)
  utils/             cn, api/forms service layer, validation, structured data helpers
  App.tsx            route table (lazy-loaded pages)
  main.tsx           entry point, mounts BrowserRouter
```

### Path alias

`@/*` resolves to `src/*` (configured in `tsconfig.app.json` and `vite.config.ts`), e.g. `import { Button } from '@/components/common/Button'`.

## Design system

Design tokens (colors, radii, shadows, container widths, gradients) live in `src/styles/theme.css` as a Tailwind v4 `@theme` block plus plain CSS custom properties for values Tailwind's theme system doesn't model directly (gradients, box-shadow recipes). Change a value there and it propagates everywhere it's used via `var(--color-primary)`, `bg-gradient-brand`, etc.

## Content editing

Almost all copy lives in `src/data/*.ts`, typed against the interfaces in `src/types/index.ts`:

- **Products** — `src/data/products.ts`. Add a new entry here (with a unique `slug`) and it automatically appears in the homepage grid, the `/products` comparison table, the navbar dropdown (add it to `src/data/navigation.ts` too), and gets a working `/products/:slug` detail page for free via `ProductPageTemplate`.
- **Services** — `src/data/services.ts`
- **Solutions** — `src/data/solutions.ts`
- **Company info** (phone, email, address, founding year, slogan) — `src/data/company.ts`
- **Navigation** — `src/data/navigation.ts`
- **Careers openings** — `src/data/careers.ts`
- **Sample case study** — `src/data/caseStudy.ts` (clearly marked as illustrative — see below)

### Placeholder content requiring verification before launch

- `src/data/caseStudy.ts` — the entire case study is a labeled **sample/illustrative project**, not a real customer. Replace with a verified, permissioned customer story (or remove the section) before publishing.
- `src/data/company.ts` — the `linkedin` URL is a placeholder; replace with the real company LinkedIn URL.
- `src/data/outcomes.ts` — the "Business outcomes" section intentionally uses **non-numerical illustrative labels** (e.g. "Faster workflows") instead of invented statistics. If real, verified metrics become available, they can replace these labels.
- `src/pages/Privacy.tsx` and `src/pages/Terms.tsx` — structured legal placeholders. Both pages render a visible "pending legal review" notice; this content **must be reviewed by qualified legal counsel** before launch.
- `public/robots.txt`, `public/sitemap.xml`, `src/data/company.ts` (`siteUrl` fallback) — reference `https://www.hexagen.ca` as a placeholder production domain; update once the real domain is finalized.
- `public/site.webmanifest` / favicon — a hand-built geometric hexagon mark is used as a placeholder logo (see `src/components/common/Logo.tsx`). Swap in the official brand asset when available; every consumer renders through that one component.
- `og-image-placeholder.png` referenced by the SEO component (`src/components/layout/SEO.tsx`) does not exist yet — add a real Open Graph image at that path or update the fallback.

## Environment variables

Copy `.env.example` to `.env` and adjust as needed:

```bash
VITE_API_BASE_URL=https://api.hexagen.ca   # backend base URL for form submissions
VITE_SITE_URL=https://www.hexagen.ca       # canonical URL used by the SEO component
```

If `VITE_API_BASE_URL` is left unset, forms will **not** silently pretend to succeed — they show a clear message explaining that no backend is configured (see `src/utils/api.ts`).

## Form backend integration

Three forms need a real backend before launch:

1. **Demo / contact request** — `src/components/forms/ContactForm.tsx` (used on `/contact`), submits via `submitDemoRequest()` in `src/utils/forms.ts` to `POST {VITE_API_BASE_URL}/api/demo-requests`.
2. **Career application** — `src/components/forms/CareerApplicationForm.tsx` (used on `/careers`), submits via `submitCareerApplication()` to `POST {VITE_API_BASE_URL}/api/careers/apply` as `multipart/form-data` (includes the resume file).
3. A general-purpose `submitContactForm()` helper also exists in `src/utils/forms.ts` for a simpler contact-only flow, in case that's split out from the demo-request form later.

All three share the fetch wrapper in `src/utils/api.ts`. To connect a real backend: set `VITE_API_BASE_URL`, and update the endpoint paths in `src/utils/forms.ts` (`ENDPOINTS`) to match your actual API routes. Each form includes a honeypot field for basic spam mitigation and full client-side validation with accessible error messaging.

## Accessibility notes

- Skip-to-content link at the top of every page (`.skip-link` in `src/index.css`).
- Semantic landmarks (`header`, `nav`, `main`, `footer`) and a single `h1` per page.
- Keyboard-accessible navbar dropdowns, mobile menu (closes on Escape, on outside click, and on route change; traps body scroll while open), and product tabs (arrow key / Home / End navigation per the ARIA tabs pattern).
- All interactive targets are at least 44×44px (`min-h-11` / `size-11` and up).
- Visible focus rings via a global `:focus-visible` style — never suppressed.
- Motion respects `prefers-reduced-motion` through the shared `useReducedMotion` hook; scroll-reveal animations and floating hero elements are skipped entirely for users who request reduced motion.
- Forms use associated `<label>`s, `aria-invalid`, `aria-describedby` on errors, and a focus-managed error summary (`role="alert"`) on failed submission.
- The product comparison table and legal pages use real `<table>`/heading semantics rather than div soup.

## SEO

The `SEO` component (`src/components/layout/SEO.tsx`) manages `document.title`, meta description, canonical link, Open Graph, and Twitter card tags per route, plus optional JSON-LD structured data (Organization, SoftwareApplication, BreadcrumbList — see `src/utils/structuredData.ts`). `public/robots.txt`, `public/sitemap.xml`, and `public/site.webmanifest` are included as static files.

## Deployment

This is a static single-page app after `npm run build` (output in `dist/`). Because it uses client-side routing, the host needs a SPA fallback rule that serves `index.html` for unknown paths.

### Vercel

- Framework preset: **Vite**. Build command `npm run build`, output directory `dist`.
- Vercel's Vite preset already rewrites unmatched routes to `index.html`; no extra config needed for the SPA fallback.
- Set `VITE_API_BASE_URL` and `VITE_SITE_URL` as Environment Variables in the project settings.

### Netlify

- Build command `npm run build`, publish directory `dist`.
- Add a `_redirects` file (or `netlify.toml` redirect rule) with `/* /index.html 200` so client-side routes don't 404 on refresh.
- Set env vars in Site settings → Environment variables.

### GoDaddy (cPanel / Apache)

- Run `npm run build` with `VITE_API_BASE_URL` and `VITE_SITE_URL` set (Vite bakes them in at build time).
- In cPanel File Manager, back up and clear `public_html/`, then upload the **contents** of `dist/` (not the folder itself) and extract.
- `public/.htaccess` is copied into `dist/` and provides the SPA fallback and caching. File Manager hides dotfiles by default — enable "Show Hidden Files" to confirm it's there.
- Once SSL is active, uncomment the HTTPS redirect in `.htaccess`.

### Traditional static hosting (e.g. Nginx, S3 + CloudFront)

- Upload the contents of `dist/` as-is.
- Configure the server to fall back to `index.html` for any path that doesn't match a real file (e.g. `try_files $uri /index.html;` in Nginx).
- Set long cache lifetimes for `dist/assets/*` (filenames are content-hashed) and a short/no cache for `index.html`.
