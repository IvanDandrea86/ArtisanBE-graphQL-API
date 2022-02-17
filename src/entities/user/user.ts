import { ObjectType, Field } from "type-graphql";
import { getModelForClass, prop } from "@typegoose/typegoose";


@ObjectType()
export class User {
  @Field()
  @prop()
  readonly _id!: string;

  @prop()
  @Field(() => Date)
  createdAt!: Date;

  @prop()
  @Field(() => Date)
  updatedAt!: Date;

  @prop()
  @Field()
  email!: string;

  
  @prop({ default: false })
  @Field()
  password!: boolean;
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});