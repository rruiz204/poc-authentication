import * as mailer from "nodemailer";
import { MailConfig } from "@Configs/MailConfig";
import type { SimpleMailBase } from "./Mails/SimpleMailBase";

export class MailerService {
  private static transport = mailer.createTransport({
    host: MailConfig.MAIL_HOST,
    port: MailConfig.MAIL_PORT,
    secure: false,
    auth: {
      user: MailConfig.MAIL_USER,
      pass: MailConfig.MAIL_PASSWORD,
    },
  });

  public static async send(mail: SimpleMailBase): Promise<void> {
    const options = mail.obtain();
    await this.transport.sendMail(options);
  };
};