import type { TokenFilters, TokenPayloads } from "./TokenRepositoryUtils";

export interface DeleteTokenDTO extends
  Pick<TokenFilters, "id"> {};

export interface UpsertTokenDTO {
  user: number;
  token: string;
};