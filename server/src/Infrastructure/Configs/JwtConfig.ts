import * as yup from "yup";

const schema = yup.object({
  JWT_SECRET: yup.string().required(),
  JWT_ACCESS_EXPIRATION: yup.string().required(),
  JWT_REFRESH_EXPIRATION: yup.string().required(),
});

export const JwtConfig = schema.validateSync(process.env);