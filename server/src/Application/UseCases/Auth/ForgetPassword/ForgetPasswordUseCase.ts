import type { UseCase } from "@UseCases/UseCase";
import type { UserRepository } from "@Repositories/UserRepository";
import type { ForgetPasswordCommand } from "./ForgetPasswordCommand";
import type { ForgetPasswordResponse } from "./ForgetPasswordResponse";
import type { ResetTokenRepository } from "@Repositories/ResetTokenRepository";

import { ForgetPasswordSchema } from "./ForgetPasswordSchema";
import { ForgetPasswordEmail } from "@Emails/ForgetPasswordEmail";
import { ResetTokenService } from "@Services/ResetTokenService/Service";

export class ForgetPasswordUseCase implements UseCase<ForgetPasswordCommand, ForgetPasswordResponse> {
  constructor(
    private userRepository: UserRepository,
    private resetTokenRepository: ResetTokenRepository,
  ) {};

  public async execute(command: ForgetPasswordCommand): Promise<ForgetPasswordResponse> {
    await ForgetPasswordSchema.validate(command);

    const existing = await this.userRepository.find({ email: command.email });
    if (!existing) throw new Error("User not found");

    const token = ResetTokenService.generate();
    await this.resetTokenRepository.upsert(token, existing.id);

    const email = new ForgetPasswordEmail({
      to: existing.email, token: token
    });

    await email.send();

    return { message: "Check your emails." };
  };
};