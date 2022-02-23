import artisans from "../../data/artisan.json";
import { ArtisanModel } from "../models/artisan/artisan";
import { ObjectId } from "mongodb";

export const seed = async () => {
  console.log("Start seed");
  artisans.map(async (elem) => {
    let loc = elem.Localité.split(" ");
    try {
      let artisan = new ArtisanModel({
        _id: new ObjectId(),
        email: elem.email,
        companyNumber: elem.companyNumber,
        type: elem.type,
        langue: elem.langue,
        legalForm: elem.legalForm,
        name: elem.name,
        street: elem.street,
        number: elem.number,
        city: loc[1],
        cap: loc[0],
        telephone: elem.telephone,
        startDate: elem["Date début"],
        web: elem.web,
        endDate: elem["Date de fin"],
        secteur: elem.secteur,
      });
      await artisan.save();
    } catch (err) {
      if ((err.code = 11000)) {
        const exist = await ArtisanModel.findOne(err.keyValue);
        if (exist !== null) {
          let key: keyof typeof elem;
          let prop: keyof typeof exist;
          for (key in elem) {
            for (prop in exist) {
              if (prop === key && prop !== "secteur")
                if (exist[prop] === "" && elem[key] !== "") {
                  console.log(prop, ":", exist[prop], " ", key, ":", elem[key]);
                  exist[prop] = elem[key]
                  await exist.save();
                  console.log("Artisan updated");
                }
            }
          }
          if (!exist.secteur.includes(elem.secteur)) {
            exist.secteur.push(elem.secteur);
            await exist.save();
            console.log("Artisan updated");
          }
        }
      }
    }
  });
};
