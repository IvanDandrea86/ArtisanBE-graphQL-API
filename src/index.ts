import "reflect-metadata";
import { runConnection } from "./loader/dbloader";
import express from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { resolvers } from "./resolver";
import {PORT} from "./const"



const main =async()=>{




//Connect DB

runConnection().catch(err=>{
console.error(err);
})
//Init Server Express
const app =express();

const apolloServer = new ApolloServer({
    schema:await buildSchema({
        resolvers:resolvers,
        validate:true, 
    }),
}); 

app.use('/', express.static(path.resolve(__dirname,'../public')))


app.listen(PORT,()=>{
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(__dirname)
})

await apolloServer.start()
.then(()=>{
    console.log(`🚀 Graphql running at http://localhost:${PORT}/graphql`); 
    apolloServer.applyMiddleware({app});
})
   


   
  
}
main().catch(err=>{
    console.error(err);

});





