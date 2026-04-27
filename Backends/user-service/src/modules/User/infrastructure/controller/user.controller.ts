import { Body, Controller, Get, HttpCode, Patch, Post, Req, Res, UseGuards } from '@nestjs/common'
import { type Response, type Request } from 'express'
import { type UserDTOs } from 'modules/User/application/dtos/user.dto'
import { UserService } from '../service/user.service'
import { access_token } from 'shared/consts/keysJwt'
import { CurrentUser } from 'shared/utils/CurrentUser'
import { AuthGuard } from 'shared/middlewares/rutaPotected.middleware'
import { ApiBody, ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('User')
@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) { }
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

  @ApiCookieAuth('access_token')
  @ApiResponse({ status: 200, description: 'Informacion del usuario' })
  @UseGuards(AuthGuard)
  @Get('me')
  async getUser(
    @CurrentUser('id_user') id_user: string
  ): Promise<{
    user: UserDTOs.GetPublicData
  }> {
    const user = await this.userService.getUser(id_user)
    return { user: user.user }
  }

  @ApiCookieAuth('access_token')
  @ApiResponse({ status: 200, description: 'Logout exitoso' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @UseGuards(AuthGuard)
  @Post('logout')
  @HttpCode(200)
  async logout(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies?.['access_token']
    await this.userService.logout(token)
    res.clearCookie(access_token)
    return res.json({ message: 'Logout exitoso' })
  }
}

