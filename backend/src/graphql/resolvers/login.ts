import { User, UserService } from "../../services/user"
import { convertUserDataToJwt } from "../../services/jwt"

export default {
  Mutation: {
    login: async (_context: any, args: User) => {
      const userInput = new User(args.username, args.password)

      const database = new UserService()

      const user = await database.login(userInput)

      const jwtObject = convertUserDataToJwt(user)

      return jwtObject
    },
  },
}
