import type { AuthDTO } from "@DTOs/AuthDTO";
import type { UseCase } from "@UseCases/UseCase";
import type { RegisterUserCommand } from "./RegisterUserCommand";
import type { UserRepository } from "@Repositories/UserRepository";

import { RegisterUserSchema } from "./RegisterUserSchema";
import { JwtService } from "@Services/JwtService/Service";
import { HashService } from "@Services/HashService/Service";

export class RegisterUserUseCase implements UseCase<RegisterUserCommand, AuthDTO> {
  constructor(private repository: UserRepository) {};

  public async execute(command: RegisterUserCommand): Promise<AuthDTO> {
    await RegisterUserSchema.validate(command);

    const existing = this.repository.find({ email: command.email });
    if (!existing) throw new Error("User already exists");

    const hashed = await HashService.hash(command.password);
    const user = await this.repository.create({ ...command, password: hashed });

    const token = await JwtService.sign({ id: user.id });
    return { type: "Bearer", token };
  };
};