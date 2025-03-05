import type { UseCase } from "@UseCases/UseCase";
import type { ResetPasswordCommand } from "./ResetPasswordCommand";
import type { UserRepository } from "@Repositories/UserRepository";
import type { ResetPasswordResponse } from "./ResetPasswordResponse";
import type { ResetTokenRepository } from "@Repositories/ResetTokenRepository";

import { ResetPasswordSchema } from "./ResetPasswordSchema";
import { ResetPasswordMail } from "@Emails/ResetPasswordEmail";

export class ResetPasswordUseCase implements UseCase<ResetPasswordCommand, ResetPasswordResponse> {
  constructor(
    private userRepository: UserRepository,
    private resetTokenRepository: ResetTokenRepository,
  ) {};

  public async execute(command: ResetPasswordCommand): Promise<ResetPasswordResponse> {
    await ResetPasswordSchema.validate(command);

    const existingToken = await this.resetTokenRepository.find({ token: command.token });
    if (!existingToken) throw new Error("Token not found");

    const updatedUser = await this.userRepository.update(
      { id: existingToken.userId }, { password: command.password }
    );

    await this.resetTokenRepository.delete({ id: existingToken.id });

    const email = new ResetPasswordMail({
      to: updatedUser.email
    });
    
    await email.send();

    throw new Error("Method not implemented.");
  };
};