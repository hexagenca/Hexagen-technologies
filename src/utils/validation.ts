const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim())
}

export function isRequired(value: string): boolean {
  return value.trim().length > 0
}

export const ACCEPTED_RESUME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

export const ACCEPTED_RESUME_EXTENSIONS = ['.pdf', '.doc', '.docx']

export const MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024 // 5MB

export function isValidResumeType(file: File): boolean {
  if (ACCEPTED_RESUME_TYPES.includes(file.type)) return true
  const lowerName = file.name.toLowerCase()
  return ACCEPTED_RESUME_EXTENSIONS.some((extension) => lowerName.endsWith(extension))
}

export function isValidResumeSize(file: File): boolean {
  return file.size <= MAX_RESUME_SIZE_BYTES
}
