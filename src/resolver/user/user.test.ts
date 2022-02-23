import * as dbHandler from "../../test/test-setup";
import "reflect-metadata";
import { redisBlackList } from "../../loader/redis";
import { LOGIN_TEST, REGISTER_TEST } from "../../test/graphql/mutation";
import { UserModel } from "../../models/user/user";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt"


beforeAll(async () => {
  await dbHandler.connectToDb();
  await dbHandler.dropTestDb();
});
afterAll(async () => {
  await redisBlackList.quit();
   await dbHandler.dropTestDb();
  await dbHandler.closeDbConnection();
});
describe("User Resolver Tests ", () => {
  it("Can register user", async () => {
    const { mutate } = await dbHandler.testClient();
    expect.assertions(2);
    const { data } = await mutate({
      mutation: REGISTER_TEST,
      variables: {
        userInput: {
          email: "ivand@ivafn.it",
          password: "qwerty1Q",
        },
      },
    });
    expect(data.register.errors).toBe(null);
    expect(data.register.user).toBeDefined();
  });

  it("Can not register same email", async () => {
    const { mutate } = await dbHandler.testClient();
    expect.assertions(3);
    await UserModel.create({
      _id: new ObjectId(),
      email: "new@email.it",
      password: "qwerty1Q",
    });
    const { data,errors } = await mutate({
      mutation: REGISTER_TEST,
      variables: {
        userInput: {
          email: "new@email.it",
          password: "qwerty1Q",
        },
      },
    });
    if(errors){console.log(errors)}
    else{
    expect(data.register.errors).toBeDefined();
    expect(data.register.errors.field).toBe("email");
    expect(data.register.user).toBe(null);
    }
  });

  it("Can not register same use with password less than 3 char", async () => {
    const { mutate } = await dbHandler.testClient();
    expect.assertions(3);
    const { data } = await mutate({
      mutation: REGISTER_TEST,
      variables: {
        userInput: {
          email: "new@email.it",
          password: "qwer",
        },
      },
    });
    expect(data.register.errors).toBeDefined();
    expect(data.register.errors.field).toBe("password");
    expect(data.register.user).toBe(null);
  });
  it("Can not register user with password  than not match isValidPassword()", async () => {
    const { mutate } = await dbHandler.testClient();
    expect.assertions(4);
    const { data } = await mutate({
      mutation: REGISTER_TEST,
      variables: {
        userInput: {
          email: "new@email.it",
          password: "qwerwqeqwe",
        },
      },
    });
    expect(data.register.errors).toBeDefined();
    expect(data.register.errors.field).toBe("password");
    expect(data.register.errors.message).toBe("not avalid password format");
    expect(data.register.user).toBe(null);
  });
  it("Can not register user with email that not match isValidEmail()", async () => {
    const { mutate } = await dbHandler.testClient();
    expect.assertions(4);
    const { data } = await mutate({
      mutation: REGISTER_TEST,
      variables: {
        userInput: {
          email: "new.email.it",
          password: "qwerty1Q",
        },
      },
    });
    expect(data.register.errors).toBeDefined();
    expect(data.register.errors.field).toBe("email");
    expect(data.register.errors.message).toBe("not a valid email fromat");
    expect(data.register.user).toBe(null);
  });
  it("Can not register with empty email", async () => {
    const { mutate } = await dbHandler.testClient();
    expect.assertions(4);
    const { data } = await mutate({
      mutation: REGISTER_TEST,
      variables: {
        userInput: {
          email: "",
          password: "qwerty1Q",
        },
      },
    });

    expect(data.register.errors).toBeDefined();
    expect(data.register.errors.field).toBe("email");
    expect(data.register.errors.message).toBe("email cannot be null");
    expect(data.register.user).toBe(null);
  });

  it("Can not register with empty password", async () => {
    const { mutate } = await dbHandler.testClient();
    expect.assertions(4);
    const { data } = await mutate({
      mutation: REGISTER_TEST,
      variables: {
        userInput: {
          email: "password@password.it",
          password: "",
        },
      },
    });
    expect(data.register.errors).toBeDefined();
    expect(data.register.errors.field).toBe("password");
    expect(data.register.errors.message).toBe("password cannot be null");
    expect(data.register.user).toBe(null);
  });

  it("Can login", async () => {
    const { mutate } = await dbHandler.testClient();
     expect.assertions(3);
    const hashed= await bcrypt.hash("qwerty1Q", 8)
    const user= await UserModel.create({
      _id: new ObjectId(),
      email: "password@password.it",
      password: hashed,
    });
    
    const { data} = await mutate({
      mutation: LOGIN_TEST,
      variables: {
        userInput: {
          email: user.email,
          password:"qwerty1Q",
        },
      },
    });
    expect(data.login.errors).toBe(null)
    expect(data.login.user).toBe(null)
    expect(typeof data.login.token).toBe("string")
  })
  it("Can not login with wrong pass", async () => {
    await dbHandler.dropTestDb();
    const { mutate } = await dbHandler.testClient();
     expect.assertions(5);
    const hashed= await bcrypt.hash("qwerty1Q", 8)
    const user= await UserModel.create({
      _id: new ObjectId(),
      email: "password@password.it",
      password: hashed,
    });
    const { data} = await mutate({
      mutation: LOGIN_TEST,
      variables: {
        userInput: {
          email: user.email,
          password:"abcdef1Q",
        },
      },
    });
    expect(data.login.errors).toBeDefined()
    expect(data.login.errors.field).toBe("password")
    expect(data.login.errors.message).toBe("wrong password")
    expect(data.login.user).toBe(null)
    expect(data.login.token).toBe(null)
  })
});


