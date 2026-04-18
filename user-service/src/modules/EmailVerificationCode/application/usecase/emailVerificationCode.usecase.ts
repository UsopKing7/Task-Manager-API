import { Inject, Injectable } from '@nestjs/common'
import { IEmailVerificationCodeRepositorie } from 'core/repositories/emailVerificationCode.repositorie'
import { EmailVerifiCodeDTOs } from '../dtos/emailVerificationCode.dto'
import { EmailVerificationCode } from 'core/entities/EmailVerificationCode'
import { IUserRepositorie } from 'core/repositories/user.repositorie'
import { MailService } from 'modules/Mail/infrastructure/service/main.service'
import { EMAIL_VERIFICATION_CODE_REPOSITORY, USER_REPOSITORY } from 'shared/consts/tokens.nest'

@Injectable()
export class EmailVerificationCodeUseCase {
  constructor(
    @Inject(EMAIL_VERIFICATION_CODE_REPOSITORY)
    private readonly emailVerificationCodeRepo: IEmailVerificationCodeRepositorie,

    @Inject(USER_REPOSITORY)
    private readonly userRepo: IUserRepositorie,
    private readonly mailService: MailService
  ) {}

  async execute(data: EmailVerifiCodeDTOs.Create): Promise<EmailVerifiCodeDTOs.Response> {
    const user = await this.ensureUserExists(data.id_user)
    const code = this.generateOTP()
    const expiresAt = this.generateExipiration()
    const emailVerificationCode = EmailVerificationCode.create({
      id_user: data.id_user,
      code,
      expiresAt,
      used: false
    })

    const emailVerifiCodeCreated =
      await this.emailVerificationCodeRepo.create(emailVerificationCode)

    void this.mailService.sendOTP(user.getEmail, code)
    return emailVerifiCodeCreated.getPublicData
  }

  private generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  private generateExipiration = (min = 10): Date => {
    const now = new Date()
    now.setMinutes(now.getMinutes() + min)
    return now
  }

  private readonly ensureUserExists = async (id_user: string) => {
    const user = await this.userRepo.findUserById(id_user)
    if (!user) throw new Error('User not found')
    return user
  }
}
