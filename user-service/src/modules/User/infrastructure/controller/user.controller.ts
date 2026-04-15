import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { type UserDTOs } from 'modules/User/application/dtos/user.dto'
import { UserService } from '../service/user.service'

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(201)
  async register(@Body() data: UserDTOs.CreateUserProps) {
    const user = await this.userService.createUser(data)
    return { user }
  }
}
