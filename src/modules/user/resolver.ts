import { Resolver, Arg, Query, Mutation } from "type-graphql";
import { Service } from "typedi";

import {User}  from "../../entities/user.entity";
import UserService from "./service";
import { NewUserInput } from "./input";

/*
  IMPORTANT: Your business logic must be in the service!
*/

@Service() // Dependencies injection
@Resolver(() => User)
export default class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async getUser(@Arg("id") id: number) {
    const user = await this.userService.getById(id);

    return user;
  }

  @Mutation(() => User)
  async createUser(
    @Arg("createUserData") createUserData: NewUserInput
  ): Promise<User> {
    const user  = await this.userService.addUser(createUserData);
    return user;
  }
}