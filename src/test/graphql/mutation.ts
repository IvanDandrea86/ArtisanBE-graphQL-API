import { gql } from "apollo-server-express"

  export const REGISTER_TEST=gql`
    mutation ($userInput:UserInputs!){
        register(
          userInput: $userInput
        ) {
          errors {
            field
            message
          }
          user {
            email
            roles
          }
        }
      }
    `