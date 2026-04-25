import { Injectable } from '@nestjs/common'
import { UserDTOs } from 'modules/User/application/dtos/user.dto'
import { ChangePasswordUseCase } from 'modules/User/application/usecase/change-password.usecase'
import { CreateUserUseCase } from 'modules/User/application/usecase/create-user.usecase'
import { GetUserUseCase } from 'modules/User/application/usecase/get-user.usecase'
import { LoginUserUseCase } from 'modules/User/application/usecase/login-user.usecase'

@Injectable()
export class UserService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly changePasswordUseCase: ChangePasswordUseCase,
    private readonly getUserUseCase: GetUserUseCase
  ) { }

  async createUser(data: UserDTOs.CreateUserProps): Promise<UserDTOs.GetPublicData> {
    return await this.createUserUseCase.execute(data)
  }

  async loginUser(data: UserDTOs.LoginUserProps): Promise<UserDTOs.LoginResponse> {
    const { user, token, cookieOptions } = await this.loginUserUseCase.execute(data)
    return { user, token, cookieOptions }
  }

  async changePassword(id_user: string, password: string): Promise<UserDTOs.ResponseMessage> {
    const { message } = await this.changePasswordUseCase.execute(id_user, password)
    return { message }
  }

  async getUser(id_user: string): Promise<{ user: UserDTOs.GetPublicData }> {
    const user = await this.getUserUseCase.execute(id_user)
    return { user }
  }
}

