import { ApolloError } from "apollo-server"

export class DatabaseTerminateError extends ApolloError {
  constructor() {
    const message = `Connection to database had been terminate. This approximately mean database is not running`
    const code = `DatabaseTerminateError`

    super(message, code)
  }
}
