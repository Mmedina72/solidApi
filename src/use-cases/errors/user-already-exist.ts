export class userAlreadyExistError extends Error {
  constructor() {
    super('email already Exist')
    this.name = 'userAlreadyExist'
  }
}
