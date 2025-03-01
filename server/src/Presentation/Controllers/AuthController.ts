import type { Request, Response } from "express";
import type { SimpleAuthUseCase } from "@UseCases/Auth/SimpleAuth/SimpleAuthUseCase";
import type { RegisterUserUseCase } from "@UseCases/Auth/RegisterUser/RegisterUserUseCase";

export class AuthController {
  constructor(
    private simpleAuthUseCase: SimpleAuthUseCase,
    private registerUserUseCase: RegisterUserUseCase,
  ) {
    this.simple = this.simple.bind(this);
    this.register = this.register.bind(this);
  };

  public async simple(req: Request, res: Response): Promise<void> {
    const auth = await this.simpleAuthUseCase.execute(req.body);
    res.status(200).json({ type: auth.type, token: auth.token });
  };

  public async register(req: Request, res: Response): Promise<void> {
    const auth = await this.registerUserUseCase.execute(req.body);
    res.status(200).json({ type: auth.type, token: auth.token });
  };
};