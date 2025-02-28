import * as yup from "yup";
import { RegisterUserSchema } from "./RegisterUserSchema";
export type RegisterUserCommand = yup.InferType<typeof RegisterUserSchema>;