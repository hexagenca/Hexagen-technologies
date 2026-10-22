import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, Lock, Play } from 'lucide-react'
import { tmsProduct } from '@/data/tms'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/utils/cn'

const { chapters, src, poster, durationSeconds } = tmsProduct.tour

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

function chapterAt(time: number) {
  let index = 0
  chapters.forEach((chapter, i) => {
    if (time >= chapter.at) index = i
  })
  return index
}

/**
 * The product demonstrating itself: a real screen recording of the TMS demo
 * account (a fictional carrier with fictional data), framed in a browser
 * window, with a chapter list that seeks the recording. Nothing loads until the
 * tour scrolls into view (`preload="none"` plus the poster frame); it then plays
 * muted, and pauses again once it leaves. Under prefers-reduced-motion it never
 * starts on its own — the poster stays until someone presses play or a chapter.
 * The recording has burned-in captions and no audio, and the active chapter's
 * caption is repeated as text below it.
 */
export function TmsTour() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [started, setStarted] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const frame = frameRef.current
    if (!video || !frame || reducedMotion) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // The recording opens on a near-white sign-in screen; start where the poster is.
          if (video.currentTime < chapters[0].at) video.currentTime = chapters[0].at
          video.play().catch(() => undefined)
        } else {
          video.pause()
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(frame)
    return () => observer.disconnect()
  }, [reducedMotion])

  const seek = (index: number) => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = chapters[index].at
    setActive(index)
    video.play().catch(() => undefined)
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-10">
      <div ref={frameRef}>
        <div className="overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-ink-900)] shadow-[var(--shadow-glow-primary)] ring-1 ring-white/10">
          {/* Browser chrome — names the real address the recording was made against */}
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="mx-auto flex min-w-0 items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1 text-[11px] text-white/60">
              <Lock className="size-3 shrink-0" aria-hidden="true" />
              <span className="truncate">tms.hexagen.ca</span>
            </span>
            <span className="hidden shrink-0 rounded-full bg-amber-400/15 px-2.5 py-1 text-[10px] font-semibold text-amber-200 ring-1 ring-amber-300/30 sm:inline">
              Demo account
            </span>
          </div>

          <div className="relative aspect-[1440/900] bg-[var(--color-ink)]">
            <video
              ref={videoRef}
              className="absolute inset-0 size-full object-cover"
              poster={poster}
              preload="none"
              muted
              playsInline
              loop
              controls={started}
              aria-label="Screen recording of Hexagen TMS: dashboard, quotes, trips, dispatch board, fleet map, drivers, documents, invoices and reports"
              onPlay={() => setStarted(true)}
              onTimeUpdate={(event) => setActive(chapterAt(event.currentTarget.currentTime))}
              onError={() => setFailed(true)}
            >
              <source src={src.webm} type="video/webm" />
              <source src={src.mp4} type="video/mp4" onError={() => setFailed(true)} />
            </video>

            {!started && !failed ? (
              <button
                type="button"
                onClick={() => seek(active)}
                className="group absolute inset-0 flex items-center justify-center bg-[var(--color-ink)]/25"
              >
                <span className="flex items-center gap-3 rounded-full bg-gradient-brand py-3 pl-4 pr-6 text-sm font-semibold text-white shadow-[var(--shadow-glow-primary)] transition-transform group-hover:scale-105">
                  <Play className="size-5 fill-current" aria-hidden="true" />
                  Play the tour · {formatTime(durationSeconds)}
                </span>
              </button>
            ) : null}

            {failed ? (
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 bg-[var(--color-ink)]/85 px-5 py-4 text-sm text-white">
                <span>The recording could not load here.</span>
                <a
                  href={tmsProduct.productTourHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-[var(--color-primary-light)] hover:underline"
                >
                  Take the tour on tms.hexagen.ca
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            ) : null}
          </div>
        </div>

        <p className="mt-4 min-h-[3rem] text-sm leading-relaxed text-[var(--color-text-onlight-muted)]">
          <span className="font-semibold text-[var(--color-text-onlight)]">{chapters[active].label}.</span>{' '}
          {chapters[active].caption}
        </p>
        <p className="mt-1 text-xs text-[var(--color-text-onlight-muted)]">
          A real recording of the product, made on our demo account. The company and every record in it are fictional.
        </p>
      </div>

      <nav aria-label="Tour chapters">
        <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1 lg:gap-1">
          {chapters.map((chapter, i) => {
            const isActive = i === active
            return (
              <li key={chapter.label}>
                <button
                  type="button"
                  onClick={() => seek(i)}
                  aria-current={isActive ? 'step' : undefined}
                  className={cn(
                    'relative flex min-h-11 w-full items-center justify-between gap-3 overflow-hidden rounded-[var(--radius-md)] px-4 py-2.5 text-left text-sm font-medium transition-colors',
                    isActive
                      ? 'text-[var(--color-primary-dark)]'
                      : 'text-[var(--color-text-onlight-muted)] hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-text-onlight)]',
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId={reducedMotion ? undefined : 'tms-tour-active'}
                      aria-hidden="true"
                      className="absolute inset-0 rounded-[var(--radius-md)] bg-gradient-brand-soft ring-1 ring-[var(--color-primary)]/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative">{chapter.label}</span>
                  <span className="relative font-mono text-xs opacity-70">{formatTime(chapter.at)}</span>
                </button>
              </li>
            )
          })}
        </ol>
      </nav>
    </div>
  )
}
