import { Body, Controller, HttpCode, Patch, Post, Res, UseGuards } from '@nestjs/common'
import { type Response } from 'express'
import { type UserDTOs } from 'modules/User/application/dtos/user.dto'
import { UserService } from '../service/user.service'
import { access_token } from 'shared/consts/keysJwt'
import { CurrentUser } from 'shared/utils/CurrentUser'
import { AuthGuard } from 'shared/middlewares/rutaPotected.middleware'
import { ApiBody, ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('User')
@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOperation({ summary: 'Registrar nuevo usuario' })
  @ApiBody({
    schema: {
      example: {
        email: 'user@gmail.com',
        password: 'Secure123!'
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Validación fallida' })
  @Post('register')
  @HttpCode(201)
  async register(@Body() data: UserDTOs.CreateUserProps) {
    const user = await this.userService.createUser(data)
    return { user }
  }

  @ApiOperation({ summary: 'Login — setea cookie access_token' })
  @ApiBody({
    schema: {
      example: {
        email: 'user@gmail.com',
        password: 'Secure123!'
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Login exitoso — cookie access_token seteada' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @Post('login')
  @HttpCode(200)
  async login(@Body() data: UserDTOs.LoginUserProps, @Res() res: Response) {
    const { user, token, cookieOptions } = await this.userService.loginUser(data)
    res.cookie(access_token, token, cookieOptions)
    return res.json({ user })
  }

  @ApiCookieAuth('access_token')
  @ApiOperation({ summary: 'Resetear contraseña — requiere cookie del verify-otp-change-password' })
  @ApiBody({
    schema: {
      example: {
        password: 'NewSecure123!'
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Contraseña actualizada exitosamente' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @UseGuards(AuthGuard)
  @Patch('reset-password')
  async changePassword(
    @CurrentUser('id_user') id_user: string,
    @Body() data: { password: string }
  ): Promise<UserDTOs.ResponseMessage> {
    return await this.userService.changePassword(id_user, data.password)
  }
}
