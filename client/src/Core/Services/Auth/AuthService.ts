import type { KhaosResponse, KhaosOptions } from "@Services/Khaos/KhaosTypes";
import { KhaosFactory } from "@Services/Khaos/KhaosFactory";
import type { AuthResponse } from "./AuthResponse";
import type { LoginPayload } from "./AuthPayload";

const login = async (payload: LoginPayload): Promise<KhaosResponse<AuthResponse>> => {
  const options: KhaosOptions = { endpoint: "auth/login/simple", method: "POST" };
  const khaos = KhaosFactory.build(options).setBody(payload);
  return await khaos.invoke<AuthResponse>();
};

const storeToken = (payload: AuthResponse): void => {
  localStorage.setItem("token", `${payload.type} ${payload.token}`);
};

export const AuthService = Object.freeze({ login, storeToken });