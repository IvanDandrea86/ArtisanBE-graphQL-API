import { Field, InputType } from "type-graphql";

@InputType()
export class ArtisanInputs{
    @Field()
    companyNumber!: string;
    @Field()
    email: string;
    @Field()
    type: string;
    @Field()
    langue: string;
    @Field()
    legalForm: string;
    @Field()
    name: string;
    @Field()
    street: string;
    @Field()
    number: string;
    @Field()
    cap: string;
    @Field()
    city: string;
    @Field()
    telephone: string;
    @Field()
    startDate: string;
    @Field()
    endDate: string;
    @Field()
    secteur: string;
}