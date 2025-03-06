import * as yup from "yup";

export const UpdateUserSchema = yup.object({
  id: yup.number().positive().required(),
  name: yup.string(),
  email: yup.string().email(),
  active: yup.boolean(),
});