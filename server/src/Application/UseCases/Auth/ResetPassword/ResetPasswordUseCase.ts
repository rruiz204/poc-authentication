import type { UseCase } from "@UseCases/UseCase";
import type { UnitOfWOrk } from "@Database/UnitOfWork";
import type { ResetPasswordCommand } from "./ResetPasswordCommand";
import type { ResetPasswordResponse } from "./ResetPasswordResponse";

import { ResetPasswordSchema } from "./ResetPasswordSchema";
import { ResetPasswordMail } from "@Emails/ResetPasswordEmail";

export class ResetPasswordUseCase implements UseCase<ResetPasswordCommand, ResetPasswordResponse> {
  constructor(private uow: UnitOfWOrk) {};

  public async execute(command: ResetPasswordCommand): Promise<ResetPasswordResponse> {
    await ResetPasswordSchema.validate(command);

    const existingToken = await this.uow.resetToken.find({ token: command.token });
    if (!existingToken) throw new Error("Token not found");

    const updated = await this.uow.user.update(
      { id: existingToken.userId }, { password: command.password }
    );

    await this.uow.resetToken.delete({ id: existingToken.id });

    const email = new ResetPasswordMail({
      to: updated.email
    });
    
    await email.send();

    throw new Error("Method not implemented.");
  };
};