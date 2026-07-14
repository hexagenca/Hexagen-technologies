import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Camera, CheckCircle2, FileText, Mic, PenLine, Smartphone, Video } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { IconType } from '@/types'

/**
 * A self-playing demonstration of DropWire: a QR session waits, then captured
 * files spring in one at a time, upload, and flip to "processed" — then the
 * scene clears and loops. This mirrors DropWire's own hero so the product's
 * real behaviour is shown, not described. Under prefers-reduced-motion it
 * renders the finished scene statically with no looping or sweeping motion.
 */

interface SimFile {
  icon: IconType
  name: string
  kind: string
}

const SIM_FILES: SimFile[] = [
  { icon: Camera, name: 'roof-damage-04.jpg', kind: 'Photo' },
  { icon: FileText, name: 'insurance-card.pdf', kind: 'Document' },
  { icon: PenLine, name: 'signature.png', kind: 'Signature' },
  { icon: Video, name: 'walkthrough.mp4', kind: 'Video' },
  { icon: Mic, name: 'site-notes.m4a', kind: 'Voice' },
]

/** Deterministic QR-style glyph with an optional sweeping scan line. */
function QrGlyph({ scanning }: { scanning: boolean }) {
  const filled = new Set([
    0, 1, 2, 4, 6, 7, 8, 10, 14, 16, 18, 20, 21, 24, 27, 28, 30, 32, 35, 38, 40, 41, 42, 44, 46, 47, 48,
  ])
  return (
    <div className="relative overflow-hidden rounded-xl bg-white p-3">
      <div className="grid grid-cols-7 gap-[3px]">
        {[...Array(49)].map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-[2px] sm:h-2.5 sm:w-2.5 ${filled.has(i) ? 'bg-[var(--color-ink)]' : 'bg-slate-200'}`}
          />
        ))}
      </div>
      {scanning && (
        <motion.div
          className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-transparent via-[var(--color-primary)]/60 to-transparent"
          animate={{ y: ['-2rem', '7rem'] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

function FileRow({ file, reduceMotion }: { file: SimFile; reduceMotion: boolean }) {
  const [done, setDone] = useState(reduceMotion)
  const Icon = file.icon

  return (
    <motion.li
      layout
      initial={reduceMotion ? false : { x: 90, y: -10, opacity: 0, scale: 0.85, rotate: 3 }}
      animate={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      className="flex items-center gap-3 rounded-xl bg-white/[0.06] p-3 ring-1 ring-white/10"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/20 text-[var(--color-primary-light)]">
        <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-white">{file.name}</p>
        {done ? (
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1 text-[10px] font-medium text-emerald-300"
          >
            <CheckCircle2 className="size-3" aria-hidden="true" />
            processed
          </motion.p>
        ) : (
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-[var(--color-primary)]"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
              onAnimationComplete={() => setDone(true)}
            />
          </div>
        )}
      </div>
      <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/70">
        {file.kind}
      </span>
    </motion.li>
  )
}

export function DropWireCaptureSim() {
  const reduceMotion = useReducedMotion()
  const [count, setCount] = useState(0)
  // Under reduced motion we show the finished scene and never advance the loop.
  const shownCount = reduceMotion ? SIM_FILES.length : count

  useEffect(() => {
    if (reduceMotion) return
    const delay = count === 0 ? 2200 : count < SIM_FILES.length ? 1500 : 4200
    const timer = window.setTimeout(() => setCount((c) => (c < SIM_FILES.length ? c + 1 : 0)), delay)
    return () => window.clearTimeout(timer)
  }, [count, reduceMotion])

  return (
    <motion.div
      animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      className="w-full max-w-[420px]"
      aria-hidden="true"
    >
      <div className="rounded-[var(--radius-xl)] bg-white/[0.04] p-5 ring-1 ring-white/10 shadow-[var(--shadow-glow-primary)] backdrop-blur-sm">
        {/* Window chrome */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white">
            <motion.span
              className="size-1.5 rounded-full bg-emerald-400"
              animate={reduceMotion ? undefined : { opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            Session live
          </span>
        </div>

        <div className="flex gap-4">
          {/* QR + phone */}
          <div className="flex shrink-0 flex-col items-center gap-3">
            <QrGlyph scanning={!reduceMotion && shownCount === 0} />
            <div className="relative">
              {!reduceMotion && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-[var(--color-primary)]/40"
                  animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
              <span className="relative flex size-9 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
                <Smartphone className="size-4" aria-hidden="true" />
              </span>
            </div>
          </div>

          {/* Incoming files */}
          <ul className="flex min-h-[19rem] flex-1 flex-col justify-start gap-2">
            <AnimatePresence mode="popLayout">
              {SIM_FILES.slice(0, shownCount).map((f) => (
                <FileRow key={f.name} file={f} reduceMotion={reduceMotion} />
              ))}
            </AnimatePresence>
            {shownCount === 0 && !reduceMotion && (
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-white/15 p-4 text-center text-[11px] text-white/50"
              >
                Waiting for a phone to scan…
              </motion.li>
            )}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}
