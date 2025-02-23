import { Router } from "express";
import { AuthController } from "@Controllers/AuthController";
import { SimpleAuthUseCase } from "@UseCases/Auth/SimpleAuth/SimpleAuthUseCase";

const simpleAuthUseCase = new SimpleAuthUseCase();

const controller = new AuthController(
  simpleAuthUseCase,
);

export const AuthRouter = Router();

AuthRouter.post("/login/simple", controller.simple);