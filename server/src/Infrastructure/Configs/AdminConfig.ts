import * as yup from "yup";

const schema = yup.object({
  ADMIN_NAME: yup.string().required(),
  ADMIN_PASSWORD: yup.string().required().min(8),
  ADMIN_EMAIL: yup.string().required().email(),
});

export const AdminConfig = schema.validateSync(process.env);