export namespace UserErrors {
  export class UserNotFoundError extends Error {
    constructor() {
      super('User not found')
      this.name = 'UserNotFoundError'
    }
  }

  export class UserNotVerifiedError extends Error {
    constructor() {
      super('User not verified')
      this.name = 'UserNotVerifiedError'
    }
  }

  export class CredentialsIncorrectError extends Error {
    constructor() {
      super('Credentials incorrect')
      this.name = 'CredentialsIncorrectError'
    }
  }
}
