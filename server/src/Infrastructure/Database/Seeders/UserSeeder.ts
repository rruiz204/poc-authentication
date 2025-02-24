import type { Seeder } from "../Seeder";
import { UserFactory } from "@Database/Factories/UserFactory";
import type { UserRepository } from "@Repositories/UserRepository";

export class UserSeeder implements Seeder {
  private name: string = "user-seeder";

  constructor(private repository: UserRepository) {};

  public getName(): string {
    return this.name;
  };

  public async seed(): Promise<void> {
    const admin = await UserFactory.build({
      id: 1, name: "admin",
      email: "admin@admin.com",
      password: "12345678"
    });

    await this.repository.create({ ...admin });
  };
};