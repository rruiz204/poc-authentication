import bcrypt from "bcryptjs";
import { HashOptions } from "./HashOptions";

export class HashService {
  public static async hash(passwd: string): Promise<string> {
    return await bcrypt.hash(passwd, HashOptions.saltRounds);
  };

  public static async verify(passwd: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(passwd, hash);
  };
};