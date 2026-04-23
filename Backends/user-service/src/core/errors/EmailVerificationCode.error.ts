export namespace EmailVerificationCodeErrors {
  export class UserNotExistsWithThisEmail extends Error {
    constructor() {
      super('User not exists with this email')
      this.name = 'UserNotExistsWithThisEmail'
    }
  }

  export class UserNotFound extends Error {
    constructor() {
      super('User not found')
      this.name = 'UserNotFound'
    }
  }

  export class OtpNotFound extends Error {
    constructor() {
      super('Otp not found')
      this.name = 'OtpNotFound'
    }
  }

  export class OtpAlreadyUsed extends Error {
    constructor() {
      super('Otp already used')
      this.name = 'OtpAlreadyUsed'
    }
  }

  export class OtpExpired extends Error {
    constructor() {
      super('Otp expired')
      this.name = 'OtpExpired'
    }
  }
}
