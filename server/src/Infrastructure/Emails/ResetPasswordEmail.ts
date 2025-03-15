import { EmailBase, type BaseEmailProps } from "./Core/EmailBase";

interface EmailModel {
  
};

type EmailProps = BaseEmailProps & EmailModel;

export class ResetPasswordEmail extends EmailBase<EmailModel> {
  protected template: string = "ResetPassword.mjml";

  constructor(props: EmailProps) {
    super(props);

    this.options.subject = "Reset Password";
  };
};