import { Injectable } from '@nestjs/common'
import { UserInformationDTO } from 'modules/UserInformation/application/dtos/userInformation.dto'
import { CreateUserInformationUseCase } from 'modules/UserInformation/application/usecase/create-userInformation.usecase'
import { GetUserInformationUseCase } from 'modules/UserInformation/application/usecase/get-userInformation.usecase'

@Injectable()
export class UserInformationService {
  constructor(
    private readonly createUserInformationUseCase: CreateUserInformationUseCase,
    private readonly getUserInformationUseCase: GetUserInformationUseCase
  ) {}

  async createUserInformation(
    data: UserInformationDTO.Create
  ): Promise<UserInformationDTO.PublicData> {
    return await this.createUserInformationUseCase.execute(data)
  }

  async getUserInformation(id_user: string): Promise<UserInformationDTO.PublicData> {
    return await this.getUserInformationUseCase.execute(id_user)
  }
}
