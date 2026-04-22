import { EmailVerificationCode } from 'core/entities/EmailVerificationCode'
import { EnumOtpType } from 'core/enum/emailVerificationCode.enum'

export abstract class IEmailVerificationCodeRepositorie {
  abstract create(data: EmailVerificationCode): Promise<EmailVerificationCode>
  abstract findUserByIdAndCode(
    id_user: string,
    code: string,
    type?: EnumOtpType
  ): Promise<EmailVerificationCode | null>
  abstract update(id_email_verification_code: string, used: boolean): Promise<EmailVerificationCode>
  abstract delete(id_email_verification_code: string): Promise<void>
  abstract findByCode(code: string, type: EnumOtpType): Promise<EmailVerificationCode | null>
}
