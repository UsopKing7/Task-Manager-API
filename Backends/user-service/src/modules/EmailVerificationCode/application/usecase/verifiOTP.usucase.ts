import { Inject, Injectable } from '@nestjs/common'
import { IEmailVerificationCodeRepositorie } from 'core/repositories/emailVerificationCode.repositorie'
import { EmailVerifiCodeDTOs } from '../dtos/emailVerificationCode.dto'
import { IUserRepositorie } from 'core/repositories/user.repositorie'
import { EMAIL_VERIFICATION_CODE_REPOSITORY, USER_REPOSITORY } from 'shared/consts/tokens.nest'
import { EnumUserStatus } from 'core/enum/user.enum'
import { MailService } from 'modules/Mail/infrastructure/service/main.service'
import { EmailVerificationCodeErrors } from 'core/errors/EmailVerificationCode.error'

@Injectable()
export class VerifiOTPUseCase {
  constructor(
    @Inject(EMAIL_VERIFICATION_CODE_REPOSITORY)
    private readonly emailVerifiCodeRepo: IEmailVerificationCodeRepositorie,

    @Inject(USER_REPOSITORY)
    private readonly userRepo: IUserRepositorie,
    private readonly mailService: MailService
  ) {}

  async execute(data: EmailVerifiCodeDTOs.VerifyOTP): Promise<EmailVerifiCodeDTOs.ResponseMessage> {
    const user = await this.ensureUserExists(data.id_user)
    const otp = await this.emailVerifiCodeRepo.findUserByIdAndCode(data.id_user, data.code)

    if (!otp) throw new EmailVerificationCodeErrors.OtpNotFound()
    if (otp.getUsed) throw new EmailVerificationCodeErrors.OtpAlreadyUsed()
    if (otp.getExpiredAt < new Date()) {
      await Promise.all([
        this.userRepo.updateUser(otp.getIdUser, EnumUserStatus.DISABLED),
        this.emailVerifiCodeRepo.delete(otp.getIdUser)
      ])

      return { message: 'OTP expired and user disabled' }
    }

    await this.emailVerifiCodeRepo.update(otp.getIdEmailVerificationCode, true)
    await this.userRepo.updateUser(otp.getIdUser, EnumUserStatus.VERIFIED)
    void this.mailService.sendEmailConfirmation(user.getEmail)

    return { message: 'OTP verified' }
  }

  private readonly ensureUserExists = async (id_user: string) => {
    const user = await this.userRepo.findUserById(id_user)
    if (!user) throw new EmailVerificationCodeErrors.UserNotFound()
    return user
  }
}
