import { FieldError } from "../../types/types";
import { Field, ObjectType } from "type-graphql";
import { Artisan } from "./artisan";

@ObjectType()
export class ArtisanResponse {
  @Field(() => FieldError, { nullable: true })
  errors?: FieldError;
  @Field(() => Artisan, { nullable: true })
  artisan?: Artisan
}
