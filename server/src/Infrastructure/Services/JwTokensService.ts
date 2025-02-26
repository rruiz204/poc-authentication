import { SignJWT, jwtVerify, type JWTPayload } from "jose";

export interface JwtPayload extends JWTPayload {
  id: number;
};

export class JwTokensService {
  private static encoder = new TextEncoder();
  private static secret = this.encoder.encode(process.env.JWT_SECRET);

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