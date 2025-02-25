import { Context } from "@Database/Context";
import { UserFacade } from "@Graphql/Facades/UserFacade";
import { UserRepository } from "@Repositories/UserRepository";

const repository = new UserRepository(Context);
const facade = new UserFacade(repository);

export const UserResolver = {
  Query: {
    listUsers: facade.listUsers.bind(facade),
  },
};