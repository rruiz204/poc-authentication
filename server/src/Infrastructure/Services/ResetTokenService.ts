import { v4 } from "uuid";

export class ResetTokenService {
  public static generate(): string {
    return v4();
  };
};