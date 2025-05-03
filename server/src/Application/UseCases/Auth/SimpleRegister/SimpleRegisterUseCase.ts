import type { AuthDTO } from "@DTOs/AuthDTO";
import type { UseCase } from "@UseCases/UseCase";
import type { SimpleRegisterCommand } from "./SimpleRegisterCommand";

import { inject, injectable } from "inversify";
import { UnitOfWork } from "@Database/Core/UnitOfWork";
import { JwtService } from "@Services/Tokens/JwtService";
import { LogicException } from "@Exceptions/LogicException";
import { SimpleRegisterSchema } from "./SimpleRegisterSchema";
import { BcryptService } from "@Services/Password/BcryptService";

@injectable()
export class SimpleRegisterUseCase implements UseCase<SimpleRegisterCommand, AuthDTO> {
  constructor(@inject(UnitOfWork) private readonly uow: UnitOfWork) {};

  public async execute(command: SimpleRegisterCommand): Promise<AuthDTO> {
    let validated = await SimpleRegisterSchema.validate(command);

    const existing = await this.uow.user.findByEmail(validated.email);
    if (existing) throw new LogicException.Redundancy("User already exists");

    const hashed = await BcryptService.hash(validated.password);
    const created = await this.uow.user.create({ ...validated, password: hashed });

    const token = await JwtService.sign({ id: created.id });
    return { type: "Bearer", token: token };
  };
};