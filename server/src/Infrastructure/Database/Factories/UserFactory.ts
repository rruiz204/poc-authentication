import { faker } from "@faker-js/faker";
import type { User } from "@prisma/client";
import { HashService } from "@Services/HashService";

interface FactoryArgs {
  id: number;
  name?: string;
  email?: string;
  password: string;
};

export class UserFactory {
  public static async build({ id, name, email, password }: FactoryArgs): Promise<User> {
    const hashed = await HashService.hash(password);

    return {
      id: id,
      name: name || faker.person.fullName(),
      email: email || faker.internet.email(),
      password: hashed,
      active: faker.datatype.boolean({ probability: 0.5 }),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };
};