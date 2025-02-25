import type { GraphQLContext } from "@Graphql/GraphQLContext";
import type { UserRepository } from "@Repositories/UserRepository";
import type { ListUsersQuery } from "@UseCases/User/ListUsers/ListUsersQuery";
import { ListUsersUseCase } from "@UseCases/User/ListUsers/ListUsersUseCase";

export class UserFacade {
  constructor(private repository: UserRepository) {};

  public async listUsers(parent: unknown, args: ListUsersQuery, context: GraphQLContext) {
    const useCase = new ListUsersUseCase(this.repository);
    return useCase.execute(args);
  };
};