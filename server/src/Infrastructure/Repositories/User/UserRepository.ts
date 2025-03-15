import { PrismaClient, type User } from "@prisma/client";

import type { 
  ListUsersParams, CreateUserParams,
  UpdateUserParams, DeleteUserParams,
} from "./UserParams";

export class UserRepository {
  constructor(private prisma: PrismaClient) {};

  public async list(params: ListUsersParams): Promise<User[]> {
    return await this.prisma.user.findMany({
      take: params.limit,
      skip: params.offset,
    });
  };

  public async update(params: UpdateUserParams): Promise<User> {
    return await this.prisma.user.update({
      data: params.update,
      where: { id: params.id },
    });
  };

  public async create(params: CreateUserParams): Promise<User> {
    return await this.prisma.user.create({ data: params.create });
  };

  public async delete(params: DeleteUserParams): Promise<User> {
    return await this.prisma.user.delete({ where: { id: params.id } });
  };

  public async findById(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  };

  public async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  };
};