import { buildSchema } from "type-graphql"
import { authChecker } from "../Auth/customAuthorization"
import { resolvers } from "../resolver"

export const gqlSchema =async()=>{
    const schema =await buildSchema({
        resolvers: resolvers,
        validate: true,
        authChecker:authChecker,
    });
    return schema
}



