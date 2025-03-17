import * as yup from "yup";
import { yupResolver } from "@primevue/forms/resolvers/yup";

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});

export const LoginSchema = yupResolver(schema);