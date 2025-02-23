import * as yup from "yup";

export const SimpleAuthSchema = yup.object({
  email: yup.string()
    .email().required(),
  password: yup.string()
    .required(),
});