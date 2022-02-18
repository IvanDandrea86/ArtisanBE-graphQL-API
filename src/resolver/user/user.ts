
import { UserInputs } from "../../entities/user/user.input";
import { Resolver, Query, Mutation, Arg, UseMiddleware, Ctx} from "type-graphql";
import { Service } from "typedi";
import { User, UserModel } from "../../entities/user/user";
import { UserResponse } from "../../entities/user/user.types";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


import { isEmptyString, isValidEmail, isValidPassword } from "../../utils/validation";
import { ObjectId } from "mongodb";
import { SECRET } from "../../const";
import { MyContext } from "../../types/types";
import { isAuth } from "../../isAuth";

@Service() // Dependencies injection
@Resolver(() => User )
export default class UserResolver {

  
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
@Query(() => String,{name:"Me"})
@UseMiddleware(isAuth)
async Me(@Ctx() { payload }: MyContext) {
  return `Your user id : ${payload!.artisan_api_graphql.id}`;
}

@Mutation(()=>UserResponse , {name:"register"})
async register(
  @Arg("userInput") userInput:UserInputs
):Promise<UserResponse>{
  if (isEmptyString(userInput.password)){return {errors:{
    field:"password",
    message:"password cannot be null:"
  }}}
  if (isEmptyString(userInput.email)){return {errors:{
    field:"email",
    message:"email cannot be null:"
  }}}
  if (!isValidEmail(userInput.email)){return {errors:{
    field:"email",
    message:"not a valid email fromat"
  }}}
  if (!isValidPassword(userInput.password)){return {errors:{
    field:"password",
    message:"not avalid password format"
  }}}

  const hashPassword = await bcrypt.hash(userInput.password, 8);
  try {
  const exist=await UserModel.find({email:userInput.email})
  if (exist!==[]){
    return{errors:{
      field:"email",
      message:"this account already exist"
    }}
  }
  else{
   const user= await UserModel.create({_id:new ObjectId(),email:userInput.email,password:hashPassword})
   return {user}
  }
}
  catch(err){
    return{
      errors:{
        field:"Register",
        message:`${err}`
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
      console.log(id)
      return {token:jwt.sign(
        { "artisan_api_graphql": { id, roles } },
        SECRET,
        { algorithm: "HS256", subject: user?._id, expiresIn: "1d" }
      )
    }
  }
  }
  catch(err)
  {console.error(err)}  
return{}
}
// @Mutation( {name:"logout"})
// async logout(){
  
// }
}


