import { UserInformation } from 'core/entities/UserInformation'

export abstract class IUserInformationRepositorie {
  abstract create(data: UserInformation): Promise<UserInformation>
  abstract findNickName(nick_name: string): Promise<boolean>
  abstract findUserInformationByIdUser(id_user: string): Promise<UserInformation | null>
}
