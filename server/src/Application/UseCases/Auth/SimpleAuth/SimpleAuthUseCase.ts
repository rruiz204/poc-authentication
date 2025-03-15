import type { AuthDTO } from "@DTOs/AuthDTO";
import type { UseCase } from "@UseCases/UseCase";
import type { UnitOfWOrk } from "@Database/Core/UnitOfWork";
import type { SimpleAuthCommand } from "./SimpleAuthCommand";

import { SimpleAuthSchema } from "./SimpleAuthSchema";
import { JwtService } from "@Services/JwtService/Service";
import { HashService } from "@Services/HashService/Service";

export class SimpleAuthUseCase implements UseCase<SimpleAuthCommand, AuthDTO> {
  constructor(private uow: UnitOfWOrk) {};

  public async execute(command: SimpleAuthCommand): Promise<AuthDTO> {
    await SimpleAuthSchema.validate(command);

    const existing = await this.uow.user.findByEmail(command.email);
    if (!existing) throw new Error("User not found");

    const verified = await HashService.verify(command.password, existing.password);
    if (!verified) throw new Error("Invalid password");

    const token = await JwtService.sign({ id: existing.id });
    return { type: "Bearer", token };
  };
};