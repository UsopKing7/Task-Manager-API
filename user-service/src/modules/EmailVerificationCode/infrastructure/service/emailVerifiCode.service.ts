import { Injectable } from '@nestjs/common'
import { EmailVerifiCodeDTOs } from 'modules/EmailVerificationCode/application/dtos/emailVerificationCode.dto'
import { EmailVerificationCodeUseCase } from 'modules/EmailVerificationCode/application/usecase/emailVerificationCode.usecase'
import { VerifiOTPUseCase } from 'modules/EmailVerificationCode/application/usecase/verifiOTP.usucase'

@Injectable()
export class EmailVerifiCodeService {
  constructor(
    private readonly emailVerificationUseCase: EmailVerificationCodeUseCase,
    private readonly verifiOtpUsecase: VerifiOTPUseCase
  ) {}

  async create(data: EmailVerifiCodeDTOs.Create): Promise<EmailVerifiCodeDTOs.Response> {
    return this.emailVerificationUseCase.execute(data)
  }

  async verifiOtp(data: EmailVerifiCodeDTOs.VerifyOTP): Promise<EmailVerifiCodeDTOs.ResponseOTP> {
    return this.verifiOtpUsecase.execute(data)
  }
}
