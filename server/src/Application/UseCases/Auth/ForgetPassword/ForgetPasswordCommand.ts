import * as yup from "yup";
import { ForgetPasswordSchema } from "./ForgetPasswordSchema";
export type ForgetPasswordCommand = yup.InferType<typeof ForgetPasswordSchema>;