import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common'
import { EmailVerifiCodeService } from '../service/emailVerifiCode.service'

@Controller('api')
export class VerifiOtpController {
  constructor(private readonly verifiOtpService: EmailVerifiCodeService) {}

  @Post('verify-otp/:id_user')
  @HttpCode(200)
  async verifiOtp(@Param('id_user') id_user: string, @Body() data: { code: string }) {
    return await this.verifiOtpService.verifiOtp({ id_user, code: data.code })
  }
}
