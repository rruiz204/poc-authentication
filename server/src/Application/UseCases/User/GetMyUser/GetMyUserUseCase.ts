import type { UserDTO } from "@DTOs/UserDTO";
import type { UseCase } from "@UseCases/UseCase";
import type { GetMyUserQuery } from "./GetMyUserQuery";
import type { UserRepository } from "@Repositories/UserRepository";

export class GetMyUserUseCase implements UseCase<GetMyUserQuery, UserDTO> {
  constructor(private repository: UserRepository) {};

  public async execute(query: GetMyUserQuery): Promise<UserDTO> {
    const user = await this.repository.find({ id: query.user });
    if (!user) throw new Error("User not found");

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      active: user.active,
    };
  };
};