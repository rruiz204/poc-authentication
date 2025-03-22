import * as yup from "yup";
import { RefreshTokenSchema } from "./RefreshTokenSchema";
export type RefreshTokenCommand = yup.InferType<typeof RefreshTokenSchema>;