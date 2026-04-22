import { EnumOtpType } from 'core/enum/emailVerificationCode.enum'

export interface CreateEmailVerificationCodeProps {
  id_user: string
  code: string
  expiresAt: Date
  used: boolean
  type: EnumOtpType
  id_email_verification_code?: string
}
