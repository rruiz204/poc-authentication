import { Router } from "express";
import { Inversify } from "@Containers/Inversify";
import { AuthController } from "@Controllers/AuthController";

const controller = Inversify.get(AuthController);

export const AuthRouter = Router();

AuthRouter.post("/login", controller.login);
AuthRouter.post("/register", controller.register);