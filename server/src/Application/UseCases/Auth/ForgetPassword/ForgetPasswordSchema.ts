import * as yup from "yup";

export const ForgetPasswordSchema = yup.object({
  email: yup.string().email().required(),
});