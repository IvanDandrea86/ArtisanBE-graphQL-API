import { Resolver, Query, } from "type-graphql";
import { Service } from "typedi";
import { User, UserModel } from "../../entities/user/user";

@Service() // Dependencies injection
@Resolver(() => User )
export default class UserResolver {

  
  @Query(() => [User], { name: "findAllUsers" })
  async findAllUsers():Promise<User[] | null> {
    try{ 
  const user= await UserModel.find({});
      return user
    }
    catch(err){
      console.log(err)
  }
  return null
}
}