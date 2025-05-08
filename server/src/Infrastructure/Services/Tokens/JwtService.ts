import { SignJWT, jwtVerify } from "jose";
import type { JwtPayload } from "./JwtPayload";
import { AuthConfig } from "@Configs/AuthConfig";

const secret = new TextEncoder().encode(AuthConfig.AUTH_JWT_SECRET);

export class JwtService {
  public static async sign(payload: JwtPayload): Promise<string> {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(payload.expi || "15m")
      .setIssuedAt()
      .sign(secret);
  };

  public static async verify(token: string): Promise<JwtPayload> {
    return (await jwtVerify(token, secret)).payload as JwtPayload;
  };
};