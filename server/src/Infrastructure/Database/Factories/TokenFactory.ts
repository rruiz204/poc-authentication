import { faker } from "@faker-js/faker";
import type { Token } from "@prisma/client";

interface BuildArgs {
  id: number;
  token?: string;
  userId: number;
};

export class TokenFactory {
  public static async build(args: BuildArgs): Promise<Token> {
    
    const today = new Date();
    const expires = new Date().setDate(today.getDate() + 30);

    return {
      id: args.id,
      token: args.token || faker.string.uuid(),
      expires: faker.date.between({ from: today, to: expires }),
      userId: args.userId,
    };
  };
};