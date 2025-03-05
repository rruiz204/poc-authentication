import type Mail from "nodemailer/lib/mailer";
import { EmailTransport } from "./EmailTransport";
import { EmailConfig } from "@Configs/EmailConfig";

export interface EmailProps {
  to: string;
};

export class SimpleEmailBase {
  protected options: Mail.Options = {
    from: EmailConfig.MAIL_ENTITY,
  };

  constructor(protected props: EmailProps) {
    this.options.to = props.to;
  };

  public async send(): Promise<void> {
    await EmailTransport.sendMail(this.options);
  };
};