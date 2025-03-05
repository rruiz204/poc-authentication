import type { PrismaClient } from "@prisma/client";
import { UserRepository } from "@Repositories/UserRepository";
import { ResetTokenRepository } from "@Repositories/ResetTokenRepository";

export class UnitOfWOrk {
  public user: UserRepository;
  public resetToken: ResetTokenRepository;

  constructor(context: PrismaClient) {
    this.user = new UserRepository(context);
    this.resetToken = new ResetTokenRepository(context);
  };
};