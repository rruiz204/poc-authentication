import * as yup from "yup";
import { ResetPasswordSchema } from "./ResetPasswordSchema";
export type ResetPasswordCommand = yup.InferType<typeof ResetPasswordSchema>;