import { Injectable } from '@nestjs/common'
import { EmailVerificationCode } from 'core/entities/EmailVerificationCode'
import { IEmailVerificationCodeRepositorie } from 'core/repositories/emailVerificationCode.repositorie'
import { PrismaService } from 'shared/configs/prisma/prisma.service'

@Injectable()
export class EmailVerificationPrisma implements IEmailVerificationCodeRepositorie {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: EmailVerificationCode): Promise<EmailVerificationCode> {
    const emailVerificationCode = await this.prisma.db.emailVerificationCode.create({
      data: {
        id_user: data.getIdUser,
        code: data.getCode,
        expiresAt: data.getExpiredAt,
        used: data.getUsed
      }
    })

    return EmailVerificationCode.create({
      id_user: emailVerificationCode.id_user,
      code: emailVerificationCode.code,
      expiresAt: emailVerificationCode.expiresAt,
      used: emailVerificationCode.used
    })
  }
}
