import type { Token } from "@prisma/client";

interface TokenCommonFields {
  id: Token["id"];
  token: Token["token"];
  userId: Token["userId"];
  expires: Token["expires"];
};

export interface DeleteTokenParams {
  id: TokenCommonFields["id"];
};

export interface UpsertTokenParams {
  token: TokenCommonFields["token"];
  userId: TokenCommonFields["userId"];
  expires: TokenCommonFields["expires"];
};