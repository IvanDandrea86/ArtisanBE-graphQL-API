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
  @Field({nullable:true})
  email!: string;
  @prop({ required: true, unique: true })
  @Field()
  companyNumber!: string;
  @prop()
  @Field({nullable:true})
  type!: string;
  @prop()
  @Field({nullable:true})
  langue!: string;
  @prop()
  @Field({nullable:true})
  legalForm!: string;
  @prop()
  @Field({nullable:true})
  name!: string; 
  @Field({nullable:true})
  @prop()
  street: string;
  @Field({nullable:true})
  @prop()
  number: string;
  @Field({nullable:true})
  @prop()
  cap: string;
  @Field({nullable:true})
  @prop()
  city: string;
  @Field({nullable:true})
  @prop()
  web: string;
  
  @prop()
  @Field({nullable:true})
  telephone!: string;

  @prop()
  @Field({nullable:true})
  startDate!: string;

  @prop()
  @Field({nullable:true})
  endDate!: string;

  @prop({type:[String]})
  @Field(()=>[String],{nullable:true})
  secteur!: string[];
}

export const ArtisanModel = getModelForClass(Artisan, {
  schemaOptions: { timestamps: true },
});
