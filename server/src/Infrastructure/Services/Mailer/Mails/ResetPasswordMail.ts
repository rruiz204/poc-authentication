import { BaseMail} from "./BaseMail";
import type Mail from "nodemailer/lib/mailer";

export class ResetPasswordMail extends BaseMail {
  options: Mail.Options = {
    from: process.env.MAIL_ENTITY,
    subject: "Reset Password",
    to: this.props.to,
    html: "<b>Hello world?</b>",
  };

  public obtain(): Mail.Options {
    return this.options;
  };
};