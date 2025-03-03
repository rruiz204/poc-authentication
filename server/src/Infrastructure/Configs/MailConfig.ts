import * as yup from "yup";

const schema = yup.object({
  MAIL_HOST: yup.string().required(),
  MAIL_USER: yup.string().required(),
  MAIL_ENTITY: yup.string().required(),
  MAIL_PASSWORD: yup.string().required(),
  MAIL_PORT: yup.number().positive().required()
    .transform((v) => Number(v)),
});

export const MailConfig = schema.validateSync(process.env);