import type Mail from "nodemailer/lib/mailer";
import { MailConfig } from "@Configs/MailConfig";

export interface MailProps {
  to: string;
};

export class SimpleMailBase {
  protected options: Mail.Options = {
    from: MailConfig.MAIL_ENTITY,
  };

  constructor(protected props: MailProps) {
    this.options.to = props.to;
  };

  public obtain(): Mail.Options {
    return this.options;
  };
};