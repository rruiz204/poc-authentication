import { JwtOptions } from "./JwtOptions";
import { SignJWT, jwtVerify } from "jose";
import type { JwtPayload } from "./JwtPayload";

interface SignArgs {
  expiration: string;
  payload: JwtPayload;
};

export class JwtService {
  public static async sign(args: SignArgs): Promise<string> {
    return new SignJWT(args.payload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(args.expiration)
      .setIssuedAt()
      .sign(JwtOptions.secret);
  };

  public static async signAccessToken(payload: JwtPayload) {
    return this.sign({ payload, expiration: JwtOptions.accessExp });
  };

  public static async signRefreshToken(payload: JwtPayload) {
    return this.sign({ payload, expiration: JwtOptions.refreshExp });
  };

  public static async verify(token: string): Promise<JwtPayload> {
    return (await jwtVerify(token, JwtOptions.secret)).payload as JwtPayload;
  };
};