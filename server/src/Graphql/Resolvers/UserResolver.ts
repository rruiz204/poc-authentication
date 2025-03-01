import { Context } from "@Database/Context";
import { UserRepository } from "@Repositories/UserRepository";
import type { GraphQLContext } from "@Graphql/GraphQLContext";

import type { GetMyUserDTO } from "@UseCases/User/GetMyUser/GetMyUserDTO";
import type { ListUsersDTO } from "@UseCases/User/ListUsers/ListUsersDTO";
import type { UpdateUserDTO } from "@UseCases/User/UpdateUser/UpdateUserDTO";

import { ListUsersUseCase } from "@UseCases/User/ListUsers/ListUsersUseCase";
import { GetMyUserUseCase } from "@UseCases/User/GetMyUser/GetMyUserUseCase";
import { UpdateUserUseCase } from "@UseCases/User/UpdateUser/UpdateUserUseCase";

const repository = new UserRepository(Context);
const listUsersUseCase = new ListUsersUseCase(repository);
const getMyUserUseCase = new GetMyUserUseCase(repository);
const updateUserUseCase = new UpdateUserUseCase(repository);

export const UserResolver = {
  Query: {
    listUsers: async (parent: unknown, args: ListUsersDTO, context: GraphQLContext) => {
      return await listUsersUseCase.execute(args.input);
    },

    getMyUser: async (parent: unknown, args: GetMyUserDTO, context: GraphQLContext) => {
      return await getMyUserUseCase.execute({ user: context.user });
    },
  },
  Mutation: {
    updateUser: async (parent: unknown, args: UpdateUserDTO, context: GraphQLContext) => {
      return await updateUserUseCase.execute(args.input);
    },
  }
};