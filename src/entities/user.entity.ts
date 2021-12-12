import { ObjectType, Field } from "type-graphql";
import { prop } from "@typegoose/typegoose";


@ObjectType()
export class User {
  @Field()
  readonly _id!: number;

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
  username!: boolean;
}