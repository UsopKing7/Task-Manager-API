import { Module } from '@nestjs/common'
import { ROLE_REPOSITORY } from 'shared/consts/tokens.nest'
import { RolPrisma } from './prisma/rol.prisma'

@Module({
  providers: [
    {
      provide: ROLE_REPOSITORY,
      useClass: RolPrisma
    }
  ],
  exports: [ROLE_REPOSITORY]
})
export class RolModule {}
