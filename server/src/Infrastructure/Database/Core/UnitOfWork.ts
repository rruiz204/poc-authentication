import { PrismaClient } from "generated/prisma";

import { UserRepository } from "@Repositories/UserRepository";

export class UnitOfWOrk {
  public user: UserRepository;

  constructor(context: PrismaClient) {
    this.user = new UserRepository(context);
  };
};