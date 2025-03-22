import type { AuthDTO } from "@DTOs/AuthDTO";
import type { UseCase } from "@UseCases/UseCase";
import type { RefreshTokenCommand } from "./RefreshTokenCommand";

import { JwtFacade } from "@Services/Jwt/JwtFacade";
import { RefreshTokenSchema } from "./RefreshTokenSchema";

export class RefreshTokenUseCase implements UseCase<RefreshTokenCommand, AuthDTO> {
  public async execute(command: RefreshTokenCommand): Promise<AuthDTO> {
    await RefreshTokenSchema.validate(command);
    const token = command.token.split(" ")[1];
    
    const tokens = await JwtFacade.refresh(token);
    return { type: "Bearer", ...tokens };
  };
};