import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const encoder = new TextEncoder();

export class JwTokensService {
  private static secret = encoder.encode(process.env.JWT_SECRET);

  public static async sign(payload: Record<string, any>): Promise<string> {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .sign(this.secret);
  };

  public static async verify(token: string): Promise<JWTPayload> {
    return (await jwtVerify(token, this.secret)).payload;
  };
};