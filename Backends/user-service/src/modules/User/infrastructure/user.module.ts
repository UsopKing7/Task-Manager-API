import { Module } from '@nestjs/common'
import { PrismaModule } from 'shared/configs/prisma/prisma.module'
import { UserController } from './controller/user.controller'
import { UserService } from './service/user.service'
import { CreateUserUseCase } from '../application/usecase/create-user.usecase'
import { UserPrisma } from './prisma/user.prisma'
import { USER_REPOSITORY } from 'shared/consts/tokens.nest'
import { RolModule } from 'modules/Rol/infrastructure/rol.module'
import { UserRolModule } from 'modules/UserRol/infrastructure/userRol.module'
import { EmailVerificationCodeModule } from 'modules/EmailVerificationCode/infrastructure/emailVerifiCode.module'
import { LoginUserUseCase } from '../application/usecase/login-user.usecase'
import { ChangePasswordUseCase } from '../application/usecase/change-password.usecase'
import { MailService } from 'modules/Mail/infrastructure/service/main.service'

@Module({
  imports: [PrismaModule, RolModule, UserRolModule, EmailVerificationCodeModule],
  controllers: [UserController],
  providers: [
    UserService,
    CreateUserUseCase,
    LoginUserUseCase,
    ChangePasswordUseCase,
    MailService,
    {
      provide: USER_REPOSITORY,
      useClass: UserPrisma
    }
  ]
})
export class UserModule {}
