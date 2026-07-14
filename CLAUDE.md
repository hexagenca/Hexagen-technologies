# Hexagen Website

Hexagen is a Canadian AI software company website built with:

- React 19
- TypeScript strict mode
- Vite
- Tailwind CSS v4
- Motion for React from `motion/react`
- React Router

## Architecture

- Reuse existing components before creating new ones.
- Keep reusable content in `src/data`.
- Keep shared interfaces in `src/types`.
- Use design tokens from `src/styles/theme.css`.
- Preserve route-level lazy loading.
- Do not introduce another UI component library.
- Do not install `framer-motion`; this project uses `motion`.
- Do not weaken TypeScript types to make code compile.

## Product claims

- Do not invent customers, metrics, integrations or performance results.
- Clearly distinguish live, beta and conceptual products.
- Use real product recordings for product demonstrations.
- Do not create fake AI-generated product interfaces.

## Accessibility

- Preserve keyboard navigation.
- Preserve visible focus states.
- Keep interactive targets at least 44 by 44 pixels.
- Respect `prefers-reduced-motion`.
- Content must remain understandable when animation is disabled.

## Motion

- Motion must explain, orient, demonstrate or provide feedback.
- Prefer transform and opacity.
- Avoid repeated generic fade-up effects.
- Avoid scroll hijacking.
- Avoid strong parallax on mobile.
- Avoid constant animation behind long text.
- Use MotionValues for scroll-linked effects.
- Provide mobile and reduced-motion fallbacks.

## Verification

Before declaring a task complete, run:

- npm run typecheck
- npm run lint
- npm run build

Also visually verify:

- mobile layout
- desktop layout
- keyboard navigation
- reduced-motion behavior
- external product links
- video loading and poster fallback
