import { SimpleEmailBase, type EmailProps } from "./SimpleEmailBase";

export class ForgetPasswordEmail extends SimpleEmailBase {
  constructor(props: EmailProps) {
    super(props);

    this.options.subject = "Forget Password";
    this.options.html = "<b>this is the link to reset your password</b>";
  };
};