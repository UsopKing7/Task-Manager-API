import { User } from 'core/entities/User'

export abstract class IUserRepositorie {
  abstract create(data: User): Promise<User>
}
