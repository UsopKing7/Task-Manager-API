import { Inject, Injectable } from '@nestjs/common'
import { IUserInformationRepositorie } from 'core/repositories/userInformation.repositorie'
import { USER_INFORMATION_REPOSITORY } from 'shared/consts/tokens.nest'
import { UserInformationDTO } from '../dtos/userInformation.dto'
import { UserInformationErrors } from 'core/errors/userInformation.error'

@Injectable()
export class GetUserInformationUseCase {
  constructor(
    @Inject(USER_INFORMATION_REPOSITORY)
    private readonly userInformationRepo: IUserInformationRepositorie
  ) {}

  async execute(id_user: string): Promise<UserInformationDTO.PublicData> {
    const userIformation = await this.ensureUserInformationExists(id_user)
    return userIformation.getPublicData
  }

  private async ensureUserInformationExists(id_user: string) {
    const userExists = await this.userInformationRepo.findUserInformationByIdUser(id_user)
    if (!userExists) throw new UserInformationErrors.UserInformationNotExists()
    return userExists
  }
}
