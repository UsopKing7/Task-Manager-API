import { Module } from '@nestjs/common'
import { PrismaModule } from 'shared/configs/prisma/prisma.module'
import { UserInformationService } from './service/userInformation.service'
import { CreateUserInformationUseCase } from '../application/usecase/create-userInformation.usecase'
import { USER_INFORMATION_REPOSITORY } from 'shared/consts/tokens.nest'
import { UserInformationPrisma } from './prisma/userInformation.prisma'
import { UserInformationController } from './controller/userInformation.controller'
import { GetUserInformationUseCase } from '../application/usecase/get-userInformation.usecase'

@Module({
  imports: [PrismaModule],
  controllers: [UserInformationController],
  providers: [
    UserInformationService,
    CreateUserInformationUseCase,
    GetUserInformationUseCase,
    {
      provide: USER_INFORMATION_REPOSITORY,
      useClass: UserInformationPrisma
    }
  ]
})
export class UserInformationModule {}
