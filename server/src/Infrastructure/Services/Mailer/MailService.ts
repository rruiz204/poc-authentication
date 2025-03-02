import * as mailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export class MailerService {
  private static transport = mailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT || "2525", 10),
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  public static async send(mail: Mail.Options): Promise<void> {
    await this.transport.sendMail(mail);
  };
};

// Example
import { ResetPasswordMail } from "./Mails/ResetPasswordMail";
const mail = new ResetPasswordMail({ to: "test@test.com" });
await MailerService.send(mail.obtain());