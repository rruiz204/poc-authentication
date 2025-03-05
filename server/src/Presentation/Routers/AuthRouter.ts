import { Router } from "express";
import { Context } from "@Database/Context";
import { UnitOfWOrk } from "@Database/UnitOfWork";
import { AuthController } from "@Controllers/AuthController";

import { SimpleAuthUseCase } from "@UseCases/Auth/SimpleAuth/SimpleAuthUseCase";
import { RegisterUserUseCase } from "@UseCases/Auth/RegisterUser/RegisterUserUseCase";
import { ForgetPasswordUseCase } from "@UseCases/Auth/ForgetPassword/ForgetPasswordUseCase";

const uow = new UnitOfWOrk(Context);

const simpleAuthUseCase = new SimpleAuthUseCase(uow);
const registerUserUseCase = new RegisterUserUseCase(uow);
const forgetPasswordUserCase = new ForgetPasswordUseCase(uow);

const controller = new AuthController(
  simpleAuthUseCase, registerUserUseCase,
  forgetPasswordUserCase,
);

export const AuthRouter = Router();

AuthRouter.post("/login/simple", controller.simple);
AuthRouter.post("/register", controller.register);
AuthRouter.post("/forget", controller.forget);