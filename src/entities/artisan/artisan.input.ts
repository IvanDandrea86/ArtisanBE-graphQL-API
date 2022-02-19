import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class ArtisanInputs{
    @Field()
    @Length(8, 12)
    companyNumber!: string;
    
    @Field({nullable:true})
    @Length(6, 57)
    email: string;
    @Field({nullable:true})
    
    type: string;
    @Field({nullable:true})
    
    langue: string;
    @Field({nullable:true})
    
    legalForm: string;
    @Field({nullable:true})
    
    name: string;
    @Field({nullable:true})
    
    street: string;
    @Field({nullable:true})
    number: string;
    @Field({nullable:true})
    
    cap: string;
    @Field({nullable:true})
    
    city: string;
    @Field({nullable:true})
    
    telephone: string;
    @Field({nullable:true})
    
    web: string;
    @Field({nullable:true})
    
    startDate: string;
    @Field({nullable:true})
    
    endDate: string;
    @Field(()=>[String],{nullable:true})
    
    secteur: string[];
}