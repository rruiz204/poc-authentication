import { Prisma } from "generated/prisma";
import type { User as Model } from "generated/prisma";

export namespace User {
  export type Entity = Model;
  export type Records = Model[];
  export type Nullable = Model | null;
  export type Optional = Partial<Model>;

  export type CreateParams = Prisma.UserCreateInput;
  export type UpdateParams = Prisma.UserUpdateInput;

  export type WhereParams = Prisma.UserWhereInput;
  export type OrderParams = Prisma.UserOrderByWithRelationInput;
};