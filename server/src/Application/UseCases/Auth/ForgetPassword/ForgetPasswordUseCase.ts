import type { UseCase } from "@UseCases/UseCase";
import type { UnitOfWOrk } from "@Database/Core/UnitOfWork";
import type { ForgetPasswordCommand } from "./ForgetPasswordCommand";
import type { ForgetPasswordResponse } from "./ForgetPasswordResponse";

import { ForgetPasswordSchema } from "./ForgetPasswordSchema";
import { ResetTokenService } from "@Services/ResetTokenService";
import { ForgetPasswordEmail } from "@Emails/ForgetPasswordEmail";

export class ForgetPasswordUseCase implements UseCase<ForgetPasswordCommand, ForgetPasswordResponse> {
  constructor(private uow: UnitOfWOrk) {};

  public async execute(command: ForgetPasswordCommand): Promise<ForgetPasswordResponse> {
    await ForgetPasswordSchema.validate(command);

    const existing = await this.uow.user.findByEmail(command.email);
    if (!existing) throw new Error("User not found");

    const token = ResetTokenService.generate();
    await this.uow.token.upsert({ token, userId: existing.id });

    const forgetPasswordEmail = new ForgetPasswordEmail({
      to: existing.email, token: token
    });

    await forgetPasswordEmail.send();
    return { message: "Check your emails." };
  };
};