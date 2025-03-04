import type { UseCase } from "@UseCases/UseCase";
import type { UserRepository } from "@Repositories/UserRepository";
import type { ForgetPasswordCommand } from "./ForgetPasswordCommand";
import type { ForgetPasswordResponse } from "./ForgetPasswordResponse";
import type { ResetTokenRepository } from "@Repositories/ResetTokenRepository";

import { EmailService } from "@Services/EmailService/Service";
import { ForgetPasswordSchema } from "./ForgetPasswordSchema";
import { ResetTokenService } from "@Services/ResetTokenService/Service";
import { ForgetPasswordEmail } from "@Services/EmailService/Emails/ForgetPasswordEmail";

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

    const mail = new ForgetPasswordEmail({ to: existingUser.email, token: resetToken });
    await EmailService.send(mail);

    return { message: "Check your emails." };
  };
};