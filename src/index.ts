import "reflect-metadata";
import dotenv from 'dotenv';
import  mongoose  from "mongoose";
import express from 'express';
import path from 'path';
import UserResolver from './modules/user/resolver';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';



const main =async()=>{
dotenv.config()
const PORT=process.env.PORT 
const runConnection=async():Promise<void>=>{ 
    await mongoose.connect(process.env.ATLAS_CONNETCION,{})
    console.log("📦 Database Connected")        
}

//Connect DB

runConnection().catch(err=>{
console.error(err);
})
//Init Server Express
const app =express();

const apolloServer = new ApolloServer({
    schema:await buildSchema({
        resolvers:[UserResolver,],
        validate:false, 

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





