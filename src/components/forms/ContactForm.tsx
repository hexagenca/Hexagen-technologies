import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import { products } from '@/data/products'
import { company } from '@/data/company'
import { submitDemoRequest } from '@/utils/forms'
import { isRequired, isValidEmail } from '@/utils/validation'
import { FormField, inputClasses } from './FormField'
import { Button } from '@/components/common/Button'

interface FormState {
  fullName: string
  workEmail: string
  company: string
  industry: string
  preferredProduct: string
  businessChallenge: string
  timeline: string
  phone: string
  message: string
  honeypot: string
}

const initialState: FormState = {
  fullName: '',
  workEmail: '',
  company: '',
  industry: '',
  preferredProduct: '',
  businessChallenge: '',
  timeline: '',
  phone: '',
  message: '',
  honeypot: '',
}

const industries = ['Professional Services', 'Financial Services', 'Healthcare', 'Retail', 'Manufacturing', 'Technology', 'Other']
const timelines = ['Immediately', 'Within 1 month', '1–3 months', '3–6 months', 'Just exploring']

type Errors = Partial<Record<keyof FormState, string>>
type Status = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const errorSummaryRef = useRef<HTMLDivElement>(null)

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  function validate(): Errors {
    const nextErrors: Errors = {}
    if (!isRequired(values.fullName)) nextErrors.fullName = 'Enter your full name.'
    if (!isRequired(values.workEmail)) {
      nextErrors.workEmail = 'Enter your work email.'
    } else if (!isValidEmail(values.workEmail)) {
      nextErrors.workEmail = 'Enter a valid email address.'
    }
    if (!isRequired(values.company)) nextErrors.company = 'Enter your company name.'
    if (!isRequired(values.businessChallenge)) nextErrors.businessChallenge = 'Tell us about your challenge.'
    return nextErrors
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      requestAnimationFrame(() => errorSummaryRef.current?.focus())
      return
    }

    setStatus('submitting')
    const result = await submitDemoRequest(values)
    setStatusMessage(result.message)

    if (result.ok) {
      setStatus('success')
      setValues(initialState)
    } else {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="flex flex-col items-center gap-3 rounded-[var(--radius-xl)] border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="size-10 text-emerald-600" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-[var(--color-text-onlight)]">Thanks — we received your message</h3>
        <p className="text-sm text-[var(--color-text-onlight-muted)]">
          A member of the Hexagen team will follow up with you shortly.
        </p>
        <Button variant="secondary" onClick={() => setStatus('idle')}>
          Send another message
        </Button>
      </div>
    )
  }

  const errorCount = Object.keys(errors).length

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {errorCount > 0 ? (
        <div
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-[var(--radius-lg)] border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <p className="mb-2 flex items-center gap-2 font-semibold">
            <AlertCircle className="size-4" aria-hidden="true" />
            Please fix the following before submitting:
          </p>
          <ul className="list-inside list-disc">
            {Object.entries(errors).map(([field, message]) => (
              <li key={field}>{message}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {status === 'error' ? (
        <div role="alert" className="rounded-[var(--radius-lg)] border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {statusMessage}
        </div>
      ) : null}

      {/* Honeypot: hidden from sighted users and screen readers, but visible to most spam bots that auto-fill every field. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="company_website">Leave this field blank</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.honeypot}
          onChange={(event) => updateField('honeypot', event.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Full name" htmlFor="fullName" required error={errors.fullName}>
          <input
            id="fullName"
            className={inputClasses}
            value={values.fullName}
            onChange={(event) => updateField('fullName', event.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            autoComplete="name"
          />
        </FormField>

        <FormField label="Work email" htmlFor="workEmail" required error={errors.workEmail}>
          <input
            id="workEmail"
            type="email"
            className={inputClasses}
            value={values.workEmail}
            onChange={(event) => updateField('workEmail', event.target.value)}
            aria-invalid={Boolean(errors.workEmail)}
            aria-describedby={errors.workEmail ? 'workEmail-error' : undefined}
            autoComplete="email"
          />
        </FormField>

        <FormField label="Company" htmlFor="companyName" required error={errors.company}>
          <input
            id="companyName"
            className={inputClasses}
            value={values.company}
            onChange={(event) => updateField('company', event.target.value)}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? 'companyName-error' : undefined}
            autoComplete="organization"
          />
        </FormField>

        <FormField label="Phone number" htmlFor="phone">
          <input
            id="phone"
            type="tel"
            className={inputClasses}
            value={values.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            autoComplete="tel"
          />
        </FormField>

        <FormField label="Industry" htmlFor="industry">
          <select id="industry" className={inputClasses} value={values.industry} onChange={(event) => updateField('industry', event.target.value)}>
            <option value="">Select an industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Preferred product" htmlFor="preferredProduct">
          <select
            id="preferredProduct"
            className={inputClasses}
            value={values.preferredProduct}
            onChange={(event) => updateField('preferredProduct', event.target.value)}
          >
            <option value="">Not sure yet</option>
            {products.map((product) => (
              <option key={product.slug} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Timeline" htmlFor="timeline" className="sm:col-span-2">
          <select id="timeline" className={inputClasses} value={values.timeline} onChange={(event) => updateField('timeline', event.target.value)}>
            <option value="">Select a timeline</option>
            {timelines.map((timeline) => (
              <option key={timeline} value={timeline}>
                {timeline}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField label="Business challenge" htmlFor="businessChallenge" required error={errors.businessChallenge}>
        <textarea
          id="businessChallenge"
          rows={4}
          className={inputClasses}
          value={values.businessChallenge}
          onChange={(event) => updateField('businessChallenge', event.target.value)}
          aria-invalid={Boolean(errors.businessChallenge)}
          aria-describedby={errors.businessChallenge ? 'businessChallenge-error' : undefined}
          placeholder="What process, data, or customer experience problem are you trying to solve?"
        />
      </FormField>

      <FormField label="Anything else we should know?" htmlFor="message">
        <textarea
          id="message"
          rows={3}
          className={inputClasses}
          value={values.message}
          onChange={(event) => updateField('message', event.target.value)}
        />
      </FormField>

      <Button type="submit" variant="primary" size="lg" disabled={status === 'submitting'} className="justify-center">
        {status === 'submitting' ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          'Submit request'
        )}
      </Button>

      <p className="text-xs text-[var(--color-text-onlight-muted)]">
        You can also reach us directly at{' '}
        <a href={`mailto:${company.email}`} className="font-medium text-[var(--color-primary-dark)]">
          {company.email}
        </a>{' '}
        or{' '}
        <a href={company.phoneHref} className="font-medium text-[var(--color-primary-dark)]">
          {company.phone}
        </a>
        .
      </p>
    </form>
  )
}
