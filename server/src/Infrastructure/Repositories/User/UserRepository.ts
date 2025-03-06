import { PrismaClient, type User } from "@prisma/client";

import type { ListUsersDTO, CreateUserDTO } from "./UserRepositoryDTO";
import type { DeleteUserDTO, UpdateUserDTO } from "./UserRepositoryDTO";

export class UserRepository {
  constructor(private prisma: PrismaClient) {};

  public async list(dto: ListUsersDTO): Promise<User[]> {
    return await this.prisma.user.findMany({
      take: dto.limit, skip: dto.offset
    });
  };

  public async update(dto: UpdateUserDTO) {
    return await this.prisma.user.update({
      data: dto.update, where: { id: dto.id }
    });
  };

  public async create(dto: CreateUserDTO): Promise<User> {
    return await this.prisma.user.create({ data: dto.create });
  };

  public async delete(dto: DeleteUserDTO) {
    return await this.prisma.user.delete({ where: { id: dto.id } });
  };

  public async findById(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  };

  public async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  };
};