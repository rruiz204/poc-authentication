import { EmailBase, type EmailProps } from "./Core/EmailBase";
import type { ForgetPasswordModel } from "./Models/ForgetPasswordModel";

interface LocalEmailProps extends EmailProps, ForgetPasswordModel {};

export class ForgetPasswordEmail extends EmailBase<ForgetPasswordModel> {
  protected template: string = "ForgetPassword.mjml";

  constructor(props: LocalEmailProps) {
    super(props);

    this.model = { token: props.token };
    this.options.subject = "Forget Password";
  };
};