export class UserNotExistError extends Error {
  constructor(user: string) {
    const message = `User "${user}" is not exist. Please try again.`
    super(message)
    this.name = `UserNotExistError`
  }
}
