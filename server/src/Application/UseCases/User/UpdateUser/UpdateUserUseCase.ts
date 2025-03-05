import type { UserDTO } from "@DTOs/UserDTO";
import type { UseCase } from "@UseCases/UseCase";
import type { UnitOfWOrk } from "@Database/UnitOfWork";
import type { UpdateUserCommand } from "./UpdateUserCommand";

import { UpdateUserSchema } from "./UpdateUserSchema";

export class UpdateUserUseCase implements UseCase<UpdateUserCommand, UserDTO> {
  constructor(private uow: UnitOfWOrk) {};

  public async execute(commad: UpdateUserCommand): Promise<UserDTO> {
    await UpdateUserSchema.validate(commad);

    const existingUser = await this.uow.user.find({ email: commad.email });
    if (!existingUser) throw new Error("User not found");

    const updatedUser = await this.uow.user.update({ id: existingUser.id }, commad);

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      active: updatedUser.active,
    };
  };
};