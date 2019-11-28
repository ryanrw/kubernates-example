import merge from "lodash.merge"

import root from "./root"
import register from "./register"
import login from "./login"

const resolvers = merge({}, root, register, login)

export default resolvers
