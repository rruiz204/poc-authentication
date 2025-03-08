import { EmailBase, type EmailProps } from "./Core/EmailBase";

interface LocalEmailProps extends EmailProps {
  token: string;
};

export class ForgetPasswordEmail extends EmailBase {
  protected template: string = "ForgetPassword.mjml";

  constructor(props: LocalEmailProps) {
    super(props);

    this.payload = { token: props.token };
    this.options.subject = "Forget Password";
  };
};