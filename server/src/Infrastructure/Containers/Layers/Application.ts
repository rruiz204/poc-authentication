import { ContainerModule } from "inversify";

import { EmailLoginUseCase } from "@UseCases/Auth/EmailLogin/EmailLoginUseCase";
import { SimpleRegisterUseCase } from "@UseCases/Auth/SimpleRegister/SimpleRegisterUseCase";

export const Application = new ContainerModule((opts) => {
  opts.bind(EmailLoginUseCase).toSelf();
  opts.bind(SimpleRegisterUseCase).toSelf();
});