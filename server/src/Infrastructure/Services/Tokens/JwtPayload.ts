import type { JWTPayload } from "jose";

export interface JwtPayload extends JWTPayload {
  id: number;
  expi: string;
};