import type { PrismaClient } from "@prisma/client";
import { UserRepository } from "@Repositories/User/UserRepository";
import { TokenRepository } from "@Repositories/Token/TokenRepository";

export class UnitOfWOrk {
  public user: UserRepository;
  public token: TokenRepository;

  constructor(context: PrismaClient) {
    this.user = new UserRepository(context);
    this.token = new TokenRepository(context);
  };
};