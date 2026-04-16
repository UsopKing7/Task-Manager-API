import { Inject, Injectable } from '@nestjs/common'
import { IEmailVerificationCodeRepositorie } from 'core/repositories/emailVerificationCode.repositorie'
import { EmailVerifiCodeDTOs } from '../dtos/emailVerificationCode.dto'
import { IUserRepositorie } from 'core/repositories/user.repositorie'
import { EMAIL_VERIFICATION_CODE_REPOSITORY, USER_REPOSITORY } from 'shared/consts/tokens.nest'
import { EnumUserStatus } from 'core/enum/user.enum'

@Injectable()
export class VerifiOTPUseCase {
  constructor(
    @Inject(EMAIL_VERIFICATION_CODE_REPOSITORY)
    private readonly emailVerifiCodeRepo: IEmailVerificationCodeRepositorie,

    @Inject(USER_REPOSITORY)
    private readonly userRepo: IUserRepositorie
  ) {}

  async execute(data: EmailVerifiCodeDTOs.VerifyOTP): Promise<EmailVerifiCodeDTOs.ResponseOTP> {
    const otp = await this.emailVerifiCodeRepo.findUserByIdAndCode(data.id_user, data.code)

    if (!otp) throw new Error('OTP not found')
    if (otp.getUsed) throw new Error('OTP already used')
    if (otp.getExpiredAt < new Date()) {
      await Promise.all([
        this.userRepo.updateUser(otp.getIdUser, EnumUserStatus.DISABLED),
        this.emailVerifiCodeRepo.delete(otp.getIdUser)
      ])

      return { message: 'OTP expired and user disabled' }
    }

    await this.emailVerifiCodeRepo.update(otp.getIdEmailVerificationCode, true)

    await this.userRepo.updateUser(otp.getIdUser, EnumUserStatus.VERIFIED)

    return { message: 'OTP verified' }
  }
}
