import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import { UserInformationService } from '../service/userInformation.service'
import { EnumGender } from 'core/enum/userInformation.enum'
import { AuthGuard } from 'shared/middlewares/rutaPotected.middleware'
import { CurrentUser } from 'shared/utils/CurrentUser'

@Controller('api')
export class UserInformationController {
  constructor(private readonly userInformationService: UserInformationService) {}

  @UseGuards(AuthGuard)
  @Post('create/userInformation')
  @HttpCode(201)
  async createUserInformation(
    @CurrentUser('id_user') id_user: string,
    @Body() data: { nick_name: string; age: number; gender: EnumGender }
  ) {
    const userInformation = await this.userInformationService.createUserInformation({
      id_user,
      nick_name: data.nick_name,
      age: data.age,
      gender: data.gender
    })

    return { userInformation }
  }
}
