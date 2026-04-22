import { Inject, Injectable } from '@nestjs/common'
import { IEmailVerificationCodeRepositorie } from 'core/repositories/emailVerificationCode.repositorie'
import { IUserRepositorie } from 'core/repositories/user.repositorie'
import { EMAIL_VERIFICATION_CODE_REPOSITORY, USER_REPOSITORY } from 'shared/consts/tokens.nest'
import { EmailVerifiCodeDTOs } from '../dtos/emailVerificationCode.dto'
import { EnumOtpType } from 'core/enum/emailVerificationCode.enum'
import { generateToken } from 'shared/utils/generateToken'

@Injectable()
export class VerifiOtpChangePasswordUseCase {
  constructor(
    @Inject(EMAIL_VERIFICATION_CODE_REPOSITORY)
    private readonly emailVerifiCode: IEmailVerificationCodeRepositorie,

    @Inject(USER_REPOSITORY)
    private readonly userRepo: IUserRepositorie
  ) {}

  async execute(
    data: EmailVerifiCodeDTOs.VerifiOtpChaangePassword
  ): Promise<EmailVerifiCodeDTOs.ResponseOTP> {
    const otp = await this.emailVerifiCode.findByCode(data.code, EnumOtpType.RESET_PASSWORD)

    if (!otp) throw new Error('OTP not found')
    if (otp.getUsed) throw new Error('OTP already used')
    if (otp.getExpiredAt < new Date()) throw new Error('OTP expired')

    const user = await this.userRepo.findUserById(otp.getIdUser)
    if (!user) throw new Error('User not found')
    await this.emailVerifiCode.update(otp.getIdEmailVerificationCode, true)

    const token = generateToken({
      id_user: user.getIdUser,
      email: user.getEmail,
      roles: user.getRoles
    })

    return {
      message: 'OTP verified',
      token,
      cookieOptions: {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 // 1 day
      }
    }
  }
}
