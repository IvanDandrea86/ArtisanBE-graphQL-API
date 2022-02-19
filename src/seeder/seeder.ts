import artisans from  "../../data/artisan.json"
import {   ArtisanModel } from "../entities/artisan/artisan"
import {ObjectId}from "mongodb"



export const seed =async()=>
{
    console.log("Start seed")
     artisans.map(async elem=>{
         let loc= elem.Localité.split(" ")
         try{
                let artisan = await new ArtisanModel(
                {
                    _id:new ObjectId(),
                    email: elem.Email,
                    companyNumber: elem["Numéro d'entreprise"],
                    type:elem["Type d'entreprise"],
                    langue:elem.Langue,
                    legalForm:elem["Forme juridique"],
                    name:elem.Nom,
                    street:elem.Adresse,
                    number:elem.Numéro,
                    city:loc[1],
                    cap:loc[0],
                    telephone: elem.Téléphone, 
                    startDate:elem["Date début"],
                    web:elem.Web,
                    endDate: elem["Date de fin"], 
                    secteur:elem.Secteur  
                })
                 await artisan.save();
                 

}
catch(err){
    if (err.code=11000){
       const exist= await ArtisanModel.findOne(err.keyValue)
       
       if (exist!==null){
        //insert logic for emty field of double entities
       exist.secteur.push(elem.Secteur)
       await exist.save()
       console.log("Artisan updated")
       }
    }
}
})

  

}
    
