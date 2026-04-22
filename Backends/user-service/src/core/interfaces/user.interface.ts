export namespace UserInterfaces {
  export interface GetPublicData {
    id_user: string
    email: string
    status: string
    roles: string[]
  }

  export interface CreateUserProps {
    email: string
    password: string
  }
}
