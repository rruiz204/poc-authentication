import { EmailBase, type BaseEmailProps } from "./Core/EmailBase";

interface EmailModel {
  token: string;
};

type EmailProps = BaseEmailProps & EmailModel;

export class ForgetPasswordEmail extends EmailBase<EmailModel> {
  protected template: string = "ForgetPassword.mjml";

  constructor(props: EmailProps) {
    super(props);

    this.model = { ...props };
    this.options.subject = "Forget Password";
  };
};