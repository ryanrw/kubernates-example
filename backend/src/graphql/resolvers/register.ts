import { User, UserService } from "../../services/user"
import { Status } from "../../services/status"

export default {
  Mutation: {
    register: async (_context: any, args: User) => {
      const user = new User(args.username, args.password)
      const database = new UserService()

      await database.register(user)

      // @todo change this line to function
      const status = new Status("user added successfully")

      return status.complete()
    },
  },
}
