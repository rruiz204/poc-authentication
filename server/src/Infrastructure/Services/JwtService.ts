import type { JWTPayload } from "jose";
import { SignJWT, jwtVerify } from "jose";
import { JwtConfig } from "@Configs/JwtConfig";

export interface JwtPayload extends JWTPayload {
  id: number;
};

export class JwtService {
  private static encoder = new TextEncoder();
  private static secret = this.encoder.encode(JwtConfig.JWT_SECRET);

  public static async sign(payload: JwtPayload): Promise<string> {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .sign(this.secret);
  };

  public static async verify(token: string): Promise<JwtPayload> {
    return (await jwtVerify(token, this.secret)).payload as JwtPayload;
  };
};