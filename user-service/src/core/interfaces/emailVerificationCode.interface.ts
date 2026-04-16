export interface CreateEmailVerificationCodeProps {
  id_user: string
  code: string
  expiresAt: Date
  used: boolean
  id_email_verification_code?: string
}
