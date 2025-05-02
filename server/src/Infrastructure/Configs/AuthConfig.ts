import * as yup from "yup";

const schema = yup.object({
  AUTH_JWT_SECRET: yup.string().required(),
  AUTH_HASH_ROUNDS: yup.number().positive().required().transform((v) => Number(v)),
});

export const AuthConfig = schema.validateSync(process.env);