import * as yup from "yup";
import { yupResolver } from "@primevue/forms/resolvers/yup";
import { FormMessages } from "@Modules/Auth/Shared/FormMessages";

const schema = yup.object({
  email: yup.string()
    .required(FormMessages.email.error.required)
    .email(FormMessages.email.error.format),
  password: yup.string()
    .required(FormMessages.password.error.required)
    .min(8, FormMessages.password.error.required),
});

export const LoginSchema = yupResolver(schema);
export type LoginTyping = yup.InferType<typeof schema>;