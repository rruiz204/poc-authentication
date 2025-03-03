import { SimpleMailBase, type MailProps } from "./SimpleMailBase";

export class ResetPasswordMail extends SimpleMailBase {
  constructor(props: MailProps) {
    super(props);

    this.options.subject = "Reset Password";
    this.options.html = "<b>reset password</b>";
  };
};