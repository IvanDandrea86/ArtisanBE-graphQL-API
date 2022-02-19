
import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { MyContext } from "../types/types";
import { SECRET } from "../const";
import { redisBlackList } from "../loader/redis";

export const isAuth: MiddlewareFn<MyContext> = async({ context }, next) => {
  const authorization = context.req.headers["authorization"];
  if (!authorization) {
    throw new Error("Not authenticated");
  }
  try {
    const token = authorization.split(" ")[1];
    const result = await redisBlackList.lrange('token',0,99999999)
    if(result.indexOf(token) > -1){
      throw new Error("Not authenticated");
    }
    const payload = verify(token, SECRET);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error("Not authenticated");
  }
  return next();
};