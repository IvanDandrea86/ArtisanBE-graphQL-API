import { Service } from "typedi";


import UserModel from "./model";
import { User } from "../../entities/user.entity";
import { NewUserInput } from "./input";

@Service() // Dependencies injection
export default class UserService {
  constructor(private readonly userModel: UserModel) {}

  public async getById(_id: number): Promise<User | null> {
    return this.userModel.getById(_id);
  }

  public async addUser(data: NewUserInput): Promise<User> {
    const newUser = await this.userModel.create(data);
    // Business logic goes here
    // Example:
    // Trigger push notification, analytics, ...
    return newUser;
  }
}