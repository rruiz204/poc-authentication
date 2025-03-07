import { EmailSimpleBase, type EmailProps } from "../EmailSimpleBase";

interface LocalEmailProps extends EmailProps {
  token: string;
};

export class ForgetPasswordEmail extends EmailSimpleBase {
  constructor(props: LocalEmailProps) {
    super(props, "\\ForgetPassword\\ForgetPassword.mjml");
    this.options.subject = "Forget Password";
  };
};