import type { AuthDTO } from "@DTOs/AuthDTO";
import type { UseCase } from "@UseCases/UseCase";
import type { UnitOfWOrk } from "@Database/UnitOfWork";
import type { SimpleAuthCommand } from "./SimpleAuthCommand";

import { SimpleAuthSchema } from "./SimpleAuthSchema";
import { JwtService } from "@Services/JwtService/Service";
import { HashService } from "@Services/HashService/Service";

export class SimpleAuthUseCase implements UseCase<SimpleAuthCommand, AuthDTO> {
  constructor(private uow: UnitOfWOrk) {};

  public async execute(command: SimpleAuthCommand): Promise<AuthDTO> {
    await SimpleAuthSchema.validate(command);

    const existingUser = await this.uow.user.find({ email: command.email });
    if (!existingUser) throw new Error("User not found");

    const verified = await HashService.verify(command.password, existingUser.password);
    if (!verified) throw new Error("Invalid password");

    const token = await JwtService.sign({ id: existingUser.id });
    return { type: "Bearer", token };
  };
};