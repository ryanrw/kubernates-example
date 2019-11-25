import { ApolloServer } from "apollo-server"

import { schema } from "./graphql"

import { logger } from "./loaders/logger"

const server = new ApolloServer(schema)

server.listen().then(({ url }) => {
  logger.info(`server started at ${url}`)
})
