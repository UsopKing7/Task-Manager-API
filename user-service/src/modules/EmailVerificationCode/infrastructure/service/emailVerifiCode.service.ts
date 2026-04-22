import { Injectable } from '@nestjs/common'
import { EmailVerifiCodeDTOs } from 'modules/EmailVerificationCode/application/dtos/emailVerificationCode.dto'
import { ChangePasswordUseCase } from 'modules/EmailVerificationCode/application/usecase/changePassword.usecase'
import { EmailVerificationCodeUseCase } from 'modules/EmailVerificationCode/application/usecase/emailVerificationCode.usecase'
import { VerifiOTPUseCase } from 'modules/EmailVerificationCode/application/usecase/verifiOTP.usucase'
import { VerifiOtpChangePasswordUseCase } from 'modules/EmailVerificationCode/application/usecase/verifiOtpChangePassword.usecase'

@Injectable()
export class EmailVerifiCodeService {
  constructor(
    private readonly emailVerificationUseCase: EmailVerificationCodeUseCase,
    private readonly changePasswordUseCase: ChangePasswordUseCase,
    private readonly verifiOtpUsecase: VerifiOTPUseCase,
    private readonly verifiOtpChangePasswordUseCase: VerifiOtpChangePasswordUseCase
  ) {}

  async create(data: EmailVerifiCodeDTOs.Create): Promise<EmailVerifiCodeDTOs.Response> {
    return await this.emailVerificationUseCase.execute(data)
  }

  async verifiOtp(
    data: EmailVerifiCodeDTOs.VerifyOTP
  ): Promise<EmailVerifiCodeDTOs.ResponseMessage> {
    return await this.verifiOtpUsecase.execute(data)
  }

  async changePassword(
    data: EmailVerifiCodeDTOs.ChangePassword
  ): Promise<EmailVerifiCodeDTOs.Response> {
    return await this.changePasswordUseCase.execute(data)
  }

  async verifiOtpChangePassword(
    data: EmailVerifiCodeDTOs.VerifiOtpChaangePassword
  ): Promise<EmailVerifiCodeDTOs.ResponseOTP> {
    const { message, token, cookieOptions } =
      await this.verifiOtpChangePasswordUseCase.execute(data)
    return { message, token, cookieOptions }
  }
}
