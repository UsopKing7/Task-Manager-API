import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import { UserInformationService } from '../service/userInformation.service'
import { EnumGender } from 'core/enum/userInformation.enum'
import { AuthGuard } from 'shared/middlewares/rutaPotected.middleware'
import { CurrentUser } from 'shared/utils/CurrentUser'
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiCookieAuth } from '@nestjs/swagger'

@ApiTags('User Information')
@Controller('api')
export class UserInformationController {
  constructor(private readonly userInformationService: UserInformationService) {}

  @ApiCookieAuth('access_token')
  @ApiOperation({ summary: 'Crear perfil de usuario' })
  @ApiBody({
    schema: {
      example: {
        nick_name: 'johndoe',
        age: 25,
        gender: 'MALE'
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Información de usuario creada' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
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
