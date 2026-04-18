import { Injectable } from '@nestjs/common'
import { UserDTOs } from 'modules/User/application/dtos/user.dto'
import { CreateUserUseCase } from 'modules/User/application/usecase/create-user.usecase'
import { LoginUserUseCase } from 'modules/User/application/usecase/login-user.usecase'

@Injectable()
export class UserService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase
  ) {}

  async createUser(data: UserDTOs.CreateUserProps): Promise<UserDTOs.GetPublicData> {
    return await this.createUserUseCase.execute(data)
  }

  async loginUser(data: UserDTOs.LoginUserProps): Promise<UserDTOs.LoginResponse> {
    const { user, token, cookieOptions } = await this.loginUserUseCase.execute(data)
    return { user, token, cookieOptions }
  }
}
