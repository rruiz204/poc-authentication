import * as yup from "yup";

export const UpdateUserSchema = yup.object({
  name: yup.string(),
  email: yup.string()
    .email(),
  active: yup.boolean(),
});