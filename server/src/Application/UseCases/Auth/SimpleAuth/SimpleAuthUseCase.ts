import type { AuthDTO } from "../DTOs/AuthDTO";
import type { UseCase } from "@UseCases/UseCase";
import { SimpleAuthSchema } from "./SimpleAuthSchema";
import type { SimpleAuthCommand } from "./SimpleAuthCommand";

export class SimpleAuthUseCase implements UseCase<SimpleAuthCommand, AuthDTO> {
  constructor() {};

  public async use(command: SimpleAuthCommand): Promise<AuthDTO> {
    await SimpleAuthSchema.validate(command);

    return Promise.resolve({
      type: "Bearer",
      token: "example-token-123",
    });
  };
};