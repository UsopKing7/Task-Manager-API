import { EnumGender } from 'core/enum/userInformation.enum'
import { UserInformationInterfaces } from 'core/interfaces/userInformation.interface'

export class UserInformation {
  constructor(
    private readonly id_user: string,
    private readonly nick_name: string,
    private readonly age: number,
    private readonly gender: EnumGender,
    private readonly id_user_information?: string
  ) {}

  static fromPersistence(data: {
    id_user_information: string
    id_user: string
    nick_name: string
    age: number
    gender: EnumGender
  }): UserInformation {
    return new UserInformation(
      data.id_user,
      data.nick_name,
      data.age,
      data.gender,
      data.id_user_information
    )
  }

  static createUserInformation(props: UserInformationInterfaces.CreateUserInfo): UserInformation {
    return new UserInformation(props.id_user, props.nick_name, props.age, props.gender)
  }

  get getPublicData(): UserInformationInterfaces.PublicData {
    return {
      id_user_information: this.id_user_information!,
      id_user: this.id_user,
      nick_name: this.nick_name,
      age: this.age,
      gender: this.gender
    }
  }

  get getIdUserInformation(): string {
    return this.id_user_information!
  }

  get getIdUser(): string {
    return this.id_user
  }

  get getNickName(): string {
    return this.nick_name
  }

  get getAge(): number {
    return this.age
  }

  get getGender(): EnumGender {
    return this.gender
  }
}
