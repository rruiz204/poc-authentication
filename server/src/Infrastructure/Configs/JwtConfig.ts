import * as yup from "yup";

const schema = yup.object({
  JWT_SECRET: yup.string().required(),
});

export const JwtConfig = schema.validateSync(process.env);