import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserInputs{

    @Field()
    @Length(3, 56)
    email:string;
    @Field()
    @Length(3, 56)
    password:string;


}