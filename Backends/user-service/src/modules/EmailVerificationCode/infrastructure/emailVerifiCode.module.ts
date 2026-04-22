import { Module } from '@nestjs/common'
import { EmailVerificationCodeUseCase } from '../application/usecase/emailVerificationCode.usecase'
import { EMAIL_VERIFICATION_CODE_REPOSITORY, USER_REPOSITORY } from 'shared/consts/tokens.nest'
import { EmailVerificationPrisma } from './prisma/emailVerificationCode.prisma'
import { MailService } from 'modules/Mail/infrastructure/service/main.service'
import { UserPrisma } from 'modules/User/infrastructure/prisma/user.prisma'
import { EmailVerifiCodeService } from './service/emailVerifiCode.service'
import { VerifiOTPUseCase } from '../application/usecase/verifiOTP.usucase'
import { VerifiOtpController } from './controller/VerifiOTP.controller'
import { ChangePasswordUseCase } from '../application/usecase/changePassword.usecase'
import { VerifiOtpChangePasswordUseCase } from '../application/usecase/verifiOtpChangePassword.usecase'

@Module({
  providers: [
    EmailVerificationCodeUseCase,
    ChangePasswordUseCase,
    EmailVerifiCodeService,
    VerifiOTPUseCase,
    VerifiOtpChangePasswordUseCase,
    MailService,
    {
      provide: EMAIL_VERIFICATION_CODE_REPOSITORY,
      useClass: EmailVerificationPrisma
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserPrisma
    }
  ],
  controllers: [VerifiOtpController],

  exports: [EmailVerifiCodeService, VerifiOTPUseCase, VerifiOtpChangePasswordUseCase]
})
export class EmailVerificationCodeModule {}
