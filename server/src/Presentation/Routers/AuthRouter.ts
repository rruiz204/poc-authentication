import { Router } from "express";
import { Context } from "@Database/Context";

import { AuthController } from "@Controllers/AuthController";
import { UserRepository } from "@Repositories/UserRepository";
import { ResetTokenRepository } from "@Repositories/ResetTokenRepository";

import { SimpleAuthUseCase } from "@UseCases/Auth/SimpleAuth/SimpleAuthUseCase";
import { RegisterUserUseCase } from "@UseCases/Auth/RegisterUser/RegisterUserUseCase";
import { ForgetPasswordUseCase } from "@UseCases/Auth/ForgetPassword/ForgetPasswordUseCase";

const userRepository = new UserRepository(Context);
const resetTokenRepository = new ResetTokenRepository(Context);

const simpleAuthUseCase = new SimpleAuthUseCase(userRepository);
const registerUserUseCase = new RegisterUserUseCase(userRepository);

const forgetPasswordUserCase = new ForgetPasswordUseCase(
  userRepository, resetTokenRepository);

const controller = new AuthController(
  simpleAuthUseCase, registerUserUseCase,
  forgetPasswordUserCase,
);

export const AuthRouter = Router();

AuthRouter.post("/login/simple", controller.simple);
AuthRouter.post("/register", controller.register);
AuthRouter.post("/forget", controller.forget);