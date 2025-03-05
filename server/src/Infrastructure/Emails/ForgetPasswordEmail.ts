import { SimpleEmailBase, type EmailProps } from "./SimpleEmailBase";

interface LocalEmailProps extends EmailProps {
  token: string;
};

export class ForgetPasswordEmail extends SimpleEmailBase {
  constructor(props: LocalEmailProps) {
    super(props);

    this.options.subject = "Forget Password";
    this.options.html = "<b>this is the link to reset your password</b>";
  };
};