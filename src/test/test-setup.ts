// test/db.ts

import { MongoMemoryServer } from 'mongodb-memory-server';
import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import { gqlSchema } from '../utils/buildSchema';
import { MyContext } from '../types/types';




export const connectToDb = async () => {
  await mongoose.connect((await MongoMemoryServer.create()).getUri())   
}

export const dropTestDb = async () => {
  if(process.env.NODE_ENV === 'test'){
    await mongoose.connection.db.dropDatabase().catch(error => console.error(error));;
  }
}

export const closeDbConnection = async () => {
  await mongoose.connection.close().catch(error => console.error(error));;
}

export const testClient=async()=>{
  const apolloServer = new ApolloServer({
    schema: await gqlSchema(),
    context: ({ req, res }): MyContext => { return { res, req }; }
});

     return createTestClient(
      apolloServer,
    )
   
 
}

