import "reflect-metadata";
import { runConnection } from "./loader/dbloader";
import express from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import {PORT, SECRET} from "./const"
import { MyContext } from "./types/types";
import expressJwt from "express-jwt";
import { loadRedis } from "./loader/redis";
// import {seed} from "./seeder/seeder"
import { gqlSchema } from "./utils/buildSchema";


async function main() {
 
      
    
  
    
    runConnection().catch(err => {
        console.error(err);
    });
    //Init Server Express
    const app = express();
    app.use(
        expressJwt({
          secret: SECRET,
          algorithms: ["HS256"],
          credentialsRequired: false
        })
      );
    const apolloServer = new ApolloServer({
        schema: await gqlSchema(),
        introspection:true,
        playground:true,
        context: ({ req, res }): MyContext => { return { res, req }; }
    });
    app.use('/', express.static(path.resolve(__dirname, '../../public')));
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
    await apolloServer.start()
        .then(() => {
            console.log(`🚀 Graphql running at http://localhost:${PORT}/graphql`);
            apolloServer.applyMiddleware({ app });
        });

        loadRedis()
    //    / await seed() 
}
main().catch(err=>{
    console.error(err);

});





