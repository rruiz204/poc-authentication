import { JwtConfig } from "@Configs/JwtConfig";

const encoder = new TextEncoder();
const secret = encoder.encode(JwtConfig.JWT_SECRET);
const accessExp = JwtConfig.JWT_ACCESS_EXPIRATION;
const refreshExp = JwtConfig.JWT_REFRESH_EXPIRATION;

export const JwtHelper = Object.freeze({ secret, accessExp, refreshExp });