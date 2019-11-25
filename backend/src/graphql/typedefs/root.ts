import { gql } from "apollo-server"

// I write this root to make other query can be extended
export default gql`
  type Query {
    root: String!
  }
`
