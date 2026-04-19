import { EnumGender } from 'core/enum/userInformation.enum'

export namespace UserInformationDTO {
  export interface Create {
    id_user: string
    nick_name: string
    age: number
    gender: EnumGender
  }

  export interface PublicData {
    id_user_information: string
    id_user: string
    nick_name: string
    age: number
    gender: EnumGender
  }
}
