import { Inject, Injectable } from '@nestjs/common'
import { IEmailVerificationCodeRepositorie } from 'core/repositories/emailVerificationCode.repositorie'
import { EmailVerifiCodeDTOs } from '../dtos/emailVerificationCode.dto'
import { EmailVerificationCode } from 'core/entities/EmailVerificationCode'
import { EMAIL_VERIFICATION_CODE_REPOSITORY, USER_REPOSITORY } from 'shared/consts/tokens.nest'
import { IUserRepositorie } from 'core/repositories/user.repositorie'
import { EnumOtpType } from 'core/enum/emailVerificationCode.enum'
import { MailService } from 'modules/Mail/infrastructure/service/main.service'

@Injectable()
export class ChangePasswordUseCase {
  constructor(
    @Inject(EMAIL_VERIFICATION_CODE_REPOSITORY)
    private readonly emailVerificationCodeRepo: IEmailVerificationCodeRepositorie,

    @Inject(USER_REPOSITORY)
    private readonly userRepo: IUserRepositorie,
    private readonly mailService: MailService
  ) {}

  async execute(data: EmailVerifiCodeDTOs.ChangePassword): Promise<EmailVerifiCodeDTOs.Response> {
    const user = await this.ensureEmailExists(data.email)
    const code = this.generateOTP()
    const expiresAt = this.generateExipiration()
    const emailVerificationCode = EmailVerificationCode.create({
      id_user: user.getIdUser,
      code,
      expiresAt,
      type: EnumOtpType.RESET_PASSWORD,
      used: false
    })

    const emailVerifiCodeCreated =
      await this.emailVerificationCodeRepo.create(emailVerificationCode)

    void this.mailService.sendOtpChangePassword(user.getEmail, code)

    return emailVerifiCodeCreated.getPublicData
  }

  private async ensureEmailExists(email: string) {
    const user = await this.userRepo.findUserByEmail(email)
    if (!user) throw new Error('User not exist with this email')
    return user
  }

  private generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  private generateExipiration = (min = 10): Date => {
    const now = new Date()
    now.setMinutes(now.getMinutes() + min)
    return now
  }
}
