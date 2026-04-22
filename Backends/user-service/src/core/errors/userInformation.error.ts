export namespace UserInformationErrors {
  export class NickNameAlreadyExists extends Error {
    constructor() {
      super('Nick name already exists')
      this.name = 'NickNameAlreadyExistsError'
    }
  }

  export class UserInformationAlreadyExists extends Error {
    constructor() {
      super('User information already exists')
      this.name = 'UserInformationAlreadyExistsError'
    }
  }
}
