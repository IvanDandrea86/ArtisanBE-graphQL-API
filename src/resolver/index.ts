import UserResolver from "./user/user";
import ArtisanResolver from"./artisan/artisan";
// Important: Add all your module's resolver in this
export const resolvers: [Function, ...Function[]] = [
  UserResolver,
  ArtisanResolver,
];


