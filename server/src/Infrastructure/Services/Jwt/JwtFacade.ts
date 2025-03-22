import { JwtService } from "./JwtService";
import type { JwtPayload } from "./JwtPayload";

interface FacadeResponse {
  access: string;
  refresh: string;
};

export class JwtFacade {
  public static async sign(payload: JwtPayload): Promise<FacadeResponse> {
    const access = await JwtService.signAccessToken(payload);
    const refresh = await JwtService.signRefreshToken(payload);

    return { access, refresh };
  };

  public static async refresh(token: string): Promise<FacadeResponse> {
    const payload = await JwtService.verify(token);
    return await this.sign(payload);
  };
};