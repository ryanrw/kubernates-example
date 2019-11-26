import merge from "lodash.merge"

import root from "./root"
import register from "./register"

const resolvers = merge({}, root, register)

export default resolvers
