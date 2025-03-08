import { EmailBase, type EmailProps } from "./Core/EmailBase";

export class ResetPasswordEmail extends EmailBase {
  protected template: string = "ResetPassword.mjml";

  constructor(props: EmailProps) {
    super(props);

    this.options.subject = "Reset Password";
  };
};