import { faker } from "@faker-js/faker";
import type { User } from "@prisma/client";
import { HashService } from "@Services/Hash/HashService";

interface BuildArgs {
  id: number;
  name?: string;
  email?: string;
  password: string;
};

export class UserFactory {
  public static async build(args: BuildArgs): Promise<User> {
    const hashed = await HashService.hash(args.password);

    return {
      id: args.id,
      name: args.name || faker.person.fullName(),
      email: args.email || faker.internet.email(),
      password: hashed,
      active: faker.datatype.boolean({ probability: 0.5 }),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };
};