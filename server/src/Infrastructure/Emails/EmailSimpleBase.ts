import type Mail from "nodemailer/lib/mailer";
import { EmailTemplate } from "./EmailTemplate";
import { EmailTransport } from "./EmailTransport";
import { EmailConfig } from "@Configs/EmailConfig";

export interface EmailProps {
  to: string;
};

export class EmailSimpleBase {
  private file: string = "";

  protected options: Mail.Options = {
    from: EmailConfig.MAIL_ENTITY,
  };

  constructor(protected props: EmailProps, file: string) {
    this.file = file;
    this.options.to = props.to;
  };

  public async prepare(data: any): Promise<void> {
    const builder = new EmailTemplate(this.file)
    await builder.buildHtml();
    this.options.html = builder.getTemplate(data);
  };

  public async send(): Promise<void> {
    await EmailTransport.sendMail(this.options);
  };
};