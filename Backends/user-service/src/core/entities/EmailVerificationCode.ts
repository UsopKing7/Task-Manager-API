import { EnumOtpType } from 'core/enum/emailVerificationCode.enum'
import { CreateEmailVerificationCodeProps } from 'core/interfaces/emailVerificationCode.interface'

export class EmailVerificationCode {
  constructor(
    private readonly id_user: string,
    private readonly code: string,
    private readonly expiresAt: Date,
    private readonly used: boolean,
    private readonly type: EnumOtpType,
    private readonly id_email_verification_code?: string
  ) {}

  static create(data: CreateEmailVerificationCodeProps): EmailVerificationCode {
    return new EmailVerificationCode(
      data.id_user,
      data.code,
      data.expiresAt,
      data.used,
      data.type,
      data.id_email_verification_code
    )
  }

  get getIdUser(): string {
    return this.id_user
  }

  get getCode(): string {
    return this.code
  }

  get getExpiredAt(): Date {
    return this.expiresAt
  }

  get getUsed(): boolean {
    return this.used
  }

  get getTypeOtp(): EnumOtpType {
    return this.type
  }

  get getIdEmailVerificationCode(): string {
    return this.id_email_verification_code!
  }

  get getPublicData() {
    return {
      id_user: this.id_user,
      expiresAt: this.expiresAt,
      used: this.used
    }
  }
}
