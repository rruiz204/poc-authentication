import { EmailSimpleBase, type EmailProps } from "../EmailSimpleBase";

export class ResetPasswordMail extends EmailSimpleBase {
  constructor(props: EmailProps) {
    super(props, "\\ResetPassword\\ResetPassword.mjml");

    this.options.subject = "Reset Password";
  };
};