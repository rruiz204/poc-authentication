import { faker } from "@faker-js/faker";
import type { Token } from "@prisma/client";

interface FactoryArgs {
  id: number;
  token?: string;
  userId: number;
};

export class TokenFactory {
  public static async build({ id, token, userId }: FactoryArgs): Promise<Token> {
    const today = new Date();
    const expires = new Date().setDate(today.getDate() + 30);

    return {
      id: id,
      token: token || faker.string.uuid(),
      expires: faker.date.between({ from: today, to: expires }),
      userId: userId,
    };
  };
};