import type { JWTPayload } from "jose";

export type JwtPayload = JWTPayload & {
  id: number;
};