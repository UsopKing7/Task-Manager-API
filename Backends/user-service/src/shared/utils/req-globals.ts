export interface RequestUser {
  id_user: string
  email: string
  roles: string[]
  iat: number
  exp: number
}

declare global {
  namespace Express {
    interface Request {
      user: RequestUser
    }
  }
}
