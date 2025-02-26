import { Context } from "@Database/Context";
import type { GraphQLContext } from "@Graphql/GraphQLContext";
import { UserRepository } from "@Repositories/UserRepository";
import type { ListUsersDTO } from "@UseCases/User/DTOs/ListUsersDTO";
import type { GetMyUserDTO } from "@UseCases/User/DTOs/GetMyUserDTO";

import { ListUsersUseCase } from "@UseCases/User/ListUsers/ListUsersUseCase";
import { GetMyUserUseCase } from "@UseCases/User/GetMyUser/GetMyUserUseCase";

const repository = new UserRepository(Context);
const listUsersUseCase = new ListUsersUseCase(repository);
const getMyUserUseCase = new GetMyUserUseCase(repository);

export const UserResolver = {
  Query: {
    listUsers: async (parent: unknown, args: ListUsersDTO, context: GraphQLContext) => {
      return await listUsersUseCase.execute(args.input);
    },

    getMyUser: async (parent: unknown, args: GetMyUserDTO, context: GraphQLContext) => {
      return await getMyUserUseCase.execute({ user: context.user });
    },
  },
};