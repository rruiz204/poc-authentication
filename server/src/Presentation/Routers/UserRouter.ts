import { Router } from "express";
import { Context } from "@Database/Context";

import { UserController } from "@Controllers/UserController";
import { UserRepository } from "@Repositories/UserRepository";

import { RegisterUserUseCase } from "@UseCases/User/RegisterUser/RegisterUserUseCase";

const repository = new UserRepository(Context);

const registerUserUseCase = new RegisterUserUseCase(repository);

const constroller = new UserController(
  registerUserUseCase,
);

export const UserRouter = Router();

UserRouter.post("/", constroller.register);