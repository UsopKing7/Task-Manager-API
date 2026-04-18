export namespace UserDTOs {
  export interface CreateUserProps {
    email: string
    password: string
  }

  export interface GetPublicData {
    id_user: string
    email: string
    status: string
    roles: string[]
  }

  export interface LoginResponse {
    user: GetPublicData
    token: string
    cookieOptions: object
  }

  export interface LoginUserProps {
    email: string
    password: string
  }
}
