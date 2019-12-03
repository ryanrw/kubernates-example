import { Pool } from "pg"
import { ApolloError } from "apollo-server"

import { logger } from "./logger"
import { DatabaseTerminateError } from "../errors/database-terminate"
import { AuthenticateError } from "../errors/authenticate"

export async function initializeDatabaseClient() {
  const database = new Pool()

  try {
    // simple query to health check the database
    await database.query(`SELECT NOW()`)

    return database
  } catch (error) {
    await database.end()

    logger.error(error.message)

    const isAuthenticateError = error.message.includes(`authentication`)
    const isConnectionDrop = error.message.includes(
      `Connection terminated unexpectedly`
    )

    if (isAuthenticateError) {
      throw new AuthenticateError(error.message)
    }

    if (isConnectionDrop) {
      throw new DatabaseTerminateError()
    }

    throw new ApolloError(error.message)
  }
}
