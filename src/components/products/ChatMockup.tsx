import { FileText, Sparkles } from 'lucide-react'

interface ChatMockupProps {
  compact?: boolean
}

export function ChatMockup({ compact = false }: ChatMockupProps) {
  return (
    <div className="flex h-full w-full flex-col gap-3 p-4" role="img" aria-label="HexaChat conversation interface showing an AI assistant answering a policy question with a cited source">
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <span className="flex size-7 items-center justify-center rounded-full bg-gradient-brand">
          <Sparkles className="size-3.5 text-white" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-semibold text-white">HexaChat</p>
          <p className="text-[11px] text-white/45">Connected to Policies &amp; Procedures</p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 text-[11px] text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          Online
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 overflow-hidden">
        <div className="max-w-[85%] self-end rounded-2xl rounded-tr-sm bg-white/10 px-3.5 py-2 text-[13px] text-white">
          What is our remote work policy for new hires?
        </div>
        <div className="max-w-[92%] self-start rounded-2xl rounded-tl-sm bg-gradient-brand-soft px-3.5 py-2.5 text-[13px] leading-relaxed text-white">
          New hires may work remotely after their first 30 days, subject to manager approval and role
          eligibility.
          {!compact ? (
            <span className="mt-2 flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-white/70 w-fit">
              <FileText className="size-3" aria-hidden="true" />
              Source: HR Policy Handbook, p.12
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2.5 text-[12px] text-white/40">
        Ask HexaChat a question…
      </div>
    </div>
  )
}
