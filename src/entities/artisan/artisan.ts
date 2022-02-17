import { ObjectType, Field } from "type-graphql";
import { getModelForClass, prop } from "@typegoose/typegoose";

@ObjectType()
export class Artisan {
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

  @prop({ required: true, unique: true })
  @Field()
  companyNumber!: string;

  @prop()
  @Field()
  type!: string;

  @prop()
  @Field()
  langue!: string;

  @prop()
  @Field()
  legalForm!: string;

  @prop()
  @Field()
  name!: string; //change type

  @Field()
  @prop()
  street: string;
  @Field()
  @prop()
  number: string;
  @Field()
  @prop()
  cap: string;
  @Field()
  @prop()
  city: string;

  @prop()
  @Field()
  telephone!: string;

  @prop()
  @Field()
  startDate!: string;

  @prop()
  @Field()
  endDate!: string;

  @prop()
  @Field()
  secteur!: string;
}

export const ArtisanModel = getModelForClass(Artisan, {
  schemaOptions: { timestamps: true },
});
