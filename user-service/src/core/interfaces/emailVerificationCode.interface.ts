export interface CreateEmailVerificationCodeProps {
  id_user: string
  code: string
  expiresAt: Date
  used: boolean
}
