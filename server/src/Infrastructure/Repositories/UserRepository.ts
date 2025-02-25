import { PrismaClient, Prisma, type User } from "@prisma/client";

export class UserRepository {
  constructor(private prisma: PrismaClient) {};

  public async list(page: number, limit: number, filters: Prisma.UserWhereInput): Promise<User[]> {
    const offset = (page - 1) * limit;
    return await this.prisma.user.findMany({
      take: limit,
      skip: offset,
      where: filters,
    });
  };

  public async find(filters: Prisma.UserWhereInput): Promise<User | null> {
    return await this.prisma.user.findFirst({ where: filters });
  };

  public async create(user: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({ data: { ...user } });
  };
};