import type Mail from "nodemailer/lib/mailer";
import { EmailTemplate } from "./EmailTemplate";
import { EmailTransport } from "./EmailTransport";
import { EmailConfig } from "@Configs/EmailConfig";

export interface EmailProps {
  to: string;
};

export class EmailBase<Model> {
  protected template: string = "";
  protected model!: Model;

  protected options: Mail.Options = {
    from: EmailConfig.MAIL_ENTITY,
  };

  constructor(protected props: EmailProps) {
    this.options.to = props.to;
  };

  protected async prepare(): Promise<void> {
    const builder = new EmailTemplate(this.template);
    await builder.load();
    this.options.html = builder.obtain(this.model);
  };

  public async send(): Promise<void> {
    await this.prepare();
    await EmailTransport.sendMail(this.options);
  };
};