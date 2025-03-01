import * as yup from "yup";
import { SimpleAuthSchema } from "./SimpleAuthSchema";
export type SimpleAuthCommand = yup.InferType<typeof SimpleAuthSchema>;