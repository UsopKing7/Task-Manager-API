import { Body, Controller, HttpCode, Param, Post, Res } from '@nestjs/common'
import { type Response } from 'express'
import { EmailVerifiCodeService } from '../service/emailVerifiCode.service'
import { access_token } from 'shared/consts/keysJwt'

@Controller('api')
export class VerifiOtpController {
  constructor(private readonly verifiOtpService: EmailVerifiCodeService) {}

  @Post('verify-otp/:id_user')
  @HttpCode(200)
  async verifiOtp(@Param('id_user') id_user: string, @Body() data: { code: string }) {
    return await this.verifiOtpService.verifiOtp({ id_user, code: data.code })
  }

  @Post('change-password')
  @HttpCode(200)
  async changePassword(@Body() data: { email: string }) {
    return await this.verifiOtpService.changePassword({ email: data.email })
  }

  @Post('verify-otp-change-password')
  @HttpCode(200)
  async verifiOtpChangePassword(@Body() data: { code: string }, @Res() res: Response) {
    const { message, token, cookieOptions } =
      await this.verifiOtpService.verifiOtpChangePassword(data)
    res.cookie(access_token, token, cookieOptions)
    return res.json({ message })
  }
}
