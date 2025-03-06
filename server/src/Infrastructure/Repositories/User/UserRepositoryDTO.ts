import type { UserPaginate, UserPayloads, UserFilters } from "./UserRepositoryUtils";

export interface ListUsersDTO extends
  UserPaginate {};

export interface DeleteUserDTO extends
  Pick<UserFilters, "id"> {};

export interface CreateUserDTO extends
  Pick<UserPayloads, "create"> {};

export interface UpdateUserDTO extends
  Pick<UserFilters, "id">,
  Pick<UserPayloads, "update"> {};