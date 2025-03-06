import { PrismaClient, type Token } from "@prisma/client";

import type { DeleteTokenDTO, UpsertTokenDTO } from "./TokenRepositoryDTO";

export class TokenRepository {
  constructor(private prisma: PrismaClient) {};

  public async upsert(dto: UpsertTokenDTO) {
    return await this.prisma.token.upsert({
      where: { userId: dto.user },
      update: { token: dto.token },
      create: { token: dto.token, userId: dto.user },
    });
  };

  public async delete(dto: DeleteTokenDTO): Promise<Token> {
    return await this.prisma.token.delete({ where: { id: dto.id } });
  };

  public async findByToken(token: string): Promise<Token | null> {
    return await this.prisma.token.findFirst({ where: { token } });
  };

  public async findByUser(id: number): Promise<Token | null> {
    return await this.prisma.token.findFirst({ where: { userId: id } });
  };
};