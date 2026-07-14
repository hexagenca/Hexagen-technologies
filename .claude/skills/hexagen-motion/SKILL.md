---
name: hexagen-motion
description: >
  Plans, implements and reviews Motion for React animations for Hexagen.
  Use for route transitions, scroll-driven product storytelling,
  interface demonstrations, layout animation, navigation feedback,
  SVG animation and motion performance.
---

# Hexagen Motion Skill

Use imports from `motion/react`.

Do not install or import from `framer-motion`.

## Purpose

Animation must do at least one of the following:

- explain a workflow
- demonstrate product behavior
- orient the visitor
- show state change
- provide interaction feedback
- establish content hierarchy

## Preferred Motion APIs

Use when appropriate:

- `MotionConfig`
- `AnimatePresence`
- `LayoutGroup`
- `layout`
- `layoutId`
- `useScroll`
- `useTransform`
- `useSpring`
- `whileInView`
- variants
- SVG `pathLength`

## Performance

- Prefer transform and opacity.
- Use MotionValues for scroll-linked effects.
- Avoid React state changes on every scroll event.
- Avoid continuously animating large blur effects.
- Do not animate many full-screen layers simultaneously.
- Pause or remove offscreen loops.
- Avoid pointer-following effects on touch devices.
- Keep mobile animations simpler than desktop animations.

## Accessibility

- Respect the user's reduced-motion preference.
- Never delay access to essential content.
- Replace large movement with opacity or immediate state changes.
- Ensure keyboard focus remains stable.
- The page must communicate the same information without animation.

## Motion specification

Before implementation, document every major animation using:

- component
- trigger
- animated properties
- transition
- purpose
- mobile behavior
- reduced-motion fallback
- performance risk

## Verification

After implementation:

1. Run typecheck.
2. Run lint.
3. Run the production build.
4. Test desktop.
5. Test mobile.
6. Test reduced motion.
7. Test keyboard navigation.
