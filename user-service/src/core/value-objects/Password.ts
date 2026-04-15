import bcrypt from 'bcrypt'
import { env } from 'shared/consts/env'

export class Password {
  constructor(private readonly value: string) {}

  static create(plainPassword: string): Password {
    if (!plainPassword) throw new Error('Password is required')
    if (plainPassword.length < 9) throw new Error('Password too short')

    return new Password(plainPassword)
  }

  static fromHash(passwordHash: string): Password {
    return new Password(passwordHash)
  }

  async hashPassword(): Promise<string> {
    const salt = await bcrypt.genSalt(env.SALT)
    return bcrypt.hash(this.value, salt)
  }

  async comparePassword(plainText: string): Promise<boolean> {
    return await bcrypt.compare(plainText, this.value)
  }

  get getValue(): string {
    return this.value
  }
}
