import type { UserDTO } from "@DTOs/UserDTO";
import type { UseCase } from "@UseCases/UseCase";
import type { UnitOfWOrk } from "@Database/UnitOfWork";
import type { UpdateUserCommand } from "./UpdateUserCommand";

import { UpdateUserSchema } from "./UpdateUserSchema";

export class UpdateUserUseCase implements UseCase<UpdateUserCommand, UserDTO> {
  constructor(private uow: UnitOfWOrk) {};

  public async execute(commad: UpdateUserCommand): Promise<UserDTO> {
    await UpdateUserSchema.validate(commad);

    const existing = await this.uow.user.findById(commad.id);
    if (!existing) throw new Error("User not found");

    const updated = await this.uow.user.update({
      id: existing.id, update: commad
    });

    return {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      active: updated.active,
    };
  };
};