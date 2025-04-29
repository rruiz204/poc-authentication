import { Seeder } from "@Database/Core/Seeder";
import { AdminConfig } from "@Configs/AdminConfig";
import type { PrismaClient } from "@prisma/client";

export class UserSeeder extends Seeder {
  constructor(context: PrismaClient) {
    super("user-seeder", context);
  };

  public async seed(): Promise<void> {
    await this.context.user.create({
      data: {
        name: AdminConfig.ADMIN_NAME,
        email: AdminConfig.ADMIN_EMAIL,
        password: AdminConfig.ADMIN_PASSWORD,
      },
    });
  };
};