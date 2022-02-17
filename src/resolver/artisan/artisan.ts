import { Resolver, Query, } from "type-graphql";
import { Service } from "typedi";
import { Artisan, ArtisanModel } from "../../entities/artisan/artisan";

@Service() // Dependencies injection
@Resolver(() => Artisan )
export default class ArtisanResolver {

  
  @Query(() => [Artisan], { name: "findAllArtisans" })
  async findAllArtisans():Promise<Artisan[] | null> {
    try{ 
  const artisan= await ArtisanModel.find({});
      return artisan
    }
    catch(err){
      console.log(err)
  }
  return null
}
}