import type { UseCase } from "@UseCases/UseCase";
import type { UnitOfWOrk } from "@Database/UnitOfWork";
import type { ForgetPasswordCommand } from "./ForgetPasswordCommand";
import type { ForgetPasswordResponse } from "./ForgetPasswordResponse";

import { ForgetPasswordSchema } from "./ForgetPasswordSchema";
import { ForgetPasswordEmail } from "@Emails/ForgetPasswordEmail";
import { ResetTokenService } from "@Services/ResetTokenService/Service";

export class ForgetPasswordUseCase implements UseCase<ForgetPasswordCommand, ForgetPasswordResponse> {
  constructor(private uow: UnitOfWOrk) {};

  public async execute(command: ForgetPasswordCommand): Promise<ForgetPasswordResponse> {
    await ForgetPasswordSchema.validate(command);

    const existingUser = await this.uow.user.find({ email: command.email });
    if (!existingUser) throw new Error("User not found");

    const token = ResetTokenService.generate();
    await this.uow.resetToken.upsert(token, existingUser.id);

    const email = new ForgetPasswordEmail({
      to: existingUser.email, token: token
    });

    await email.send();

    return { message: "Check your emails." };
  };
};