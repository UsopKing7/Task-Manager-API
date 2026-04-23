import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common'
import { UserInformationService } from '../service/userInformation.service'
import { EnumGender } from 'core/enum/userInformation.enum'
import { AuthGuard } from 'shared/middlewares/rutaPotected.middleware'
import { CurrentUser } from 'shared/utils/CurrentUser'
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger'

@ApiTags('User Information')
@Controller('api')
export class UserInformationController {
  constructor(private readonly userInformationService: UserInformationService) {}

  @ApiCookieAuth('access_token')
  @ApiOperation({ summary: 'Crear perfil de usuario' })
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

  @ApiCookieAuth('access_token')
  @ApiOperation({ summary: 'Obtener información de usuario' })
  @ApiResponse({ status: 200, description: 'Información de usuario obtenida' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @UseGuards(AuthGuard)
  @Get('userInformations')
  @HttpCode(200)
  async getUserInformation(@CurrentUser('id_user') id_user: string) {
    const userInformation = await this.userInformationService.getUserInformation(id_user)
    return { userInformation }
  }
}
