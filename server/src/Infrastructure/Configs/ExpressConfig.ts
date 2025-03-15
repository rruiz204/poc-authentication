import * as yup from "yup";

const schema = yup.object({
  EXPRESS_PORT: yup.number().positive().required().transform((v) => Number(v)),
});

export const ExpressConfig = schema.validateSync(process.env);