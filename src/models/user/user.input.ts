import { Field, InputType } from "type-graphql";
@InputType()
export class UserInputs{

    @Field()
    email:string;
    @Field()
    password:string;
    
}