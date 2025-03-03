import type Mail from "nodemailer/lib/mailer";
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

  public obtain(): Mail.Options {
    return this.options;
  };
};