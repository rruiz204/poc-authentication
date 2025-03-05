import { SimpleEmailBase, type EmailProps } from "./SimpleEmailBase";

export class ResetPasswordMail extends SimpleEmailBase {
  constructor(props: EmailProps) {
    super(props);

    this.options.subject = "Reset Password";
    this.options.html = "<b>reset password</b>";
  };
};