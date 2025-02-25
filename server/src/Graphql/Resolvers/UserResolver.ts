import { Context } from "@Database/Context";
import type { GraphQLContext } from "@Graphql/GraphQLContext";
import { UserRepository } from "@Repositories/UserRepository";
import type { ListUsersQuery } from "@UseCases/User/ListUsers/ListUsersQuery";
import { ListUsersUseCase } from "@UseCases/User/ListUsers/ListUsersUseCase";
import type { GraphQLResolveInfo } from "graphql";

const repository = new UserRepository(Context);

const listUsersUseCase = new ListUsersUseCase(repository);

export const UserResolver = {
  Query: {
    listUsers: async (parent: unknown, args: ListUsersQuery, contextValue: GraphQLContext, info: GraphQLResolveInfo) => {
      return await listUsersUseCase.use({ ...args });
    },
  },
};