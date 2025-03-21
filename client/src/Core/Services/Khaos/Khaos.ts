import type { IKhaos, KhaosResponse, HttpMethod } from "./KhaosTypes";

export class Khaos implements IKhaos {
  private url: string = import.meta.env.VITE_BASE_URL;
  private endpoint: string = "";

  private options: RequestInit = {
    method: "GET", headers: { "Content-Type": "application/json" },
  };

  public setBody(body: any): IKhaos {
    this.options.body = JSON.stringify(body);
    return this;
  };

  public setEndpoint(endpoint: string): IKhaos {
    this.endpoint = endpoint;
    return this;
  };

  public setHttpMethod(method: HttpMethod): IKhaos {
    this.options.method = method;
    return this;
  };

  public async invoke<KhaosModel>(): Promise<KhaosResponse<KhaosModel>> {
    const response = await fetch(`${this.url}/${this.endpoint}`, this.options);
    const payload = await response.json();

    if (response.ok) return { data: payload };
    return { error: payload };
  };
};