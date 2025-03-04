import * as yup from "yup";

export const ResetPasswordSchema = yup.object({
  token: yup.string().required(),
  password: yup.string().required(),
});