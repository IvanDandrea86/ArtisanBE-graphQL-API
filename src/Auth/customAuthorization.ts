import { MyContext } from "../types/types";
import { AuthChecker } from "type-graphql";

import { verify } from "jsonwebtoken";
import { SECRET } from "../const";
import { redisBlackList } from "../loader/redis";
// create auth checker function
export const authChecker: AuthChecker<MyContext> = async({ context}, roles) => {

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

      throw new Error("Not authenticated");
    }
    if (roles.length === 0) {
      // if `@Authorized()`, check only if user exists
      return context.payload?.artisan_api_graphql.roles !== undefined;
    }
    // there are some roles defined now
    if (!context.payload) {
      // and if no user, restrict access
      return false;
    }
    if (context.payload?.artisan_api_graphql.roles.some(role => roles.includes(role))) {
      // grant access if the roles overlap
      return true;
    }
    // no roles matched, restrict access
    return false;
  };