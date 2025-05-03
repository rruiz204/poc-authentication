import * as yup from "yup";
import { EmailLoginSchema } from "./EmailLoginSchema";
export type EmailLoginCommand = yup.InferType<typeof EmailLoginSchema>;