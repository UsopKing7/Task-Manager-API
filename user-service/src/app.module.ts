import { Module } from '@nestjs/common'
import { UserModule } from 'modules/User/infrastructure/user.module'
import { PrismaModule } from 'shared/configs/prisma/prisma.module'

@Module({
  imports: [PrismaModule, UserModule]
})
export class AppModule {}
