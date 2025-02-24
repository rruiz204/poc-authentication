import { Context } from "./Context";
import type { Seeder } from "./Seeder";

import { UserSeeder } from "./Seeders/UserSeeder";
import { UserRepository } from "@Repositories/UserRepository";

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