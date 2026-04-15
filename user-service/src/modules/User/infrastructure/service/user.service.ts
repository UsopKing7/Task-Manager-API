import { Injectable } from '@nestjs/common'
import { UserDTOs } from 'modules/User/application/dtos/user.dto'
import { CreateUserUseCase } from 'modules/User/application/usecase/create-user.usecase'

@Injectable()
export class UserService {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async createUser(data: UserDTOs.CreateUserProps): Promise<UserDTOs.GetPublicData> {
    return await this.createUserUseCase.execute(data)
  }
}
