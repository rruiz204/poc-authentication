import { Seeder } from "./Seeder";
import { Context } from "@Database/Core/Context";

import { UserSeeder } from "@Database/Seeders/UserSeeder";

const userSeeder = new UserSeeder(Context);

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