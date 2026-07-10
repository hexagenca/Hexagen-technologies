import { CheckCircle2, CircleDot, Workflow as WorkflowIcon, UserCheck } from 'lucide-react'

interface WorkflowMockupProps {
  compact?: boolean
}

const nodes = [
  { label: 'New request', state: 'done' as const },
  { label: 'Extract data', state: 'done' as const },
  { label: 'Approval', state: 'active' as const },
  { label: 'Update system', state: 'pending' as const },
]

export function WorkflowMockup({ compact = false }: WorkflowMockupProps) {
  return (
    <div className="flex h-full w-full flex-col gap-4 p-4" role="img" aria-label="HexaFlow workflow diagram showing a request moving through extraction, approval, and system update steps">
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <span className="flex size-7 items-center justify-center rounded-full bg-gradient-brand">
          <WorkflowIcon className="size-3.5 text-white" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-semibold text-white">HexaFlow</p>
          <p className="text-[11px] text-white/45">Purchase approval workflow</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-0">
        {nodes.map((node, index) => (
          <div key={node.label} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded-full border ${
                  node.state === 'done'
                    ? 'border-emerald-400/40 bg-emerald-400/15 text-emerald-400'
                    : node.state === 'active'
                      ? 'border-cyan-300/50 bg-cyan-300/15 text-cyan-300'
                      : 'border-white/15 bg-white/5 text-white/30'
                }`}
              >
                {node.state === 'done' ? (
                  <CheckCircle2 className="size-3.5" aria-hidden="true" />
                ) : node.state === 'active' ? (
                  <UserCheck className="size-3.5" aria-hidden="true" />
                ) : (
                  <CircleDot className="size-3.5" aria-hidden="true" />
                )}
              </span>
              {index < nodes.length - 1 ? (
                <span className={`h-8 w-px ${node.state === 'done' ? 'bg-emerald-400/30' : 'bg-white/10'}`} aria-hidden="true" />
              ) : null}
            </div>
            <div className="pb-8 pt-1">
              <p className={`text-[13px] font-medium ${node.state === 'pending' ? 'text-white/40' : 'text-white'}`}>
                {node.label}
              </p>
              {node.state === 'active' && !compact ? (
                <p className="text-[11px] text-cyan-300/80">Awaiting manager approval</p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
