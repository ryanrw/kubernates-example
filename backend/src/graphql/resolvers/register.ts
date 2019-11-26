import { GraphQLError } from "graphql"

import { User, UserService } from "../../services/user"
import { Status } from "../../services/status"

export default {
  Query: {
    register: async (_context: any, args: User) => {
      const user = new User(args.username, args.password)
      const database = new UserService()

      await database.register(user)

      const status = new Status("user added successfully")

      return status.complete()
    },
  },
}
