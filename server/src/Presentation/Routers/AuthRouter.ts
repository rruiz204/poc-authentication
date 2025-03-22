import { Router } from "express";
import { Context } from "@Database/Core/Context";
import { UnitOfWOrk } from "@Database/Core/UnitOfWork";
import { AuthController } from "@Controllers/AuthController";

import { SimpleAuthUseCase } from "@UseCases/Auth/SimpleAuth/SimpleAuthUseCase";
import { RegisterUserUseCase } from "@UseCases/Auth/RegisterUser/RegisterUserUseCase";
import { RefreshTokenUseCase } from "@UseCases/Auth/RefreshToken/RefreshTokenUseCase";
import { ResetPasswordUseCase } from "@UseCases/Auth/ResetPassword/ResetPasswordUseCase";
import { ForgetPasswordUseCase } from "@UseCases/Auth/ForgetPassword/ForgetPasswordUseCase";

const uow = new UnitOfWOrk(Context);

const simpleAuthUseCase = new SimpleAuthUseCase(uow);
const refreshTokenUseCase = new RefreshTokenUseCase();
const registerUserUseCase = new RegisterUserUseCase(uow);
const resetPasswordUseCase = new ResetPasswordUseCase(uow);
const forgetPasswordUserCase = new ForgetPasswordUseCase(uow);

const controller = new AuthController(
  simpleAuthUseCase,
  registerUserUseCase,
  refreshTokenUseCase,
  resetPasswordUseCase,
  forgetPasswordUserCase,
);

export const AuthRouter = Router();

AuthRouter.post("/login/simple", controller.simple);
AuthRouter.post("/register", controller.register);
AuthRouter.post("/refresh", controller.refresh);
AuthRouter.post("/forget", controller.forget);
AuthRouter.post("/reset", controller.reset);