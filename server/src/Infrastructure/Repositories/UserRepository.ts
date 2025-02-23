import { PrismaClient, Prisma, type User } from "@prisma/client";

export class UserRepository {
  constructor(private prisma: PrismaClient) {};

  public async find(filters: Prisma.UserWhereInput): Promise<User | null> {
    return await this.prisma.user.findFirst({ where: filters });
  };
};