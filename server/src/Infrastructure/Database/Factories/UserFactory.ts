import { faker } from "@faker-js/faker";
import type { User } from "@Models/User";

export class UserFactory {
  public static async build(user: User.Optional): Promise<User.Entity> {
    return {
      id: user.id || faker.number.int({ min: 1, max: 100 }),
      name: user.email || faker.person.fullName(),
      email: user.email || faker.internet.email(),
      active: user.active || faker.datatype.boolean(),
      createdAt: user.createdAt || faker.date.anytime(),
      updatedAt: user.updatedAt || faker.date.anytime(),
      password: user.password || faker.internet.password(),
    };
  };
};