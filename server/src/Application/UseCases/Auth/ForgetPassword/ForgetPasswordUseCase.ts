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

    const existingUser = await this.userRepository.find({ email: command.email });
    if (!existingUser) throw new Error("User not found");

    const resetToken = ResetTokenService.generate();
    await this.resetTokenRepository.upsert(resetToken, existingUser.id);

    const email = new ForgetPasswordEmail({
      to: existingUser.email, token: resetToken
    });

    await email.send();

    return { message: "Check your emails." };
  };
};