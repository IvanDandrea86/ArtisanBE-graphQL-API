import { ArtisanResponse } from "../../models/artisan/artisan.type";
import { Resolver, Query, Arg, Authorized, Mutation } from "type-graphql";
import { Service } from "typedi";
import { Artisan, ArtisanModel } from "../../models/artisan/artisan";
import { ArtisanInputs } from "../../models/artisan/artisan.input";
import { ObjectId } from "mongodb";

@Service() // Dependencies injection
@Resolver(() => Artisan)
export default class ArtisanResolver {
  @Authorized()
  @Query(() => [Artisan], { name: "findAllArtisans" })
  async findAllArtisans(): Promise<Artisan[] | null> {
    try {
      const artisan = await ArtisanModel.find({});
      return artisan;
    } catch (err) {
      console.log(err);
    }
    return null;
  }
  @Authorized()
  @Query(() => [Artisan], { name: "findArtisanByCompanyNumber" })
  async findArtisanByCompanyNumber(
    @Arg("companyNumber") companyNumber: string
  ): Promise<Artisan[] | null> {
    try {
      const artisan = await ArtisanModel.find({ companyNumber: companyNumber });
      return artisan;
    } catch (err) {
      console.log(err);
    }
    return null;
  }
  @Authorized()
  @Query(() => [String], { name: "getLegalForm" })
  async getLegalForm(): Promise<String[]> {
    let legalForms = new Array<String>();
    let artisan = await ArtisanModel.find({});
    artisan.forEach((elem) => {
      if (!legalForms.includes(elem.legalForm)) {
        legalForms.push(elem.legalForm);
      }
    });
    return legalForms;
  }
  @Authorized()
  @Query(() => [String], { name: "getTypes" })
  async getTypes(): Promise<String[]> {
    let types = new Array<String>();
    let artisan = await ArtisanModel.find({});
    artisan.forEach((elem) => {
      if (!types.includes(elem.type)) {
        types.push(elem.type);
      }
    });
    return types;
  }
  @Authorized()
  @Query(() => [String], { name: "getSecteurs" })
  async getSecteurs(): Promise<String[]> {
    let secteur = new Array<String>();
    let artisan = await ArtisanModel.find({});
    artisan.forEach((elemArray) => {
      elemArray.secteur.forEach((elem: string) => {
        if (!secteur.includes(elem)) {
          secteur.push(elem);
        }
      });
    });
    return secteur;
  }
  @Authorized()
  @Query(() => [Artisan], { name: "findArtisans" })
  async findArtisans(
    @Arg("city", { nullable: true }) city: string,
    @Arg("cap", { nullable: true }) cap: string,
    @Arg("type", { nullable: true }) type: string,
    @Arg("secteur", { nullable: true }) secteur: string,
    @Arg("legalForm", { nullable: true }) legalForm: string
  ): Promise<Artisan[] | null> {
    try {
      const artisan = await ArtisanModel.find({
        $or: [
          { city: city },
          { cap: cap },
          { secteur: secteur },
          { type: type },
          { legalForm: legalForm },
        ],
      });
      return artisan;
    } catch (err) {
      console.log(err);
    }
    return null;
  }
  @Authorized("ADMIN")
  @Mutation(() => ArtisanResponse, { name: "addArtisan" })
  async addArtisan(
    @Arg("artisanInputs") artisanInputs: ArtisanInputs
  ): Promise<ArtisanResponse> {
    try {
      const artisan = new ArtisanModel({
        _id: new ObjectId(),
        companyNumber: artisanInputs.companyNumber,
        email: artisanInputs.email,
        type: artisanInputs.type,
        langue: artisanInputs.langue,
        legalForm: artisanInputs.legalForm,
        name: artisanInputs.name,
        street: artisanInputs.street,
        number: artisanInputs.number,
        city: artisanInputs.city,
        cap: artisanInputs.cap,
        telephone: artisanInputs.telephone,
        startDate: artisanInputs.startDate,
        web: artisanInputs.web,
        endDate: artisanInputs.endDate,
        secteur: artisanInputs.secteur,
      });
      await artisan.save();
      return { artisan };
    } catch (err) {
      return {
        errors: {
          field: "create",
          message: err,
        },
      };
    }
  }
  @Authorized("ADMIN")
  @Mutation(() => ArtisanResponse, { name: "updateArtisan" })
  async updateArtisan(
    @Arg("id") id: string, 
    @Arg("artisanInputs") artisanInputs: ArtisanInputs
  ): Promise<ArtisanResponse> {
    try {
      const artisan= await ArtisanModel.findOneAndUpdate({_id:id},{ companyNumber: artisanInputs.companyNumber,
        email: artisanInputs.email,
        type: artisanInputs.type,
        langue: artisanInputs.langue,
        legalForm: artisanInputs.legalForm,
        name: artisanInputs.name,
        street: artisanInputs.street,
        number: artisanInputs.number,
        city: artisanInputs.city,
        cap: artisanInputs.cap,
        telephone: artisanInputs.telephone,
        startDate: artisanInputs.startDate,
        web: artisanInputs.web,
        endDate: artisanInputs.endDate,
        secteur: artisanInputs.secteur,})
      return { artisan:artisan as Artisan};
    } catch (err) {
      return {
        errors: {
          field: "create",
          message: err,
        },
      };
    }
  }

  @Authorized("ADMIN")
  @Mutation(() => ArtisanResponse, { name: "deleteArtisan" })
  async deleteArtisan(
    @Arg("id",{nullable:true}) id: string,
    @Arg("companyNumber",{nullable:true}) companyNumber: string
  ): Promise<ArtisanResponse> {
    try {
      const artisan = await ArtisanModel.findOneAndDelete({
        $or: [{ _id: id }, { companyNumber: companyNumber }],
      });
      return { artisan: artisan as Artisan };
    } catch (err) {
      return { errors: { field: "delete", message: err } };
    }
  }
}
