import { ObjectType, Field } from "type-graphql";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { Authorization } from "../../types/types";


@ObjectType()
export class User  {
  @Field()
  @prop()
  readonly _id!: string;

  @prop()
  @Field(() => Date)
  createdAt!: Date;

  @prop()
  @Field(() => Date)
  updatedAt!: Date;

  @prop({ required: true, unique: true })
  @Field()
  email!: string;

  
  @prop({ default: false })
  @Field()
  password!: string;

  @prop({type:[String]})
  @Field(()=>[String])
  roles: Authorization[];

}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});