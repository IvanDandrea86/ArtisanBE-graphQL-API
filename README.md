# Artisan GraphQL API (WIP)
---
GraphQL API to interact with the Commission Artisans database.

## The Problem
---
The dataset provided by https://economie.fgov.be has some problems of
duplicate instances,
updates and missing fields.

## The Solution
---
Before moving on to the development of the API, I converted the csv format into a json format.
<br> 
[csvToJson.js](./data/csvToJson.js)
<br>
Afterwards i iterated the json file by removing the double instances(companyNumber) and merging the separate data 
<br> 
[seeder.ts](./src//seeder/seeder.ts)
<br>
```typescript
catch (err) {
    //catch duplicate fields errors
      if ((err.code = 11000)) {
        const exist = await ArtisanModel.findOne(err.keyValue);
        if (exist !== null) {
            //iterate through the properties of the compared elements to find same properties with difference
          let key: keyof typeof elem;
          let prop: keyof typeof exist;
          for (key in elem) {
            for (prop in exist) {
              if (prop === key && prop !== "secteur")
                if (exist[prop] === "" && elem[key] !== "") {
                    //update field
                  exist[prop] = elem[key]
                  await exist.save();
                  console.log("Artisan updated");
                }
            }
          }
          if (!exist.secteur.includes(elem.secteur)) {
              //also update secteur field if duplicate contains different instances
            exist.secteur.push(elem.secteur);
            await exist.save();
            console.log("Artisan updated");
          }
        }
      }
    }
```

## Technologies
---

- NodeJS
- TypeGrapQL
- Typegoose
- ExpressJS
- Apollo Server
- GraphQL
- Redis
- Typescript

### Features

- JWT Authentication(Stateless)
- Different level of authorization(USER/ADMIN/OP)
- Redis Blacklist(revoke auth/logout)
- Inputs validation and sanitization 
- Timeouts (WIP)
- Rate limiting (WIP)
- Query cost analysis (WIP) 
### Install
---
```
npm install
```
### Run development env
---
```
npm run watch
npm run dev
```
### Run 
---
```
npm run build
npm start
```

### Note
---
You must have an instance of redis server running locally.
First of all:
```
redis-server
```





