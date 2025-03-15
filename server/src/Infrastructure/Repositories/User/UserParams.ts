import type { User } from "@prisma/client";

interface UserCommonFields {
  id: User["id"];
  name: User["name"];
  email: User["email"];
  active?: User["active"];
  password: User["password"];
};

export interface ListUsersParams {
  offset: number; limit: number;
};

export interface DeleteUserParams {
  id: UserCommonFields["id"];
};

export interface CreateUserParams {
  create: Omit<UserCommonFields, "id">;
};

export interface UpdateUserParams {
  id: UserCommonFields["id"];
  update: Omit<Partial<UserCommonFields>, "id">;
};