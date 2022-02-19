# Artisan GraphQL API (WIP)
---
GraphQL API to interact with the Commission Artisans database.

## Technologies
--

- NodeJS
- ExpressJS
- Apollo Server
- GraphQL
- Redis
- Typescript

### Features

- JWT Authentication(Stateless)
- Different level of authorization(USER/ADMIN/OP)
- Redis Blacklist(revoke auth/logout)
- Inputs validation and sanitization (WIP)
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




