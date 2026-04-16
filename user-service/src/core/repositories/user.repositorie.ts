import { User } from 'core/entities/User'
import { EnumUserStatus } from 'core/enum/user.enum'

export abstract class IUserRepositorie {
  abstract create(data: User): Promise<User>
  abstract findUserById(id_user: string): Promise<User | null>
  abstract updateUser(id_user: string, status: EnumUserStatus): Promise<User>
  abstract deleteUserById(id_user: string): Promise<User>
}
