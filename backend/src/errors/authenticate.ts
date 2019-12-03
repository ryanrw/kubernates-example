import { ApolloError } from "apollo-server"

export class AuthenticateError extends ApolloError {
  constructor(message: string) {
    const code = `AuthenticateError`
    super(message, code)
  }
}
