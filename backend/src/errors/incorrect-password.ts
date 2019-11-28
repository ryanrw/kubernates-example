export class IncorrectPasswordError extends Error {
  constructor() {
    const message = `Password is incorrect. Please try again.`
    super(message)
    this.name = `IncorrectPasswordError`
  }
}
