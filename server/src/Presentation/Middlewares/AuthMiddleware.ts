import { GraphQLError } from "graphql";
import type { Request } from "express";
import type { JwtPayload } from "@Services/JwTokens/JwtPayload";
import { JwTokensService} from "@Services/JwTokens/JwTokensService";

export const AuthMiddleware = async (req: Request): Promise<JwtPayload> => {
  let token = req.headers.authorization || "";

  if (!token || !token.startsWith("Bearer")) {
    throw new GraphQLError("User is not authenticated");
  };
  
  return await JwTokensService.verify(token.split(" ")[1]);
};