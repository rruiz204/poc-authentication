import * as yup from "yup";
import { SimpleRegisterSchema } from "./SimpleRegisterSchema";
export type SimpleRegisterCommand = yup.InferType<typeof SimpleRegisterSchema>;