import { ApolloError } from "apollo-server"
import { hash, verify } from "argon2"

import { initializeDatabaseClient } from "../loaders/pg"
import { logger } from "../loaders/logger"
import { DuplicateUsernameError } from "../errors/duplicate-username"
import { UserNotExistError } from "../errors/user-not-exist"
import { IncorrectPasswordError } from "../errors/incorrect-password"

interface UserData {
  id: string
  username: string
  password: string
}

export class User {
  username: string
  password: string

  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }
}

export class UserService {
  async register(userInput: User) {
    const database = await this.connectDatabase()

    try {
      // I don't want to limit the capital char
      const lowerCaseUsername = userInput.username.toLowerCase()

      await this.checkDuplicate(lowerCaseUsername)

      const hashedPassword = await hash(userInput.password)

      const QUERY = `INSERT INTO user_table(username, password) VALUES($1, $2)`
      const VALUES = [lowerCaseUsername, hashedPassword]

      await database.query(QUERY, VALUES)
    } catch (error) {
      logger.error(error.message)

      if (error instanceof DuplicateUsernameError) {
        throw new ApolloError(error.message, error.name)
      }

      throw new ApolloError(error.message)
    }
  }

  private async connectDatabase() {
    const database = await initializeDatabaseClient()
    return database
  }

  private async checkDuplicate(username: string) {
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

  // @todo refactor this method
  async login(userInput: User) {
    const database = await this.connectDatabase()

    try {
      const username = userInput.username.toLowerCase()

      const QUERY = `SELECT username, password FROM user_table WHERE username = $1`
      const VALUES = [username]

      const queryResult = await database.query<UserData>(QUERY, VALUES)

      const isUserExist = queryResult.rowCount > 0

      if (isUserExist) {
        const isPasswordCorrect = await verify(
          queryResult.rows[0].password,
          userInput.password
        )

        if (isPasswordCorrect) {
          return {
            id: queryResult.rows[0].id,
            username: queryResult.rows[0].username,
          }
        }

        throw new IncorrectPasswordError()
      }

      throw new UserNotExistError(username)
    } catch (error) {
      if (
        error instanceof IncorrectPasswordError ||
        error instanceof UserNotExistError
      ) {
        throw new ApolloError(error.message, error.name)
      }

      throw new ApolloError(error.message)
    }
  }
}
