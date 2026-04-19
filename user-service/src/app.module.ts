import { Module } from '@nestjs/common'
import { UserModule } from 'modules/User/infrastructure/user.module'
import { UserInformationModule } from 'modules/UserInformation/infrastructure/userInformation.module'
import { PrismaModule } from 'shared/configs/prisma/prisma.module'

@Module({
  imports: [PrismaModule, UserModule, UserInformationModule]
})
export class AppModule {}
