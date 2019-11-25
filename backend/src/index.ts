import { ApolloServer, gql } from "apollo-server"
import Logger from "pino"

const users = [{ username: `ryan` }, { username: `fung` }]

const typeDefs = gql`
  type User {
    username: String!
  }

  type Query {
    getAllUser: [User]!
  }
`

const resolvers = {
  Query: {
    getAllUser: () => users,
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

const logger = Logger()

server.listen().then(({ url }) => {
  logger.info(`server started at ${url}`)
})
