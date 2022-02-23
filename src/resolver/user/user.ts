
import { UserInputs } from "../../models/user/user.input";
import { Resolver, Query, Mutation, Arg, Ctx, Authorized} from "type-graphql";
import { Service } from "typedi";
import { User, UserModel } from "../../models/user/user";
import { UserResponse } from "../../models/user/user.types";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { redisBlackList } from "../../loader/redis";


import { isEmptyString, isValidEmail, isValidPassword } from "../../utils/validation";
import { ObjectId } from "mongodb";
import { SECRET } from "../../const";
import { Authorization, MyContext } from "../../types/types";

// import { isAuth } from "../../Auth/isAuth";

@Service() // Dependencies injection
@Resolver(() => User )
export default class UserResolver {
  @Authorized("ADMIN")
  @Query(() => [User], { name: "findAllUsers" })
  async findAllUsers():Promise<User[] | null> {
    try{ 
  const user= await UserModel.find({});
      return user
    }
    catch(err){
      console.log(err)
  }
  return null
}
@Authorized()
@Query(() => String,{name:"Me"})
async Me(@Ctx() { payload }: MyContext) {
  return `Your user id : ${payload!.artisan_api_graphql.id}`;
}

@Mutation(()=>UserResponse , {name:"register"})
async register(
  @Arg("userInput") userInputs:UserInputs
):Promise<UserResponse>{
  if (isEmptyString(userInputs.password)){return {errors:{
    field:"password",
    message:"password cannot be null"
  }}}
  if (isEmptyString(userInputs.email)){return {errors:{
    field:"email",
    message:"email cannot be null"
  }}}
  if (!isValidEmail(userInputs.email)){return {errors:{
    field:"email",
    message:"not a valid email fromat"
  }}}
  if (!isValidPassword(userInputs.password)){return {errors:{
    field:"password",
    message:"not avalid password format"
  }}}

  try {
    const hashPassword = await bcrypt.hash(userInputs.password, 8);
   const user= await UserModel.create({_id:new ObjectId(),email:userInputs.email,password:hashPassword})
   return {user}
}
  catch(err){
    if (err.code=11000){
      return{errors:{
            field:"email",
            message:"this account already exist"
          }}
    }
    else{
    return{
      errors:{
        field:"Register",
        message:`${err}`
      }
    }
  }
}
}

@Mutation(()=>UserResponse, {name:"login"} )
async login(
  @Arg("userInputs") userInputs:UserInputs
):Promise<UserResponse>{
  if (isEmptyString(userInputs.password)){return {errors:{
    field:"password",
    message:"password cannot be null:"
  }}}
  if (isEmptyString(userInputs.email)){return {errors:{
    field:"email",
    message:"email cannot be null:"
  }}}
  try{
    const user= await UserModel.findOne({email:userInputs.email})
    if (user===null){
      return{errors:{
        field:"email",
        message:"email not registered"
      }}
    }
    else{
    const validEmailPassword = await bcrypt.compare(
    userInputs.password,
    user?.password as string
    );
    if (!validEmailPassword){
      return{errors:{
        field:"password",
        message:"wrong password"
      }}
    }
    else{
      let roles=user?.roles
      let id =user?._id
     
      return {token:jwt.sign(
        { "artisan_api_graphql": { id, roles } },
        SECRET,
        { algorithm: "HS256", subject: user?._id, expiresIn: "1d" }
      )
    }
  }
}
  }
  catch(err)
  {console.error(err)}  
return{}
}
@Mutation(()=>Boolean, {name:"logout"})
async logout(
  @Ctx() {req}:MyContext
):Promise<Boolean>{
  if(req.headers.authorization!==undefined){
  const token = req.headers.authorization.split(' ')[1];
  try {
      await redisBlackList.lpush('token', token);
      return true;
  } catch (error) {
    throw new Error(error);
    };
  }
  else return false  
}
@Authorized("ADMIN")
@Mutation(() => UserResponse, { name: "deleteUser" })
async deleteUser(
  @Arg("id",{nullable:true}) id: string,
  @Arg("email",{nullable:true}) email: string
): Promise<UserResponse> {
  try {
    const user = await UserModel.findOneAndDelete({
      $or: [{ _id: id }, { email: email }],
    });
    return { user: user as User };
  } catch (err) {
    return { errors: { field: "delete", message: err } };
  }
}
@Authorized("ADMIN")
@Mutation(() => UserResponse, { name: "giveAuth" })
async giveAuth(
  @Arg("id",{nullable:true}) id: string,
  @Arg("email",{nullable:true}) email: string,
  @Arg("newRole",{nullable:true}) newRole: Authorization,
  
): Promise<UserResponse> {
  try {
    const user = await UserModel.findOneAndUpdate({
      $or: [{ _id: id }, { email: email }]
    },{$pull:{roles:newRole}});
    console.log(user)
    return { user: user as User };
  } catch (err) {
    return { errors: { field: "delete", message: err } };
  }
}
}


