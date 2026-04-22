import { Module } from '@nestjs/common'
import { USER_ROLE_REPOSITORY } from 'shared/consts/tokens.nest'
import { UserRolPrisma } from './prisma/userRol.prisma'
import { CreateUserRolUseCase } from '../application/usecase/createUserRol.usecase'

@Module({
  providers: [
    CreateUserRolUseCase,
    {
      provide: USER_ROLE_REPOSITORY,
      useClass: UserRolPrisma
    }
  ],
  exports: [CreateUserRolUseCase]
})
export class UserRolModule {}
