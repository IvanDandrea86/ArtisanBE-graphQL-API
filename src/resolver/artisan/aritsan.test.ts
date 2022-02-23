import * as dbHandler from "../../test/test-setup";
import { redisBlackList } from "../../loader/redis";
//import { ArtisanModel } from "../../models/artisan/artisan";
import { GETARTISAN_TEST } from "../../test/graphql/query";

beforeAll(async () => {
  await dbHandler.connectToDb();
  await dbHandler.dropTestDb();
});
afterAll(async () => {
  await redisBlackList.quit();
  await dbHandler.dropTestDb();
  await dbHandler.closeDbConnection();
});
describe("Artisan Resolver Tests ", () => {
  it("cannot get all artisan if not authenticated", async () => {
    const { query } = await dbHandler.testClient();
    expect.assertions(2);
    const { data, errors } = await query({
      query: GETARTISAN_TEST,
    });

    expect(data).toBe(null);
    expect(errors).toBeDefined();
  });
});
