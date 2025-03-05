import type { UserDTO } from "@DTOs/UserDTO";
import type { UseCase } from "@UseCases/UseCase";
import type { ListUsersQuery } from "./ListUsersQuery";
import type { UnitOfWOrk } from "@Database/UnitOfWork";

export class ListUsersUseCase implements UseCase<ListUsersQuery, UserDTO[]> {
  constructor(private uow: UnitOfWOrk) {};
  
  public async execute(query: ListUsersQuery): Promise<UserDTO[]> {
    const { page, limit, name } = query;
    
    return (await this.uow.user.list(page, limit, { name })).map(user => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        active: user.active,
      };
    });
  };
};