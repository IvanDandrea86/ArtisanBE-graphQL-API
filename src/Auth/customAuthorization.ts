import { MyContext } from "../types/types";
import { AuthChecker } from "type-graphql";

import { verify } from "jsonwebtoken";
import { SECRET } from "../const";
// create auth checker function
export const authChecker: AuthChecker<MyContext> = ({ context}, roles) => {

    const authorization = context.req.headers["authorization"];
    if (!authorization) {
      throw new Error("Not authenticated");
    }
    try {
      const token = authorization.split(" ")[1];
      const payload = verify(token, SECRET);
      console.log(payload);
      context.payload = payload as any;
    } catch (err) {
      console.log(err);
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