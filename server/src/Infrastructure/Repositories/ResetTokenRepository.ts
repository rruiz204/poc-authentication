import { PrismaClient, Prisma, type ResetToken } from "@prisma/client";

export class ResetTokenRepository {
  constructor(private prisma: PrismaClient) {};

  public async find(filters: Prisma.ResetTokenWhereInput): Promise<ResetToken | null> {
    return await this.prisma.resetToken.findFirst({ where: filters });
  };

  public async delete(filters: Prisma.ResetTokenWhereUniqueInput): Promise<ResetToken> {
    return await this.prisma.resetToken.delete({ where : filters });
  };

  public async upsert(token: string, userId?: number) {
    return await this.prisma.resetToken.upsert({
      where: { userId },
      update: { token },
      create: { token, user: { connect: { id: userId } } }
    });
  };
};