import type { Request, Response } from "express";
import type { RegisterUserUseCase } from "@UseCases/User/RegisterUser/RegisterUserUseCase";

export class UserController {
  constructor(
    private registerUserUseCase: RegisterUserUseCase,
  ) {
    this.register = this.register.bind(this);
  };

  public async register(req: Request, res: Response) {
    const auth = await this.registerUserUseCase.use(req.body);
    res.status(200).json({ type: auth.type, token: auth.token });
  };
};