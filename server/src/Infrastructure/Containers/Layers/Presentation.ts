import { ContainerModule } from "inversify";

import { AuthController } from "@Controllers/AuthController";

export const Presentation = new ContainerModule((opts) => {
  opts.bind(AuthController).toSelf();
});