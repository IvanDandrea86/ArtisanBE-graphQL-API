import { FieldError } from "../../types/types";
import { Field, ObjectType } from "type-graphql";
import { User } from "./user";


@ObjectType()
export class UserResponse {
  @Field(() => FieldError, { nullable: true })
  errors?: FieldError;
  @Field(() => User, { nullable: true })
  user?: User;
  @Field(() => String, { nullable: true })
  token?: string;
}