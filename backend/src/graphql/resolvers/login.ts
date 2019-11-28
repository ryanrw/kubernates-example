import { User, UserService } from "../../services/user"
import { Status } from "../../services/status"

// add login method in user service
export default {
  Mutation: {
    login: async (_context: any, args: User) => {
      const userInput = new User(args.username, args.password)

      const database = new UserService()

      const isUserInputCorrect = await database.login(userInput)

      const status = new Status("login successfully")

      if (isUserInputCorrect) {
        return status.complete()
      }
    },
  },
}
