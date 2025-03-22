import type { Seeder } from "./Seeder";
import { Context } from "@Database/Core/Context";

import { UserSeeder } from "./UserSeeder";
import { UserRepository } from "@Repositories/User/UserRepository";

const userRepository = new UserRepository(Context);
const userSeeder = new UserSeeder(userRepository);

const SeedRunner = async (seeders: Seeder[]) => {
  for (const seeder of seeders) {
    const name = seeder.getName();

    const executed = await Context.seed.findFirst({
      where: { name: { equals: name } }
    });

    if (executed) return;

    await seeder.seed();
    console.log(`Seeder executed ${name}`);
    await Context.seed.create({ data: { name } });
  };
};

await SeedRunner([
  userSeeder,
]);