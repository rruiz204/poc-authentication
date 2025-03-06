import type { TokenFilters, TokenPayloads } from "./TokenRepositoryUtils";

export interface DeleteTokenDTO extends
  Pick<TokenFilters, "id"> {};

export interface UpsertTokenDTO extends
  Pick<TokenFilters, "userId">,
  Pick<TokenPayloads, "create">,
  Pick<TokenPayloads, "update"> {};