import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common'
import { type Response } from 'express'
import { type UserDTOs } from 'modules/User/application/dtos/user.dto'
import { UserService } from '../service/user.service'
import { access_token } from 'shared/consts/keysJwt'

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(201)
  async register(@Body() data: UserDTOs.CreateUserProps) {
    const user = await this.userService.createUser(data)
    return { user }
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() data: UserDTOs.LoginUserProps, @Res() res: Response) {
    const { user, token, cookieOptions } = await this.userService.loginUser(data)
    res.cookie(access_token, token, cookieOptions)
    return res.json({ user })
  }
}
