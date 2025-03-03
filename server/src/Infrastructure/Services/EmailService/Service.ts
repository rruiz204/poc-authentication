import * as mailer from "nodemailer";
import { EmailConfig } from "@Configs/EmailConfig";
import type { SimpleEmailBase } from "./Emails/SimpleEmailBase";

export class EmailService {
  private static transport = mailer.createTransport({
    host: EmailConfig.MAIL_HOST,
    port: EmailConfig.MAIL_PORT,
    secure: false,
    auth: {
      user: EmailConfig.MAIL_USER,
      pass: EmailConfig.MAIL_PASSWORD,
    },
  });

  public static async send(mail: SimpleEmailBase): Promise<void> {
    const options = mail.obtain();
    await this.transport.sendMail(options);
  };
};