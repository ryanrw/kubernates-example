import { ApolloError } from "apollo-server"

import { initializeDatabaseClient } from "../loaders/pg"
import { logger } from "../loaders/logger"
import { DuplicateUsernameError } from "../errors/duplicateUsername"
import { from } from "apollo-link"

// @todo add the real user service
export const users = [{ username: `ryan` }, { username: `fung` }]

export class User {
  username: string
  password: string

  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }
}

// exactly new one
export class UserService {
  async register(userInput: User) {
    const database = await this.connectDatabase()

    try {
      await this.checkDuplicate(userInput.username)

      const QUERY = `INSERT INTO user_table(username, password) VALUES($1, $2)`
      const VALUES = [userInput.username.toLowerCase(), userInput.password]

      await database.query(QUERY, VALUES)
    } catch (error) {
      logger.error(error.message)

      if (error instanceof DuplicateUsernameError) {
        throw new ApolloError(error.message, error.name)
      }
    }
  }

  private async connectDatabase() {
    const database = await initializeDatabaseClient()
    return database
  }

  async checkDuplicate(username: string) {
    const database = await this.connectDatabase()

    const DUPLICATE_CHECK_QUERY = `SELECT username FROM user_table WHERE username = $1`
    const DUPLICATE_CHECK_VALUE = [username]

    const result = await database.query(
      DUPLICATE_CHECK_QUERY,
      DUPLICATE_CHECK_VALUE
    )

    const isDuplicatedUsername = result.rowCount > 0

    if (isDuplicatedUsername) {
      throw new DuplicateUsernameError(
        "This username is already used. Please try new username."
      )
    }
  }
}
