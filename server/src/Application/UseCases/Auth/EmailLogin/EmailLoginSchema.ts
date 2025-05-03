import * as yup from "yup";

export const EmailLoginSchema = yup.object({
  email: yup.string().required().email().max(50),
  password: yup.string().required().min(8).max(25),
});