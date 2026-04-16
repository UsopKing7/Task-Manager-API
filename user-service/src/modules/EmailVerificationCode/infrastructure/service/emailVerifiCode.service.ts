import { Injectable } from '@nestjs/common'
import { EmailVerifiCodeDTOs } from 'modules/EmailVerificationCode/application/dtos/emailVerificationCode.dto'
import { EmailVerificationCodeUseCase } from 'modules/EmailVerificationCode/application/usecase/emailVerificationCode.usecase'

@Injectable()
export class EmailVerifiCodeService {
  constructor(private readonly emailVerificationUseCase: EmailVerificationCodeUseCase) {}

  create(data: EmailVerifiCodeDTOs.Create): Promise<EmailVerifiCodeDTOs.Response> {
    return this.emailVerificationUseCase.execute(data)
  }
}
