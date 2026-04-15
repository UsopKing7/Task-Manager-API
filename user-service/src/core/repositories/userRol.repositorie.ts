import { UserRol } from 'core/entities/UserRol'

export abstract class IUserRolRepositorie {
  abstract create(data: UserRol): Promise<UserRol>
  abstract findUserAndRol(id_user: string, id_rol: string): Promise<UserRol | null>
}
