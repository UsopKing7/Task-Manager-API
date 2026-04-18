import { Inject, Injectable } from '@nestjs/common'
import { IUserRepositorie } from 'core/repositories/user.repositorie'
import { UserDTOs } from '../dtos/user.dto'
import { Password } from 'core/value-objects/Password'
import { User } from 'core/entities/User'
import { Email } from 'core/value-objects/Email'
import { CreateUserRolUseCase } from 'modules/UserRol/application/usecase/createUserRol.usecase'
import { IRoleRepositorie } from 'core/repositories/role.repositorie'
import { EnumNameRol } from 'core/enum/user.enum'
import { ROLE_REPOSITORY, USER_REPOSITORY } from 'shared/consts/tokens.nest'
import { EmailVerifiCodeService } from 'modules/EmailVerificationCode/infrastructure/service/emailVerifiCode.service'
import { UserErrors } from 'core/errors/user.error'

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: IUserRepositorie,

    @Inject(ROLE_REPOSITORY)
    private readonly rolRepo: IRoleRepositorie,
    private readonly userRolRepo: CreateUserRolUseCase,
    private readonly emailVerificationCode: EmailVerifiCodeService
  ) {}

  async execute(data: UserDTOs.CreateUserProps): Promise<UserDTOs.GetPublicData> {
    const passwordVO = await Password.create(data.password).hashPassword()
    const emailVO = new Email(data.email)

    const user = User.createUser({
      email: emailVO.getValue,
      password: passwordVO
    })

    const userCreated = await this.userRepo.create(user)
    const rol = await this.rolRepo.findByNameRol(EnumNameRol.USER)
    if (!rol) throw new UserErrors.UserNotFoundError()
    await this.userRolRepo.execute({ id_user: userCreated.getIdUser, id_rol: rol.getIdRol })
    void this.emailVerificationCode.create({ id_user: userCreated.getIdUser })
    return userCreated.getPublicData
  }
}
