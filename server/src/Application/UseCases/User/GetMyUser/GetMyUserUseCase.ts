import type { UserDTO } from "@DTOs/UserDTO";
import type { UseCase } from "@UseCases/UseCase";
import type { GetMyUserQuery } from "./GetMyUserQuery";
import type { UnitOfWOrk } from "@Database/UnitOfWork";

export class GetMyUserUseCase implements UseCase<GetMyUserQuery, UserDTO> {
  constructor(private uow: UnitOfWOrk) {};

  public async execute(query: GetMyUserQuery): Promise<UserDTO> {
    const user = await this.uow.user.findById(query.userId);
    if (!user) throw new Error("User not found");

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      active: user.active,
    };
  };
};