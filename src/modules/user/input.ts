import { Field, InputType } from "type-graphql";

@InputType()
export class NewUserInput {
  @Field()
  username: string;

  @Field()
  password: string;

}