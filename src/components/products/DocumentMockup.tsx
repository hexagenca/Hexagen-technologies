import { CheckCircle2, Loader2, FileSearch } from 'lucide-react'

interface DocumentMockupProps {
  compact?: boolean
}

const documents = [
  { name: 'Invoice_04521.pdf', status: 'Validated' as const },
  { name: 'Vendor_Contract.docx', status: 'Extracting' as const },
  { name: 'Purchase_Order_118.pdf', status: 'Queued' as const },
]

const statusStyles: Record<string, string> = {
  Validated: 'text-emerald-400',
  Extracting: 'text-cyan-300',
  Queued: 'text-white/40',
}

export function DocumentMockup({ compact = false }: DocumentMockupProps) {
  return (
    <div className="flex h-full w-full flex-col gap-3 p-4" role="img" aria-label="HexaDocs document processing panel showing documents being classified, extracted, and validated">
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <span className="flex size-7 items-center justify-center rounded-full bg-gradient-brand">
          <FileSearch className="size-3.5 text-white" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-semibold text-white">HexaDocs</p>
          <p className="text-[11px] text-white/45">Processing queue</p>
        </div>
      </div>

      <ul className="flex flex-col gap-2">
        {documents.map((doc) => (
          <li
            key={doc.name}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-white/80"
          >
            <span className="truncate">{doc.name}</span>
            <span className={`flex items-center gap-1.5 text-[11px] font-medium ${statusStyles[doc.status]}`}>
              {doc.status === 'Extracting' ? (
                <Loader2 className="size-3 animate-spin" aria-hidden="true" />
              ) : doc.status === 'Validated' ? (
                <CheckCircle2 className="size-3" aria-hidden="true" />
              ) : (
                <span className="size-1.5 rounded-full bg-white/30" aria-hidden="true" />
              )}
              {doc.status}
            </span>
          </li>
        ))}
      </ul>

      {!compact ? (
        <div className="mt-1 rounded-lg border border-white/10 bg-white/5 p-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-white/40">Extracted fields</p>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[12px]">
            <span className="text-white/45">Vendor</span>
            <span className="text-white">Northline Supply Co.</span>
            <span className="text-white/45">Total</span>
            <span className="text-white">$4,820.00</span>
            <span className="text-white/45">Due date</span>
            <span className="text-white">Aug 14</span>
          </div>
        </div>
      ) : null}
    </div>
  )
}
