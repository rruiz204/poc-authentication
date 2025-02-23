import type { AuthDTO } from "../DTOs/AuthDTO";
import type { UseCase } from "@UseCases/UseCase";
import { SimpleAuthSchema } from "./SimpleAuthSchema";
import type { SimpleAuthCommand } from "./SimpleAuthCommand";
import type { UserRepository } from "@Repositories/UserRepository";

export class SimpleAuthUseCase implements UseCase<SimpleAuthCommand, AuthDTO> {
  constructor(private repository: UserRepository) {};

  public async use(command: SimpleAuthCommand): Promise<AuthDTO> {
    await SimpleAuthSchema.validate(command);

    const existing = await this.repository.find({ email: command.email });
    if (!existing) throw new Error("User not found");

    return Promise.resolve({
      type: "Bearer",
      token: "example-token-123",
    });
  };
};