import { Injectable } from '@nestjs/common'
import { UserInformationDTO } from 'modules/UserInformation/application/dtos/userInformation.dto'
import { CreateUserInformationUseCase } from 'modules/UserInformation/application/usecase/create-userInformation.usecase'

@Injectable()
export class UserInformationService {
  constructor(private readonly createUserInformationUseCase: CreateUserInformationUseCase) {}

  async createUserInformation(
    data: UserInformationDTO.Create
  ): Promise<UserInformationDTO.PublicData> {
    return await this.createUserInformationUseCase.execute(data)
  }
}
