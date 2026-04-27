import { EnumUserStatus } from 'core/enum/user.enum'
import { UserInterfaces } from 'core/interfaces/user.interface'
import { Email } from 'core/value-objects/Email'
import { Password } from 'core/value-objects/Password'

export class User {
  constructor(
    private readonly email: Email,
    private readonly password: Password,
    private readonly status: EnumUserStatus,
    private readonly deletedAt?: Date | null,
    private readonly id_user?: string,
    private readonly roles: string[] = []
  ) { }

  static fromPersistence(data: {
    id_user: string
    email: string
    password: string
    status: EnumUserStatus
    deletedAt?: Date | null
    roles?: string[]
  }): User {
    return new User(
      new Email(data.email),
      Password.fromHash(data.password),
      data.status,
      data.deletedAt,
      data.id_user,
      data.roles || []
    )
  }

  static createUser(props: UserInterfaces.CreateUserProps): User {
    return new User(new Email(props.email), Password.create(props.password), EnumUserStatus.PENDING)
  }

  get getPublicData(): UserInterfaces.GetPublicData {
    return {
      id_user: this.id_user!,
      email: this.email.getValue,
      status: this.status,
      roles: this.roles
    }
  }

  get getIdUser(): string {
    return this.id_user!
  }

  get getPassword(): string {
    return this.password.getValue
  }

  get getEmail(): string {
    return this.email.getValue
  }

  get getStatus(): EnumUserStatus {
    return this.status
  }

  get getDeletedAt(): Date | null {
    return this.deletedAt!
  }

  get getRoles(): string[] {
    return this.roles
  }
}
