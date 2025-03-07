import { PrismaClient, type Token } from "@prisma/client";

import type { DeleteTokenParams } from "./Params/TokenParams";
import type { UpsertTokenParams } from "./Params/TokenParams";

export class TokenRepository {
  constructor(private prisma: PrismaClient) {};

  public async upsert(params: UpsertTokenParams) {
    return await this.prisma.token.upsert({
      update: { token: params.token },
      where: { userId: params.userId },
      create: { token: params.token, userId: params.userId }
    });
  };

  public async delete(params: DeleteTokenParams): Promise<Token> {
    return await this.prisma.token.delete({ where: { id: params.id } });
  };

  public async findByToken(token: string): Promise<Token | null> {
    return await this.prisma.token.findFirst({ where: { token } });
  };

  public async findByUser(id: number): Promise<Token | null> {
    return await this.prisma.token.findFirst({ where: { userId: id } });
  };
};