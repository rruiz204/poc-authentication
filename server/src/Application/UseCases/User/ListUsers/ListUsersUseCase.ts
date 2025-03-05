import type { UserDTO } from "@DTOs/UserDTO";
import type { UseCase } from "@UseCases/UseCase";
import type { ListUsersQuery } from "./ListUsersQuery";
import type { UserRepository } from "@Repositories/UserRepository";

export class ListUsersUseCase implements UseCase<ListUsersQuery, UserDTO[]> {
  constructor(private userRepository: UserRepository) {};
  
  public async execute(query: ListUsersQuery): Promise<UserDTO[]> {
    const { page, limit, name } = query;
    
    return (await this.userRepository.list(page, limit, { name })).map(user => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        active: user.active,
      };
    });
  };
};