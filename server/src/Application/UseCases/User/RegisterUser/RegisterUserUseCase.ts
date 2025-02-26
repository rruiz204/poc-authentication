import type { UseCase } from "@UseCases/UseCase";
import { RegisterUserSchema } from "./RegisterUserSchema";
import type { AuthDTO } from "@UseCases/Auth/DTOs/AuthDTO";
import { HasherService } from "@Services/Hasher/HasherService";
import type { RegisterUserCommand } from "./RegisterUserCommand";
import type { UserRepository } from "@Repositories/UserRepository";
import { JwTokensService } from "@Services/JwTokens/JwTokensService";

export class RegisterUserUseCase implements UseCase<RegisterUserCommand, AuthDTO> {
  constructor(private repository: UserRepository) {};

  public async execute(command: RegisterUserCommand): Promise<AuthDTO> {
    await RegisterUserSchema.validate(command);

    const existing = await this.repository.find({ email: command.email });
    if (existing) throw new Error("User already exists");

    const hashed = await HasherService.hash(command.password);
    const user = await this.repository.create({ ...command, password: hashed });

    const token = await JwTokensService.sign({ id: user.id });
    return { type: "Bearer", token };
  };
};