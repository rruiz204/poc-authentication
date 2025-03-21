import * as yup from "yup";
import { yupResolver } from "@primevue/forms/resolvers/yup";
import { FormMessages } from "@Modules/Auth/Shared/FormMessages";

const schema = yup.object({
  name: yup.string()
    .required(FormMessages.name.error.required)
    .min(4, FormMessages.name.error.minimum)
    .max(25, FormMessages.name.error.maximum),
  email: yup.string()
    .required(FormMessages.email.error.required)
    .email(FormMessages.email.error.format),
  password: yup.string()
    .required(FormMessages.password.error.required)
    .min(8, FormMessages.password.error.minimum),
});

export const RegisterSchema = yupResolver(schema);
export type RegisterTyping = yup.InferType<typeof schema>;