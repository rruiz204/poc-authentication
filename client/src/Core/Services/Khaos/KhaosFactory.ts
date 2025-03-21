import { Khaos } from "./Khaos";
import type { KhaosOptions } from "./KhaosTypes";

export class KhaosFactory {
  public static build(options: KhaosOptions): Khaos {
    const khaos = new Khaos();
    khaos.setHttpMethod(options.method);
    khaos.setEndpoint(options.endpoint);
    return khaos;
  };
};