import { PrismaClient } from "generated/prisma";
import { Seeder } from "@Database/Seeders/Seeder";
import { AdminConfig } from "@Configs/AdminConfig";

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