import * as yup from "yup";

export const RegisterUserSchema = yup.object({
  name: yup.string()
    .required(),
  email: yup.string()
    .email().required(),
  password: yup.string()
    .required(),
});