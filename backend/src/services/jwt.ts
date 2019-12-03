import jwt from "jsonwebtoken"
import { ApolloError } from "apollo-server"

import { NoSecretError } from "../errors/no-secret"
import { logger } from "../loaders/logger"

interface Payload {
  id: string
  username: string
}

export function convertUserDataToJwt(payload: Payload) {
  try {
    const JWT_SECRET = process.env.JWT_SECRET || ""

    if (!JWT_SECRET) {
      throw new NoSecretError()
    }

    const token = jwt.sign(payload, JWT_SECRET)

    return {
      jwt: token,
    }
  } catch (error) {
    logger.error(error.message)
    throw new ApolloError(error.message, error.name)
  }
}
