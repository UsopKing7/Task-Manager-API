export class Email {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  constructor(private readonly value: string) {
    if (!value) throw new Error('Email is required')
    if (!Email.EMAIL_REGEX.test(value)) throw new Error('Invalid email')
  }

  get getValue(): string {
    return this.value
  }
}
