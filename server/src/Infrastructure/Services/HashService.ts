import bcrypt from "bcryptjs";

export class HashService {
  private static saltRounds = 10;

  public static async hash(passwd: string): Promise<string> {
    return await bcrypt.hash(passwd, this.saltRounds);
  };

  public static async verify(passwd: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(passwd, hash);
  };
};