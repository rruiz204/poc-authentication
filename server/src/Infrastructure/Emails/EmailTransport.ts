import * as mailer from "nodemailer";
import { EmailConfig } from "@Configs/EmailConfig";

export const EmailTransport = mailer.createTransport({
  host: EmailConfig.MAIL_HOST,
  port: EmailConfig.MAIL_PORT,
  secure: false,
  auth: {
    user: EmailConfig.MAIL_USER,
    pass: EmailConfig.MAIL_PASSWORD,
  },
});