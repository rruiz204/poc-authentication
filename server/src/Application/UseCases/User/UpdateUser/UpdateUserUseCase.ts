import type { UseCase } from "@UseCases/UseCase";
import type { UpdateUserCommand } from "./UpdateUserCommand";
import type { UserDTO } from "../DTOs/UserDTO";
import type { UserRepository } from "@Repositories/UserRepository";
import { UpdateUserSchema } from "./UpdateUserSchema";

export class UpdateUserUseCase implements UseCase<UpdateUserCommand, UserDTO> {
  constructor(private repository: UserRepository) {};

  public async execute(commad: UpdateUserCommand): Promise<UserDTO> {
    await UpdateUserSchema.validate(commad);

    const existing = await this.repository.find({ email: commad.email });
    if (!existing) throw new Error("User not found");

    const updated = await this.repository.update({ id: existing.id }, commad);
    return {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      active: updated.active,
    };
  };
};