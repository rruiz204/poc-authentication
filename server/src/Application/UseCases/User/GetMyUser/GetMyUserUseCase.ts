import type { UserDTO } from "@DTOs/UserDTO";
import type { UseCase } from "@UseCases/UseCase";
import type { GetMyUserQuery } from "./GetMyUserQuery";
import type { UnitOfWOrk } from "@Database/UnitOfWork";

export class GetMyUserUseCase implements UseCase<GetMyUserQuery, UserDTO> {
  constructor(private uow: UnitOfWOrk) {};

  public async execute(query: GetMyUserQuery): Promise<UserDTO> {
    const existingUser = await this.uow.user.find({ id: query.user });
    if (!existingUser) throw new Error("User not found");

    return {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      active: existingUser.active,
    };
  };
};