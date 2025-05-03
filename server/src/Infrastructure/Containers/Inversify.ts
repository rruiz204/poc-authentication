import { Container } from "inversify";

import { Context } from "@Database/Core/Context";
import { UnitOfWork } from "@Database/Core/UnitOfWork";

import { EmailLoginUseCase } from "@UseCases/Auth/EmailLogin/EmailLoginUseCase";
import { SimpleRegisterUseCase } from "@UseCases/Auth/SimpleRegister/SimpleRegisterUseCase";

export const Inversify = new Container();

Inversify.bind<UnitOfWork>(UnitOfWork)
  .toDynamicValue(() => new UnitOfWork(Context))
  .inSingletonScope();

Inversify.bind<EmailLoginUseCase>(EmailLoginUseCase).toSelf();
Inversify.bind<SimpleRegisterUseCase>(SimpleRegisterUseCase).toSelf();