import { Length, Max } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class ArtisanInputs{
    @Field()
    @Length(8, 12)
    companyNumber!: string;
    @Field()
    @Max(56)
    email: string;
    @Field()
    @Max(255)
    type: string;
    @Field()
    @Max(56)
    langue: string;
    @Field()
    @Max( 56)
    legalForm: string;
    @Field()
    @Max(255)
    name: string;
    @Field()
    @Max(255)
    street: string;
    @Field()
    number: string;
    @Field()
    @Max(10)
    cap: string;
    @Field()
    @Max(128)
    city: string;
    @Field()
    @Max(20)
    telephone: string;
    @Field()
    @Max(128)
    web: string;
    @Field()
    @Max(11)
    startDate: string;
    @Field()
    @Max(11)
    endDate: string;
    @Field()
    @Max(128)
    secteur: string;
}