import { EmailVerificationCode } from 'core/entities/EmailVerificationCode'

export abstract class IEmailVerificationCodeRepositorie {
  abstract create(data: EmailVerificationCode): Promise<EmailVerificationCode>
}
