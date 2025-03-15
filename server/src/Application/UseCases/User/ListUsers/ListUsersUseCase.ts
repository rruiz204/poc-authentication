import type { UserDTO } from "@DTOs/UserDTO";
import type { UseCase } from "@UseCases/UseCase";
import type { ListUsersQuery } from "./ListUsersQuery";
import type { UnitOfWOrk } from "@Database/Core/UnitOfWork";

export class ListUsersUseCase implements UseCase<ListUsersQuery, UserDTO[]> {
  constructor(private uow: UnitOfWOrk) {};
  
  public async execute(query: ListUsersQuery): Promise<UserDTO[]> {
    const offset = (query.page - 1) * query.limit;

    const users = await this.uow.user.list({
      offset: offset, limit: query.limit,
    });
    
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      active: user.active,
    }))
  };
};