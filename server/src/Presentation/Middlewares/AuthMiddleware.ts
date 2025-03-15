import { GraphQLError } from "graphql";
import type { Request } from "express";
import { JwtService } from "@Services/Jwt/JwtService";
import type { JwtPayload } from "@Services/Jwt/JwtPayload";

export const AuthMiddleware = async (req: Request): Promise<JwtPayload> => {
  const token = req.headers.authorization || "";

  if (!token || !token.startsWith("Bearer")) {
    throw new GraphQLError("User is not authenticated");
  };
  
  return await JwtService.verify(token.split(" ")[1]);
};