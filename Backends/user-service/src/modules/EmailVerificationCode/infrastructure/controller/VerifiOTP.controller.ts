import { Body, Controller, HttpCode, Param, Post, Res } from '@nestjs/common'
import { type Response } from 'express'
import { EmailVerifiCodeService } from '../service/emailVerifiCode.service'
import { access_token } from 'shared/consts/keysJwt'
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger'

@ApiTags('Verificar OTP')
@Controller('api')
export class VerifiOtpController {
  constructor(private readonly verifiOtpService: EmailVerifiCodeService) {}

  @ApiOperation({ summary: 'Verificar OTP de registro' })
  @ApiParam({ name: 'id_user', description: 'ULID del usuario' })
  @ApiBody({
    schema: {
      example: { code: '123456' }
    }
  })
  @ApiResponse({ status: 200, description: 'Email verificado exitosamente' })
  @ApiResponse({ status: 400, description: 'OTP inválido / expirado / ya usado' })
  @Post('verify-otp/:id_user')
  @HttpCode(200)
  async verifiOtp(@Param('id_user') id_user: string, @Body() data: { code: string }) {
    return await this.verifiOtpService.verifiOtp({ id_user, code: data.code })
  }

  @ApiOperation({ summary: 'Enviar OTP al email para recuperar contraseña' })
  @ApiBody({
    schema: {
      example: { email: 'user@gmail.com' }
    }
  })
  @ApiResponse({ status: 200, description: 'OTP enviado al email' })
  @ApiResponse({ status: 400, description: 'Usuario no encontrado' })
  @Post('change-password')
  @HttpCode(200)
  async changePassword(@Body() data: { email: string }) {
    return await this.verifiOtpService.changePassword({ email: data.email })
  }

  @ApiOperation({ summary: 'Verificar OTP de recuperación — setea cookie access_token (10min)' })
  @ApiBody({
    schema: {
      example: {
        email: 'user@gmail.com',
        code: '123456'
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'OTP válido — cookie access_token seteada por 10 minutos'
  })
  @ApiResponse({ status: 400, description: 'OTP inválido / expirado / ya usado' })
  @Post('verify-otp-change-password')
  @HttpCode(200)
  async verifiOtpChangePassword(@Body() data: { code: string }, @Res() res: Response) {
    const { message, token, cookieOptions } =
      await this.verifiOtpService.verifiOtpChangePassword(data)
    res.cookie(access_token, token, cookieOptions)
    return res.json({ message })
  }
}
