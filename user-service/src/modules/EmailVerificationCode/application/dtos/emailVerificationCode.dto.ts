export namespace EmailVerifiCodeDTOs {
  export interface Create {
    id_user: string
  }

  export interface Response {
    id_user: string
    expiresAt: Date
    used: boolean
  }
}
