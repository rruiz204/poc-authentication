import { Router } from "express";
import { Context } from "@Database/Context";

import { AuthController } from "@Controllers/AuthController";
import { UserRepository } from "@Repositories/UserRepository";

import { SimpleAuthUseCase } from "@UseCases/Auth/SimpleAuth/SimpleAuthUseCase";
import { RegisterUserUseCase } from "@UseCases/Auth/RegisterUser/RegisterUserUseCase";
import { ForgetPasswordUseCase } from "@UseCases/Auth/ForgetPassword/ForgetPasswordUseCase";

const repository = new UserRepository(Context);

const simpleAuthUseCase = new SimpleAuthUseCase(repository);
const registerUserUseCase = new RegisterUserUseCase(repository);
const forgetPasswordUserCase = new ForgetPasswordUseCase(repository);

const controller = new AuthController(
  simpleAuthUseCase, registerUserUseCase,
  forgetPasswordUserCase,
);

export const AuthRouter = Router();

AuthRouter.post("/login/simple", controller.simple);
AuthRouter.post("/register", controller.register);
AuthRouter.post("/forget", controller.forget);