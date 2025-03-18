import * as yup from "yup";
import { yupResolver } from "@primevue/forms/resolvers/yup";

const schema = yup.object({
  email: yup.string()
    .required("The email field is required. Please enter your email address")
    .email("The email address you entered is not valid."),
  password: yup.string()
    .required("The password field is required. Please enter a password")
    .min(8, "The password is invalid. Make sure it is at least 8 characters long"),
});

export const LoginSchema = yupResolver(schema);