import type { AuthDTO } from "@DTOs/AuthDTO";
import type { UseCase } from "@UseCases/UseCase";
import type { SimpleAuthCommand } from "./SimpleAuthCommand";
import type { UserRepository } from "@Repositories/UserRepository";

import { SimpleAuthSchema } from "./SimpleAuthSchema";
import { HasherService } from "@Services/Hasher/HasherService";
import { JwTokensService } from "@Services/JwTokens/JwTokensService";

export class SimpleAuthUseCase implements UseCase<SimpleAuthCommand, AuthDTO> {
  constructor(private repository: UserRepository) {};

  public async execute(command: SimpleAuthCommand): Promise<AuthDTO> {
    await SimpleAuthSchema.validate(command);

    const existing = await this.repository.find({ email: command.email });
    if (!existing) throw new Error("User not found");

    const verified = await HasherService.verify(command.password, existing.password);
    if (!verified) throw new Error("Invalid password");

    const token = await JwTokensService.sign({ id: existing.id });
    return { type: "Bearer", token };
  };
};