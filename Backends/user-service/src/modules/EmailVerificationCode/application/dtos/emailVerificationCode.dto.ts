export namespace EmailVerifiCodeDTOs {
  export interface Create {
    id_user: string
  }

  export interface Response {
    id_user: string
    expiresAt: Date
    used: boolean
  }

  export interface VerifyOTP {
    id_user: string
    code: string
  }

  export interface VerifiOtpChaangePassword {
    code: string
  }

  export interface ResponseOTP {
    message: string
    token: string
    cookieOptions: object
  }

  export interface ResponseMessage {
    message: string
  }

  export interface ChangePassword {
    email: string
  }
}
