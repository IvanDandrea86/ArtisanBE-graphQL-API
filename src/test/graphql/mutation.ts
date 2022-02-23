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
     export const LOGIN_TEST=gql`
mutation ($userInput:UserInputs!){
         login(
           userInputs: $userInput
         ) {
           errors {
             field
             message
           }
           user {
             email
             roles
           }
           token
         }
       }
     `