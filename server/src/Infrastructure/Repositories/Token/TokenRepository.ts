import { PrismaClient, type Token } from "@prisma/client";

import type { 
  DeleteTokenParams, UpsertTokenParams
} from "./TokenParams";

export class TokenRepository {
  constructor(private prisma: PrismaClient) {};

  public async upsert(params: UpsertTokenParams): Promise<Token> {
    return await this.prisma.token.upsert({
      update: { token: params.token },
      where: { userId: params.userId },
      create: { token: params.token, userId: params.userId, expires: params.expires }
    });
  };

  public async delete(params: DeleteTokenParams): Promise<Token> {
    return await this.prisma.token.delete({ where: { id: params.id } });
  };

  public async findByToken(token: string): Promise<Token | null> {
    return await this.prisma.token.findFirst({ where: {
      token: { equals: token },
      expires: { gt: new Date() },
    }});
  };

  public async findByUser(id: number): Promise<Token | null> {
    return await this.prisma.token.findFirst({ where: {
      userId: { equals: id },
      expires: { gt: new Date() },
    }});
  };
};