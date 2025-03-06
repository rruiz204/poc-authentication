import type { Prisma } from "@prisma/client";

export interface UserFilters {
  id: number;
  name: string;
  email: string;
  active: boolean;
};

export interface UserPaginate {
  limit: number;
  offset: number;
};

export interface UserPayloads {
  create: Prisma.UserCreateInput;
  update: Prisma.UserUpdateInput;
};