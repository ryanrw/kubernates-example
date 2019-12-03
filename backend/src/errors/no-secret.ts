export class NoSecretError extends Error {
  constructor() {
    const message = `JWT_SECRET env not found.`
    super(message)
    this.name = `NoSecretError`
  }
}
