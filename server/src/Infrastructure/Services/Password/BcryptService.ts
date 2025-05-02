import bcrypt from "bcryptjs";
import { AuthConfig } from "@Configs/AuthConfig";

export class BcryptService {
  public static async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, AuthConfig.AUTH_HASH_ROUNDS);
  };

  public static async verify(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  };
};