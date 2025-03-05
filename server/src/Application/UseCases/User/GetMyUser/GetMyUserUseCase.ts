import type { UserDTO } from "@DTOs/UserDTO";
import type { UseCase } from "@UseCases/UseCase";
import type { GetMyUserQuery } from "./GetMyUserQuery";
import type { UserRepository } from "@Repositories/UserRepository";

export class GetMyUserUseCase implements UseCase<GetMyUserQuery, UserDTO> {
  constructor(private userRepository: UserRepository) {};

  public async execute(query: GetMyUserQuery): Promise<UserDTO> {
    const existing = await this.userRepository.find({ id: query.user });
    if (!existing) throw new Error("User not found");

    return {
      id: existing.id,
      name: existing.name,
      email: existing.email,
      active: existing.active,
    };
  };
};