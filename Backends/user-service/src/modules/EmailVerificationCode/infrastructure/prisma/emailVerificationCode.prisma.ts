import { Injectable } from '@nestjs/common'
import { EmailVerificationCode } from 'core/entities/EmailVerificationCode'
import { EnumOtpType } from 'core/enum/emailVerificationCode.enum'
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
        type: data.getTypeOtp,
        expiresAt: data.getExpiredAt,
        used: data.getUsed
      }
    })

    return EmailVerificationCode.create({
      id_user: emailVerificationCode.id_user,
      code: emailVerificationCode.code,
      type: emailVerificationCode.type as EnumOtpType,
      expiresAt: emailVerificationCode.expiresAt,
      used: emailVerificationCode.used
    })
  }

  async findUserByIdAndCode(id_user: string, code: string): Promise<EmailVerificationCode | null> {
    const emailVerificationCode = await this.prisma.db.emailVerificationCode.findFirst({
      where: {
        id_user,
        code
      }
    })

    if (!emailVerificationCode) return null

    return EmailVerificationCode.create({
      id_user: emailVerificationCode.id_user,
      code: emailVerificationCode.code,
      type: emailVerificationCode.type as EnumOtpType,
      expiresAt: emailVerificationCode.expiresAt,
      used: emailVerificationCode.used,
      id_email_verification_code: emailVerificationCode.id_email_verification_code
    })
  }

  async update(id_email_verification_code: string, used: boolean): Promise<EmailVerificationCode> {
    const emailVerificationCode = await this.prisma.db.emailVerificationCode.update({
      where: {
        id_email_verification_code
      },
      data: {
        used
      }
    })

    return EmailVerificationCode.create({
      id_user: emailVerificationCode.id_user,
      code: emailVerificationCode.code,
      type: emailVerificationCode.type as EnumOtpType,
      expiresAt: emailVerificationCode.expiresAt,
      used: emailVerificationCode.used,
      id_email_verification_code: emailVerificationCode.id_email_verification_code
    })
  }

  async delete(id_user: string): Promise<void> {
    await this.prisma.db.user.update({
      where: {
        id_user
      },
      data: {
        deletedAt: new Date()
      }
    })
  }

  async findByCode(code: string, type: EnumOtpType): Promise<EmailVerificationCode | null> {
    const otp = await this.prisma.db.emailVerificationCode.findFirst({
      where: {
        code,
        type,
        used: false
      }
    })

    if (!otp) return null
    return EmailVerificationCode.create({
      id_email_verification_code: otp.id_email_verification_code,
      id_user: otp.id_user,
      code: otp.code,
      type: otp.type as EnumOtpType,
      expiresAt: otp.expiresAt,
      used: otp.used
    })
  }
}
