import { users } from "../../services/user"

export default {
  Query: {
    getAllUser: () => users,
  },
}
