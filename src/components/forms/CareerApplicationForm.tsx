import { useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { AlertCircle, CheckCircle2, Loader2, UploadCloud } from 'lucide-react'
import { submitCareerApplication } from '@/utils/forms'
import { isRequired, isValidEmail, isValidResumeSize, isValidResumeType, MAX_RESUME_SIZE_BYTES } from '@/utils/validation'
import { FormField, inputClasses } from './FormField'
import { Button } from '@/components/common/Button'

interface FormState {
  fullName: string
  email: string
  message: string
  honeypot: string
}

const initialState: FormState = { fullName: '', email: '', message: '', honeypot: '' }

type Errors = Partial<Record<'fullName' | 'email' | 'resume', string>>
type Status = 'idle' | 'submitting' | 'success' | 'error'

interface CareerApplicationFormProps {
  jobTitle: string
}

export function CareerApplicationForm({ jobTitle }: CareerApplicationFormProps) {
  const [values, setValues] = useState<FormState>(initialState)
  const [resume, setResume] = useState<File | null>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const errorSummaryRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    setResume(event.target.files?.[0] ?? null)
  }

  function validate(): Errors {
    const nextErrors: Errors = {}
    if (!isRequired(values.fullName)) nextErrors.fullName = 'Enter your full name.'
    if (!isRequired(values.email)) {
      nextErrors.email = 'Enter your email address.'
    } else if (!isValidEmail(values.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (!resume) {
      nextErrors.resume = 'Attach your resume (PDF, DOC, or DOCX).'
    } else if (!isValidResumeType(resume)) {
      nextErrors.resume = 'Resume must be a PDF, DOC, or DOCX file.'
    } else if (!isValidResumeSize(resume)) {
      nextErrors.resume = `Resume must be smaller than ${Math.round(MAX_RESUME_SIZE_BYTES / (1024 * 1024))}MB.`
    }
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
    const result = await submitCareerApplication({ ...values, resume })
    setStatusMessage(result.message)

    if (result.ok) {
      setStatus('success')
      setValues(initialState)
      setResume(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
    } else {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="flex flex-col items-center gap-3 rounded-[var(--radius-xl)] border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="size-10 text-emerald-600" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-[var(--color-text-onlight)]">Application received</h3>
        <p className="text-sm text-[var(--color-text-onlight-muted)]">
          Thanks for applying to the {jobTitle} role. We&rsquo;ll be in touch if it&rsquo;s a fit.
        </p>
      </div>
    )
  }

  const errorCount = Object.keys(errors).length

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {errorCount > 0 ? (
        <div ref={errorSummaryRef} tabIndex={-1} role="alert" className="rounded-[var(--radius-lg)] border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p className="mb-2 flex items-center gap-2 font-semibold">
            <AlertCircle className="size-4" aria-hidden="true" />
            Please fix the following before submitting:
          </p>
          <ul className="list-inside list-disc">
            {Object.values(errors).map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {status === 'error' ? (
        <div role="alert" className="rounded-[var(--radius-lg)] border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {statusMessage}
        </div>
      ) : null}

      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="career_company_website">Leave this field blank</label>
        <input
          id="career_company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.honeypot}
          onChange={(event) => updateField('honeypot', event.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Full name" htmlFor="applicantName" required error={errors.fullName}>
          <input
            id="applicantName"
            className={inputClasses}
            value={values.fullName}
            onChange={(event) => updateField('fullName', event.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'applicantName-error' : undefined}
            autoComplete="name"
          />
        </FormField>

        <FormField label="Email" htmlFor="applicantEmail" required error={errors.email}>
          <input
            id="applicantEmail"
            type="email"
            className={inputClasses}
            value={values.email}
            onChange={(event) => updateField('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'applicantEmail-error' : undefined}
            autoComplete="email"
          />
        </FormField>
      </div>

      <FormField label="Resume" htmlFor="resume" required error={errors.resume}>
        <div className="flex items-center gap-3 rounded-[var(--radius-md)] border border-dashed border-[var(--color-surface-border)] p-4">
          <UploadCloud className="size-5 shrink-0 text-[var(--color-text-onlight-muted)]" aria-hidden="true" />
          <input
            ref={fileInputRef}
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
            aria-invalid={Boolean(errors.resume)}
            aria-describedby={errors.resume ? 'resume-error' : undefined}
            className="w-full text-sm text-[var(--color-text-onlight-muted)] file:mr-4 file:rounded-full file:border-0 file:bg-[var(--color-surface-alt)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[var(--color-primary-dark)]"
          />
        </div>
        <p className="text-xs text-[var(--color-text-onlight-muted)]">PDF, DOC, or DOCX. Max 5MB.</p>
      </FormField>

      <FormField label="Anything you'd like to add?" htmlFor="applicantMessage">
        <textarea
          id="applicantMessage"
          rows={4}
          className={inputClasses}
          value={values.message}
          onChange={(event) => updateField('message', event.target.value)}
        />
      </FormField>

      <Button type="submit" variant="primary" size="lg" disabled={status === 'submitting'} className="justify-center">
        {status === 'submitting' ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Submitting…
          </>
        ) : (
          'Submit application'
        )}
      </Button>
    </form>
  )
}
