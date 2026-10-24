import { useEffect, useRef } from 'react'
import { motion, useAnimationControls, useInView, useMotionTemplate, type MotionValue } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// Seeded PRNG (mulberry32) so the network is identical on every load and
// server/client never disagree.
function seeded(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const WIDTH = 100
const HEIGHT = 60
const NODE_COUNT = 30
const LINK_DISTANCE = 17

const random = seeded(20260719)
const nodes = Array.from({ length: NODE_COUNT }, () => ({
  x: random() * WIDTH,
  y: random() * HEIGHT,
  r: 0.25 + random() * 0.45,
}))
const edges: [(typeof nodes)[number], (typeof nodes)[number]][] = []
for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    if (Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y) < LINK_DISTANCE) {
      edges.push([nodes[i], nodes[j]])
    }
  }
}

function Network({ nodeColor, edgeColor, edgeWidth }: { nodeColor: string; edgeColor: string; edgeWidth: number }) {
  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="xMidYMid slice" className="size-full">
      {edges.map(([a, b], i) => (
        <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={edgeColor} strokeWidth={edgeWidth} />
      ))}
      {nodes.map((node, i) => (
        <circle key={i} cx={node.x} cy={node.y} r={node.r} fill={nodeColor} />
      ))}
    </svg>
  )
}

interface HeroNetworkProps {
  /** Pointer position within the hero, in px (springy MotionValues). */
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
  /** Fine pointer and motion allowed: light up the network around the cursor. */
  interactive: boolean
}

/**
 * A faint network of connected nodes behind the hero, a picture of the
 * integration work Hexagen does. It tilts slowly in 3D only while on screen,
 * and a brighter copy is revealed through a soft mask that follows the cursor.
 * Under reduced motion it is a static, slightly tilted plane.
 */
export function HeroNetwork({ pointerX, pointerY, interactive }: HeroNetworkProps) {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0 })
  const controls = useAnimationControls()
  const mask = useMotionTemplate`radial-gradient(circle 260px at ${pointerX}px ${pointerY}px, black 0%, transparent 72%)`

  useEffect(() => {
    if (reducedMotion) return
    if (inView) {
      void controls.start({
        rotateX: [1.5, -1.5, 1.5],
        rotateY: [-2.5, 2.5, -2.5],
        transition: { duration: 24, repeat: Infinity, ease: 'easeInOut' },
      })
    } else {
      controls.stop()
    }
  }, [inView, reducedMotion, controls])

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ perspective: 1400 }}>
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: 'preserve-3d', rotateX: reducedMotion ? 1.5 : undefined }}
        animate={reducedMotion ? undefined : controls}
      >
        <Network nodeColor="rgba(255,255,255,0.16)" edgeColor="rgba(148,163,184,0.09)" edgeWidth={0.06} />
        {interactive ? (
          <motion.div className="absolute inset-0" style={{ maskImage: mask, WebkitMaskImage: mask }}>
            <Network nodeColor="rgba(165,180,252,0.85)" edgeColor="rgba(129,140,248,0.45)" edgeWidth={0.09} />
          </motion.div>
        ) : null}
      </motion.div>
    </div>
  )
}
