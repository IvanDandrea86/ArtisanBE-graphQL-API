import { getModelForClass } from "@typegoose/typegoose";


import {User} from '../../entities/user.entity';
import { NewUserInput } from "./input";

export const UserMongooseModel =getModelForClass(User);


export default class UserModel {
    async getById(_id: number): Promise<User | null> {
      // Use mongoose as usual
      return UserMongooseModel.findById(_id).lean().exec();
    }
  
    async create(data: NewUserInput): Promise<User> {
      const todo = new UserMongooseModel(data);
      return todo.save();
    }
  }
  