import { Pool } from "pg"
import { ApolloError } from "apollo-server"

import { logger } from "./logger"

export async function initializeDatabaseClient() {
  const database = new Pool()

  try {
    await database.query(`SELECT NOW()`)

    return database
  } catch (error) {
    await database.end()
    logger.error(error.message)
    const isAuthenticateError = error.message.includes(`authentication`)

    if (isAuthenticateError) {
      throw new ApolloError(error.message, "DatabaseConnectError")
    }
  }
}
