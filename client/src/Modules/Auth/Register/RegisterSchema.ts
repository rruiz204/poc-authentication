import * as yup from "yup";
import { FormMessages } from "../Shared/FormMessages";
import { yupResolver } from "@primevue/forms/resolvers/yup";

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