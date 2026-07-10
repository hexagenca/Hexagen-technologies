import { Check, Minus } from 'lucide-react'
import { products } from '@/data/products'

const comparisonRows: { label: string; values: boolean[] }[] = [
  { label: 'Private knowledge base', values: [true, false, false, false] },
  { label: 'Document extraction & validation', values: [false, true, false, false] },
  { label: 'Cross-system workflow automation', values: [false, false, true, false] },
  { label: 'Natural-language data queries', values: [false, false, false, true] },
  { label: 'Role-based access control', values: [true, true, true, true] },
  { label: 'Source citations / audit trail', values: [true, true, true, true] },
  { label: 'Human-in-the-loop review', values: [true, true, true, true] },
]

export function ProductComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-[var(--color-surface-border)]">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <caption className="sr-only">Feature comparison across Hexagen products</caption>
        <thead>
          <tr className="bg-[var(--color-surface-alt)]">
            <th scope="col" className="p-4 font-semibold text-[var(--color-text-onlight)]">
              Capability
            </th>
            {products.map((product) => (
              <th key={product.slug} scope="col" className="p-4 font-semibold text-[var(--color-text-onlight)]">
                {product.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((row, rowIndex) => (
            <tr key={row.label} className={rowIndex % 2 === 1 ? 'bg-[var(--color-surface-muted)]' : undefined}>
              <th scope="row" className="p-4 font-medium text-[var(--color-text-onlight)]">
                {row.label}
              </th>
              {row.values.map((value, index) => (
                <td key={products[index]?.slug ?? index} className="p-4">
                  {value ? (
                    <span className="inline-flex items-center gap-1.5 text-[var(--color-primary-dark)]">
                      <Check className="size-4" aria-hidden="true" />
                      <span className="sr-only">Included</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[var(--color-text-onlight-muted)]">
                      <Minus className="size-4" aria-hidden="true" />
                      <span className="sr-only">Not applicable</span>
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
