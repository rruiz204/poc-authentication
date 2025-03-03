import type { UseCase } from "@UseCases/UseCase";
import type { UserRepository } from "@Repositories/UserRepository";
import type { ForgetPasswordCommand } from "./ForgetPasswordCommand";
import type { ForgetPasswordResponse } from "./ForgetPasswordResponse";

import { EmailService } from "@Services/EmailService/Service";
import { ForgetPasswordEmail } from "@Services/EmailService/Emails/ForgetPasswordEmail";

export class ForgetPasswordUseCase implements UseCase<ForgetPasswordCommand, ForgetPasswordResponse> {
  constructor(private repository: UserRepository) {};
  
  public async execute(command: ForgetPasswordCommand): Promise<ForgetPasswordResponse> {
    const existing = await this.repository.find({ email: command.email });
    if (!existing) throw new Error("User not found");

    const mail = new ForgetPasswordEmail({ to: existing.email });
    await EmailService.send(mail);

    return { message: "Check your emails." };
  };
};