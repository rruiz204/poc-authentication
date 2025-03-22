import * as yup from "yup";

export const RefreshTokenSchema = yup.object({
  token: yup.string().required(),
});