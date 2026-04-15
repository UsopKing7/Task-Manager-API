import { EnumNameRol } from 'core/enum/user.enum'

export namespace RolInterface {
  export interface CreateRol {
    name: EnumNameRol
    id_rol?: string
  }

  export interface GetRol {
    name: EnumNameRol
    id_rol: string
  }
}
