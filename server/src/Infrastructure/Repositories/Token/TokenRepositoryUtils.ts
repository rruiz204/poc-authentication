import type { Prisma } from "@prisma/client";

export interface TokenFilters {
  id: number;
  token: string;
  userId: number;
};

export interface TokenPayloads {
  create: Prisma.TokenCreateInput;
  update: Prisma.TokenUpdateInput;
};