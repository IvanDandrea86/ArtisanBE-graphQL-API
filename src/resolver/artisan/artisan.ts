import { Resolver, Query, Arg, } from "type-graphql";
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
@Query(() => [Artisan], { name: "findArtisanByCompanyNumber" })
async findArtisanByCompanyNumber(
  @Arg("companyNumber") companyNumber:string
):Promise<Artisan[] | null> {
  try{ 
const artisan= await ArtisanModel.find({companyNumber:companyNumber});
    return artisan
  }
  catch(err){
    console.log(err)
}
return null
}
@Query(()=>[String], {name:"getLegalForm"})
async getLegalForm():Promise<String[]>{
  let legalForms=new Array<String>()
  let artisan=await ArtisanModel.find({})
  artisan.forEach((elem)=>{
    if(!legalForms.includes(elem.legalForm)){
      legalForms.push(elem.legalForm)
    }
  })
  return legalForms
}
@Query(()=>[String], {name:"getTypes"})
async getTypes():Promise<String[]>{
  let types=new Array<String>()
  let artisan=await ArtisanModel.find({})
  artisan.forEach((elem)=>{
    if(!types.includes(elem.type)){
      types.push(elem.type)
    }
  })
  return types
}
@Query(()=>[String], {name:"getSecteurs"})
async getSecteurs():Promise<String[]>{
  let secteur=new Array<String>()
  let artisan=await ArtisanModel.find({})
  artisan.forEach((elem)=>{
    if(!secteur.includes(elem.secteur)){
      secteur.push(elem.secteur)
    }
  })
  return secteur
}
@Query(() => [Artisan], { name: "findArtisans" })
async findArtisans(
  @Arg("city",{nullable:true}) city:string,
  @Arg("cap",{nullable:true}) cap:string,
  @Arg("type",{nullable:true}) type:string,
  @Arg("secteur",{nullable:true}) secteur:string,
  @Arg("legalForm",{nullable:true}) legalForm:string,
):Promise<Artisan[] | null> {
  try{ 
const artisan= await ArtisanModel.find({$or:[{city:city},{cap:cap},{secteur:secteur},{type:type},{legalForm:legalForm}]});
    return artisan
  }
  catch(err){
  console.log(err)
}
return null
}
}