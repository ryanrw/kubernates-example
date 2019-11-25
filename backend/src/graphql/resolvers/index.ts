import merge from "lodash.merge"

import root from "./root"
import getAllUser from "./getAllUser"

const resolvers = merge({}, root, getAllUser)

export default resolvers
