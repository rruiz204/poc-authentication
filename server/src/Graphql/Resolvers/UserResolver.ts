import { Context } from "@Database/Context";
import { UnitOfWOrk } from "@Database/UnitOfWork";
import type { GraphQLContext } from "@Graphql/GraphQLContext";

import type { GetMyUserDTO } from "@UseCases/User/GetMyUser/GetMyUserDTO";
import type { ListUsersDTO } from "@UseCases/User/ListUsers/ListUsersDTO";
import type { UpdateUserDTO } from "@UseCases/User/UpdateUser/UpdateUserDTO";

import { ListUsersUseCase } from "@UseCases/User/ListUsers/ListUsersUseCase";
import { GetMyUserUseCase } from "@UseCases/User/GetMyUser/GetMyUserUseCase";
import { UpdateUserUseCase } from "@UseCases/User/UpdateUser/UpdateUserUseCase";

const uow = new UnitOfWOrk(Context);

const listUsersUseCase = new ListUsersUseCase(uow);
const getMyUserUseCase = new GetMyUserUseCase(uow);
const updateUserUseCase = new UpdateUserUseCase(uow);

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