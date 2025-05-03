import { PrismaClient } from "generated/prisma";
import { injectable } from "inversify";

import { UserRepository } from "@Repositories/UserRepository";

@injectable()
export class UnitOfWork {
  public user: UserRepository;

  constructor(context: PrismaClient) {
    this.user = new UserRepository(context);
  };
};