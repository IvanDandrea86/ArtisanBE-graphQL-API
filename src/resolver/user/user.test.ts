  import * as dbHandler from '../../test/test-setup';
// import { gqlCall } from '../../test/gqlCall';
import "reflect-metadata";
 import { redisBlackList } from '../../loader/redis';

beforeAll(async () => {
    await dbHandler.connectToDb()
    await dbHandler.dropTestDb()
});
afterAll(async () => {
     await redisBlackList.quit()
    await dbHandler.dropTestDb()
    await dbHandler.closeDbConnection()
});


describe('User Resolver Tests ', () => {
    const REGISTER_TEST=`
    mutation ($userInput:UserInputs!){
        register(
          userInput: $userInput
        ) {
          errors {
            field
            message
          }
          user {
            email
            roles
          }
        }
      }
      
    `
    
    it('can register user', async () => {
    
      const {mutate}=await dbHandler.testClient()
 
        const { data } = await mutate({
            mutation: REGISTER_TEST,
            variables: { 
                userInput:{
                    email:"ivan@ivafn.it",
                    password:"qwerty1Q"
                }
            }
          })
          expect(data).toBe({})
    
        
      
    })

})
