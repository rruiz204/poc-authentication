import * as yup from "yup";
import { UpdateUserSchema } from "./UpdateUserSchema";
export type UpdateUserCommand = yup.InferType<typeof UpdateUserSchema>;