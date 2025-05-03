import type { AuthDTO } from "@DTOs/AuthDTO";
import type { UseCase } from "@UseCases/UseCase";
import type { EmailLoginCommand } from "./EmailLoginCommand";

import { inject, injectable } from "inversify";
import { EmailLoginSchema } from "./EmailLoginSchema";
import { UnitOfWork } from "@Database/Core/UnitOfWork";

import { JwtService } from "@Services/Tokens/JwtService";
import { LogicException } from "@Exceptions/LogicException";
import { BcryptService } from "@Services/Password/BcryptService";

@injectable()
export class EmailLoginUseCase implements UseCase<EmailLoginCommand, AuthDTO> {
  constructor(@inject(UnitOfWork) private readonly uow: UnitOfWork) {};

  public async execute(command: EmailLoginCommand): Promise<AuthDTO> {
    const validated = await EmailLoginSchema.validate(command);

    const existing = await this.uow.user.findByEmail(validated.email);
    if (!existing) throw new LogicException.NotFound("User doesnt exists");

    const verified = await BcryptService.verify(validated.password, existing.password);
    if (!verified) throw new LogicException.BadCredentials("Bad credentials");

    const token = await JwtService.sign({ id: existing.id });
    return { type: "Bearer", token: token };
  };
};