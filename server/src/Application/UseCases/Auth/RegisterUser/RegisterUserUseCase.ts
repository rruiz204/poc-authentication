import type { AuthDTO } from "@DTOs/AuthDTO";
import type { UseCase } from "@UseCases/UseCase";
import type { UnitOfWOrk } from "@Database/Core/UnitOfWork";
import type { RegisterUserCommand } from "./RegisterUserCommand";

import { RegisterUserSchema } from "./RegisterUserSchema";
import { JwtService } from "@Services/JwtService/Service";
import { HashService } from "@Services/HashService/Service";

export class RegisterUserUseCase implements UseCase<RegisterUserCommand, AuthDTO> {
  constructor(private uow: UnitOfWOrk) {};

  public async execute(command: RegisterUserCommand): Promise<AuthDTO> {
    await RegisterUserSchema.validate(command);

    const existing = await this.uow.user.findByEmail(command.email);
    if (existing) throw new Error("User already exists");

    const hashed = await HashService.hash(command.password);
    
    const user = await this.uow.user.create({
      create: { ...command, password: hashed }
    });

    const token = await JwtService.sign({ id: user.id });
    return { type: "Bearer", token };
  };
};