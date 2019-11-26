export class DuplicateUsernameError extends Error {
  constructor(message: string) {
    super(message)
    this.name = `DuplicateUsernameError`
  }
}
