import * as yup from "yup";

export const SimpleRegisterSchema = yup.object({
  active: yup.boolean(),
  name: yup.string().required().min(3).max(30),
  email: yup.string().required().email().max(50),
  password: yup.string().required().min(8).max(25),
});