import { Response,Request } from "express"
import { Field, ObjectType } from "type-graphql";

export type Authorization= "ADMIN" | "OP"

export type MyContext={
    res:Response
    req:Request
    payload?: { "artisan_api_graphql": { id:string, roles:string[] } };
  }
  @ObjectType()
  export class FieldError {
    @Field(() => String)
    field: string;
    @Field(() => String)
    message: string;
    constructor(field:string,message:string){
      this.field=field;
      this.message=message;
    }
  }
  export class ValidationError {
    target: Object; // Object that was validated.
    property: string; // Object's property that haven't pass validation.
    value: any; // Value that haven't pass a validation.
    constraints?: { // Constraints that failed validation with error messages.
        [type: string]: string;
    };
    children?: ValidationError[]; // Contains all nested validation errors of the property
}

