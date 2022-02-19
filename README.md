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
```
redis-server
```





