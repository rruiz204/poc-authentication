import type { UseCase } from "@UseCases/UseCase";
import type { UnitOfWOrk } from "@Database/UnitOfWork";
import type { ResetPasswordCommand } from "./ResetPasswordCommand";
import type { ResetPasswordResponse } from "./ResetPasswordResponse";

import { HashService } from "@Services/HashService/Service";
import { ResetPasswordSchema } from "./ResetPasswordSchema";
import { ResetPasswordMail } from "@Emails/ResetPasswordEmail";

export class ResetPasswordUseCase implements UseCase<ResetPasswordCommand, ResetPasswordResponse> {
  constructor(private uow: UnitOfWOrk) {};

  public async execute(command: ResetPasswordCommand): Promise<ResetPasswordResponse> {
    await ResetPasswordSchema.validate(command);

    const existing = await this.uow.token.findByToken(command.token);
    if (!existing) throw new Error("Token not found");

    const hashed = await HashService.hash(command.password);

    const updated = await this.uow.user.update({
      id: existing.id, update: { password: hashed }
    });

    await this.uow.token.delete({ id: existing.id });

    const resetPasswordEmail = new ResetPasswordMail({
      to: updated.email
    });
    
    await resetPasswordEmail.send();
    return { message: "Passwored updated" };
  };
};