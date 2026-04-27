import { Module } from '@nestjs/common'
import { UserModule } from 'modules/User/infrastructure/user.module'
import { UserInformationModule } from 'modules/UserInformation/infrastructure/userInformation.module'
import { PrismaModule } from 'shared/configs/prisma/prisma.module'
import { RedisModule } from 'shared/configs/redis/redis.module'

@Module({
  imports: [PrismaModule, RedisModule, UserModule, UserInformationModule]
})
export class AppModule { }

