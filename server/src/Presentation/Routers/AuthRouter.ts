import { Router } from "express";
import { Context } from "@Database/Context";

import { AuthController } from "@Controllers/AuthController";
import { UserRepository } from "@Repositories/UserRepository";

import { SimpleAuthUseCase } from "@UseCases/Auth/SimpleAuth/SimpleAuthUseCase";

const repository = new UserRepository(Context);

const simpleAuthUseCase = new SimpleAuthUseCase(repository);

const controller = new AuthController(
  simpleAuthUseCase,
);

export const AuthRouter = Router();

AuthRouter.post("/login/simple", controller.simple);