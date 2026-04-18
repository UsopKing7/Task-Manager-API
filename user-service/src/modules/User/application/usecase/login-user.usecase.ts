import { Inject, Injectable } from '@nestjs/common'
import { IUserRepositorie } from 'core/repositories/user.repositorie'
import { USER_REPOSITORY } from 'shared/consts/tokens.nest'
import { UserDTOs } from '../dtos/user.dto'
import { Email } from 'core/value-objects/Email'
import { Password } from 'core/value-objects/Password'
import { EnumUserStatus } from 'core/enum/user.enum'
import { UserErrors } from 'core/errors/user.error'
import { generateToken } from 'shared/utils/generateToken'
import { env } from 'shared/consts/env'

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: IUserRepositorie
  ) {}

  async execute(data: UserDTOs.LoginUserProps): Promise<UserDTOs.LoginResponse> {
    const emailVO = new Email(data.email)
    const user = await this.userRepo.findUserByEmail(emailVO.getValue)
    if (!user) throw new UserErrors.UserNotFoundError()
    if (user.getStatus !== EnumUserStatus.VERIFIED) throw new UserErrors.UserNotVerifiedError()

    const passwordVO = Password.fromHash(user.getPassword)
    const isValidPassword = await passwordVO.comparePassword(data.password)
    if (!isValidPassword) throw new UserErrors.CredentialsIncorrectError()

    const token = generateToken({
      id_user: user.getIdUser,
      email: emailVO.getValue,
      roles: user.getRoles
    })

    return {
      user: user.getPublicData,
      token,
      cookieOptions: {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: env.EXPIRES_IN
      }
    }
  }
}
