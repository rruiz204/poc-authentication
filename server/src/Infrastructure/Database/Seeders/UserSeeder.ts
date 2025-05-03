import { PrismaClient } from "generated/prisma";
import { Seeder } from "@Database/Seeders/Seeder";
import { AdminConfig } from "@Configs/AdminConfig";
import { BcryptService } from "@Services/Password/BcryptService";

export class UserSeeder extends Seeder {
  constructor(context: PrismaClient) {
    super("user-seeder", context);
  };

  public async seed(): Promise<void> {
    const hashed = await BcryptService.hash(AdminConfig.ADMIN_PASSWORD);

    await this.context.user.create({
      data: {
        name: AdminConfig.ADMIN_NAME,
        email: AdminConfig.ADMIN_EMAIL,
        password: hashed,
      },
    });
  };
};