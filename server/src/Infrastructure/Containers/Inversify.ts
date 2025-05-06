import { Container } from "inversify";

import { Context } from "@Database/Core/Context";
import { UnitOfWork } from "@Database/Core/UnitOfWork";

import { EmailLoginUseCase } from "@UseCases/Auth/EmailLogin/EmailLoginUseCase";
import { SimpleRegisterUseCase } from "@UseCases/Auth/SimpleRegister/SimpleRegisterUseCase";

import { AuthController } from "@Controllers/AuthController";


export const Inversify = new Container();

Inversify.bind(UnitOfWork).toDynamicValue(() => new UnitOfWork(Context)).inSingletonScope();

Inversify.bind(EmailLoginUseCase).toSelf();
Inversify.bind(SimpleRegisterUseCase).toSelf();

Inversify.bind(AuthController).toSelf();