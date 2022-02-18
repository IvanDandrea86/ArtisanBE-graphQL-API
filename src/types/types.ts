import { Response,Request } from "express"
import { Field, ObjectType } from "type-graphql";
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

