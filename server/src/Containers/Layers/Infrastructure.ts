import { ContainerModule } from "inversify";

import { Context } from "@Database/Core/Context";
import { UnitOfWork } from "@Database/Core/UnitOfWork";

export const Infrastructure = new ContainerModule((opts) => {
  opts.bind(UnitOfWork).toDynamicValue(() => new UnitOfWork(Context)).inSingletonScope();
});