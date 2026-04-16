import { CreateEmailVerificationCodeProps } from 'core/interfaces/emailVerificationCode.interface'

export class EmailVerificationCode {
  constructor(
    private readonly id_user: string,
    private readonly code: string,
    private readonly expiresAt: Date,
    private readonly used: boolean
  ) {}

  static create(data: CreateEmailVerificationCodeProps): EmailVerificationCode {
    return new EmailVerificationCode(data.id_user, data.code, data.expiresAt, data.used)
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

  get getPublicData() {
    return {
      id_user: this.id_user,
      expiresAt: this.expiresAt,
      used: this.used
    }
  }
}
